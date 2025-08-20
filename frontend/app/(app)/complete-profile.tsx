import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";
import { useProfileCompleteStore } from "../../stores/profileCompleteStore";

const { height } = Dimensions.get("window");

const languageOptions = [
  "English US",
  "English UK",
  "Greek",
  "Arabic",
  "Urdu",
  "French",
  "Hindi",
  "Russian",
  "German",
  "Chinese",
  "Spanish",
  "Japanese",
  "Korean",
  "Portuguese",
];

export default function CompleteProfileScreen() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const defaultPhoto = require("../../assets/profile-placeholder.png");

  const router = useRouter();

  const handleToggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSaveLanguages = () => {
    setShowLanguageModal(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      {/* Profile Photo Section */}
      <View
        className="w-[90%] bg-white rounded-2xl p-5 mb-5 items-center shadow"
        style={{ marginTop: height * 0.06 }}
      >
        <View className="relative">
          <Image
            source={profilePhoto ? { uri: profilePhoto } : defaultPhoto}
            className="w-24 h-24 rounded-full mb-2"
          />
          <TouchableOpacity
            className="absolute bottom-0 right-0 bg-ruby rounded-full p-1.5 border-2 border-white"
            onPress={() => {
              /* TODO: Add photo picker logic */
            }}
          >
            <Ionicons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-bold text-ruby mt-1">Profile Photo</Text>
      </View>

      {/* Basic Info Section */}
      <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
        <Text className="text-xl font-bold text-ruby mb-3 mt-1">
          Basic Info
        </Text>
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Name
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Description
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="Tell us about yourself"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 80 }}
        />
      </View>

      {/* Contact Info Section */}
      <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
        <Text className="text-xl font-bold text-ruby mb-3 mt-1">
          Contact Info
        </Text>
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Phone Number
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="(555) 123-4567"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Email
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="you@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* General Info Section */}
      <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
        <Text className="text-xl font-bold text-ruby mb-3 mt-1">
          General Info
        </Text>
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Home Address
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="123 Main St, Hometown"
          value={homeAddress}
          onChangeText={setHomeAddress}
        />
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Current Address
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="456 Elm St, Current City"
          value={currentAddress}
          onChangeText={setCurrentAddress}
        />
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Work Address
        </Text>
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
          placeholder="789 Oak Ave, Work City"
          value={workAddress}
          onChangeText={setWorkAddress}
        />
        <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
          Languages
        </Text>
        <TouchableOpacity
          className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center justify-between border border-gray-300 mb-2"
          onPress={() => setShowLanguageModal(true)}
        >
          <Text
            className={
              selectedLanguages.length ? "text-gray-900" : "text-gray-400"
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedLanguages.length
              ? selectedLanguages.length <= 2
                ? selectedLanguages.join(", ")
                : `${selectedLanguages.slice(0, 2).join(", ")}  + ${selectedLanguages.length - 2} more`
              : "Select languages"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#aaa" />
        </TouchableOpacity>

        {/* Modal for multi-select languages */}
        <Modal
          visible={showLanguageModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text className="text-lg font-bold mb-4 text-ruby">
                Select Languages
              </Text>
              <FlatList
                data={languageOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center py-2"
                    onPress={() => handleToggleLanguage(item)}
                  >
                    <Ionicons
                      name={
                        selectedLanguages.includes(item)
                          ? "checkbox"
                          : "square-outline"
                      }
                      size={24}
                      color={
                        selectedLanguages.includes(item) ? "#c41111" : "#aaa"
                      }
                      style={{ marginRight: 12 }}
                    />
                    <Text className="text-base">{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Save"
                onPress={handleSaveLanguages}
                className="bg-ruby mt-4"
                textClassName="text-white"
              />
              <Button
                title="Cancel"
                onPress={() => setShowLanguageModal(false)}
                className="bg-gray-300 mt-2"
                textClassName="text-gray-800"
              />
            </View>
          </View>
        </Modal>
      </View>

      {/* Save/Continue Button */}
      <View className="w-full mt-5">
        <Button
          title="Save Profile"
          onPress={() => {
            useProfileCompleteStore.getState().toggleProfileComplete();
            router.replace("/(app)");
          }}
          className="bg-ruby self-center w-11/12"
          textClassName="text-white"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
});
