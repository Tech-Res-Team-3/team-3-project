import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import { getApp } from "@react-native-firebase/app";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImageUpload } from "../../../hooks/auth";
import { useAuthStore } from "../../../stores/authStore";
import { useUsers } from "../../../hooks/user/useUsers";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PHOTO_MARGIN = 4;
const NUM_COLUMNS = 3;
const PHOTO_SIZE =
  (SCREEN_WIDTH - PHOTO_MARGIN * 2 * NUM_COLUMNS - 32) / NUM_COLUMNS; // 32 for SafeAreaView padding

export default function ProfilePhotosScreen() {
  // Use authStore for the current user
  const zustandUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { updateUser } = useUsers();
  const { getSignedUrl, uploadToSignedUrl } = useImageUpload();

  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [showUploadBar, setShowUploadBar] = useState(false);

  // Fetch profile photos on mount
  useEffect(() => {
    if (!zustandUser) return;
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const storage = getStorage(getApp());
        const storageRef = ref(
          storage,
          `users/${zustandUser.firebaseUid}/profile_photos`
        );
        const result = await listAll(storageRef);
        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );
        setPhotos(urls);
      } catch (err) {
        setPhotos([]);
      }
      setLoading(false);
    };
    fetchPhotos();
  }, [zustandUser]);

  // Select multiple images
  const pickMultipleImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
      selectionLimit: 5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImages(result.assets);
      setShowUploadBar(true);
    }
  };

  // Toggle selection for preview before upload
  const toggleSelectImage = (uri: string) => {
    setSelectedImages((prev) =>
      prev.some((img) => img.uri === uri)
        ? prev.filter((img) => img.uri !== uri)
        : [...prev, { uri }]
    );
  };

  // Upload all selected images
  const uploadSelectedImages = async () => {
    if (!zustandUser || selectedImages.length === 0) return;
    setLoading(true);
    try {
      for (const img of selectedImages) {
        const uri = img.uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = `${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}.jpg`;

        // 1. Get signed upload URL from backend
        const { url: signedUrl, publicUrl } = await getSignedUrl(
          `users/${zustandUser.firebaseUid}/profile_photos`,
          filename,
          "image/jpeg"
        );

        // 2. Upload file to Firebase Storage using signed URL
        await uploadToSignedUrl(signedUrl, blob, "image/jpeg");

        // 3. Add the new photo to the list
        setPhotos((prev) => [...prev, publicUrl]);
      }
      setSelectedImages([]);
      setShowUploadBar(false);
    } catch (err) {
      // Handle error
    }
    setLoading(false);
  };

  // Set as profile photo
  const setAsProfilePhoto = async () => {
    if (!zustandUser || !viewPhoto) {
      console.log("No user or photo selected", { zustandUser, viewPhoto });
      return;
    }
    try {
      console.log("Calling updateUser with:", { photoUrl: viewPhoto });
      const updated = await updateUser({ photoUrl: viewPhoto });
      setUser(updated); // Update authStore with the new user data
      console.log("updateUser response:", updated);
      Alert.alert("Success", "Profile photo updated!");
      setViewPhoto(null);
    } catch (error) {
      console.log("Error updating profile photo:", error);
      Alert.alert("Error", "Failed to set profile photo. Please try again.");
    }
  };

  // Add photo block as a pseudo-photo at the end
  const gridData = React.useMemo(() => {
    const photoObjs = photos.map((url) => ({ url }));
    return [...photoObjs, { isAddButton: true }];
  }, [photos]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        Profile Photos
      </Text>
      {loading && <ActivityIndicator size="large" />}
      {photos.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text>No profile photos yet. Add one!</Text>
          <Button title="Select Photos" onPress={pickMultipleImages} />
        </View>
      ) : (
        <FlatList
          data={gridData}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item, index) =>
            "isAddButton" in item ? "add-photo" : item.url + index
          }
          renderItem={({ item }) =>
            "isAddButton" in item ? (
              <TouchableOpacity
                style={styles.addPhotoBlock}
                onPress={pickMultipleImages}
              >
                <Text style={{ fontSize: 32, color: "#888" }}>+</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setViewPhoto(item.url)}>
                <View style={{ position: "relative" }}>
                  <Image
                    source={{ uri: item.url }}
                    style={[
                      styles.gridPhoto,
                      zustandUser?.photoUrl === item.url && styles.rubyBorder,
                    ]}
                  />
                  {zustandUser?.photoUrl === item.url && (
                    <View style={styles.defaultBadge}>
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        Default
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )
          }
        />
      )}

      {/* Preview selected images before upload */}
      {showUploadBar && selectedImages.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
            Selected Photos ({selectedImages.length})
          </Text>
          <FlatList
            data={selectedImages}
            horizontal
            keyExtractor={(item, index) =>
              item.uri ? item.uri : `selected-${index}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleSelectImage(item.uri)}
                style={{ position: "relative" }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    margin: 8,
                    borderWidth: 3,
                    borderColor: selectedImages.some(
                      (img) => img.uri === item.uri
                    )
                      ? "#c41111"
                      : "#eee",
                  }}
                />
                {selectedImages.some((img) => img.uri === item.uri) && (
                  <View style={styles.checkMark}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
          <Button
            title="Upload Selected Photos"
            onPress={uploadSelectedImages}
            disabled={loading || selectedImages.length === 0}
          />
        </View>
      )}

      {/* Modal for viewing photo */}
      <Modal visible={!!viewPhoto} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {viewPhoto && (
              <>
                <View style={styles.modalImageWrapper}>
                  <Image
                    source={{ uri: viewPhoto }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  {/* Close X button */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setViewPhoto(null)}
                    hitSlop={12}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                  {/* Set as Default button */}
                  <TouchableOpacity
                    style={styles.setDefaultButton}
                    onPress={setAsProfilePhoto}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.setDefaultButtonText}>
                      Set as Profile Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridPhoto: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 8,
    margin: PHOTO_MARGIN,
  },
  addPhotoBlock: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 8,
    margin: PHOTO_MARGIN,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#c41111",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  defaultBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#c41111",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 3,
  },
  rubyBorder: {
    borderWidth: 2,
    borderColor: "#c41111",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000cc",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  closeButtonText: {
    fontSize: 36,
    color: "#ffffff",
    fontWeight: "semibold",
    lineHeight: 24,
  },
  setDefaultButton: {
    position: "absolute",
    bottom: 18,
    left: "50%",
    transform: [{ translateX: -80 }],
    width: 160,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  setDefaultButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
