import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useAuthStore } from "../../../stores/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_FOLDERS = ["profile_photos", "vehicles"];

export default function ProfilePhotoManagerScreen() {
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = auth().currentUser;
  const router = useRouter();

  // Fetch folders on mount
  useEffect(() => {
    if (!user) return;
    const fetchFolders = async () => {
      setLoading(true);
      try {
        const ref = storage().ref(`users/${user.uid}`);
        const result = await ref.listAll();
        const folderNames = [
          ...DEFAULT_FOLDERS,
          ...result.prefixes
            .map((p) => p.name)
            .filter((name) => !DEFAULT_FOLDERS.includes(name)),
        ];
        setFolders(folderNames);
      } catch (err) {
        Alert.alert("Error", "Could not fetch folders.");
      }
      setLoading(false);
    };
    fetchFolders();
  }, [user]);

  // Fetch photos when folder changes
  useEffect(() => {
    if (!user || !selectedFolder) return;
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const ref = storage().ref(`users/${user.uid}/${selectedFolder}`);
        const result = await ref.listAll();
        const urls = await Promise.all(
          result.items.map((item) => item.getDownloadURL())
        );
        setPhotos(urls);
      } catch (err) {
        Alert.alert("Error", "Could not fetch photos.");
      }
      setLoading(false);
    };
    fetchPhotos();
  }, [user, selectedFolder]);

  // Pick image from gallery or camera
  const pickImage = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
    }
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Upload to selected folder
  const uploadImage = async () => {
    if (!imageUri || !user || !selectedFolder) {
      Alert.alert("Error", "Please select a folder and image.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `${Date.now()}.jpg`;
      const ref = storage().ref(
        `users/${user.uid}/${selectedFolder}/${filename}`
      );
      await ref.put(blob);
      setImageUri(null);
      // Refresh photo list
      const result = await ref.parent?.listAll();
      const urls = result
        ? await Promise.all(result.items.map((item) => item.getDownloadURL()))
        : [];
      setPhotos(urls);
      Alert.alert("Success", "Photo uploaded!");
    } catch (err) {
      Alert.alert(
        "Upload Error",
        err instanceof Error ? err.message : String(err)
      );
    }
    setLoading(false);
  };

  // Add new folder
  const addFolder = async () => {
    if (!user || !newFolderName.trim()) return;
    setLoading(true);
    try {
      // Firebase Storage has no "create folder" API, so we upload a dummy file and delete it
      const dummyRef = storage().ref(
        `users/${user.uid}/${newFolderName}/.init`
      );
      await dummyRef.putString("init");
      await dummyRef.delete();
      setFolders((prev) => [...prev, newFolderName]);
      setShowAddFolder(false);
      setNewFolderName("");
    } catch (err) {
      Alert.alert("Error", "Could not create folder.");
    }
    setLoading(false);
  };

  const deleteFolder = async (folderName: string) => {
    if (!user) return;
    if (!folderName) return;
    if (DEFAULT_FOLDERS.includes(folderName)) {
      Alert.alert("Cannot delete default folders.");
      return;
    }
    Alert.alert(
      "Delete Folder",
      `Are you sure you want to delete the folder "${folderName}" and all its photos?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const ref = storage().ref(`users/${user.uid}/${folderName}`);
              const result = await ref.listAll();
              // Delete all files in the folder
              await Promise.all(result.items.map((item) => item.delete()));
              // Delete all subfolders recursively (if any)
              await Promise.all(
                result.prefixes.map(async (prefix) => {
                  const subResult = await prefix.listAll();
                  await Promise.all(
                    subResult.items.map((item) => item.delete())
                  );
                })
              );
              setFolders((prev) => prev.filter((f) => f !== folderName));
              if (selectedFolder === folderName) {
                setSelectedFolder(null);
                setPhotos([]);
              }
              Alert.alert("Folder deleted!");
            } catch (err) {
              Alert.alert("Error", "Could not delete folder.");
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  // Set photo as profile
  const setAsProfilePhoto = async (photoUrl: string) => {
    if (!user) return;
    try {
      await firestore()
        .collection("users")
        .doc(user.uid)
        .set({ photoUrl }, { merge: true });
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      const updatedUser = userDoc.data();
      if (updatedUser) {
        useAuthStore.getState().setUser({
          id: updatedUser.id ?? user.uid,
          email: updatedUser.email ?? user.email ?? "",
          firstName: updatedUser.firstName ?? "",
          lastName: updatedUser.lastName ?? "",
          role: updatedUser.role ?? "user",
          photoUrl: updatedUser.photoUrl ?? "",
          firebaseUid: user.uid,
        });
      }
      Alert.alert("Profile Photo Updated!");
      setViewPhoto(null);
      router.replace("/dashboard");
    } catch (err) {
      Alert.alert("Error", "Could not set profile photo.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        Photo Manager
      </Text>
      {loading && <ActivityIndicator size="large" />}
      {/* Folder List */}
      <Text style={{ fontWeight: "bold", marginTop: 8 }}>Folders:</Text>
      <FlatList
        data={folders}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: selectedFolder === item ? "#007AFF" : "#eee",
                borderRadius: 8,
                marginRight: 4,
              }}
              onPress={() => setSelectedFolder(item)}
            >
              <Text
                style={{ color: selectedFolder === item ? "#fff" : "#333" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
            {/* {!DEFAULT_FOLDERS.includes(item) && (
              <TouchableOpacity
                onPress={() => deleteFolder(item)}
                style={{
                  backgroundColor: "#ff4444",
                  borderRadius: 8,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginLeft: 2,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>🗑</Text>
              </TouchableOpacity>
            )} */}
          </View>
        )}
        ListFooterComponent={
          <>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: "#4CAF50",
                borderRadius: 8,
                marginRight: 8,
              }}
              onPress={() => setShowAddFolder(true)}
            >
              <Text style={{ color: "#fff" }}>+ Add Folder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: "#AF4C50",
                borderRadius: 8,
                marginRight: 8,
              }}
              onPress={() => {
                if (selectedFolder) {
                  deleteFolder(selectedFolder);
                }
              }}
              disabled={!selectedFolder}
            >
              <Text style={{ color: "#fff" }}>Delete Folder</Text>
            </TouchableOpacity>
          </>
        }
      />

      {/* Add Folder Modal */}
      <Modal visible={showAddFolder} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000099",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              width: "80%",
            }}
          >
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              New Folder Name
            </Text>
            <TextInput
              value={newFolderName}
              onChangeText={setNewFolderName}
              placeholder="Folder name"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 8,
                marginBottom: 16,
              }}
            />
            <Button title="Create" onPress={addFolder} />
            <Button
              title="Cancel"
              onPress={() => setShowAddFolder(false)}
              color="#888"
            />
          </View>
        </View>
      </Modal>

      {/* Image Picker and Upload */}
      {selectedFolder && (
        <View style={{ marginVertical: 16 }}>
          <Button title="Pick from Gallery" onPress={() => pickImage(false)} />
          <Button title="Take a Photo" onPress={() => pickImage(true)} />
          <Button
            title="Upload Photo"
            onPress={uploadImage}
            disabled={!imageUri}
          />
        </View>
      )}

      {/* Photo List */}
      {selectedFolder && (
        <>
          <Text style={{ fontWeight: "bold", marginTop: 8 }}>
            Photos in "{selectedFolder}":
          </Text>
          <FlatList
            data={photos}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setViewPhoto(item)}>
                <Image
                  source={{ uri: item }}
                  style={{ width: 80, height: 80, borderRadius: 8, margin: 8 }}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={{ margin: 16 }}>No photos yet.</Text>
            }
          />
        </>
      )}

      {/* View Photo Modal */}
      <Modal visible={!!viewPhoto} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000cc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            {viewPhoto && (
              <>
                <Image
                  source={{ uri: viewPhoto }}
                  style={{ width: 300, height: 300, borderRadius: 12 }}
                />
                <Button
                  title="Set as Profile Photo"
                  onPress={() => setAsProfilePhoto(viewPhoto)}
                />
                <Button
                  title="Close"
                  onPress={() => setViewPhoto(null)}
                  color="#888"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
