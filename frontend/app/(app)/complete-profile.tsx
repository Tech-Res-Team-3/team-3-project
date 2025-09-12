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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import type { Address } from "../../types/address";
import { useUpdateUser } from "../../hooks/auth";
import { useAuthStore } from "../../stores/authStore";
import { useLoadingStore } from "../../stores/loadingStore";
import { useAddresses } from "../../hooks/address/useAddresses";
import GlobalLoading from "../../components/GlobalLoading";
import { SafeAreaView } from "react-native-safe-area-context";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { addAddressAsync } = useAddresses();

  // Single address state, with label for UI
  const [address, setAddress] = useState<Address & { label?: string }>({
    id: Date.now(),
    street: "",
    city: "",
    state: "",
    zip: 0,
    country: "",
    userId: 0,
    label: "",
  });

  const defaultPhoto = require("../../assets/profile-placeholder.png");

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { updateUser } = useUpdateUser();

  const handleAddressChange = (field: string, value: string | number) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSaveLanguages = () => {
    setShowLanguageModal(false);
  };

  const [error, setError] = useState<string | null>(null);

  function validateProfile({
    firstName,
    lastName,
    phone,
  }: {
    firstName: string;
    lastName: string;
    phone: string;
  }) {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!phone.trim()) return "Phone number is required.";
    if (!/^\+?\d{7,15}$/.test(phone.replace(/[\s()-]/g, "")))
      return "Enter a valid phone number.";
    return null;
  }

  return (
    <>
      {/* {useLoadingStore((state) => state.loading) && <GlobalLoading />} */}
      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
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
          <Text className="text-xl font-bold text-ruby mt-1">
            Profile Photo
          </Text>
        </View>

        {/* Basic Info Section */}
        <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
          <Text className="text-xl font-bold text-ruby mb-3 mt-1">
            Basic Info
          </Text>
          <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
            First Name
          </Text>
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
            placeholder="e.g. John"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text className="text-base text-gray-800 mb-1 mt-2 font-semibold">
            Last Name
          </Text>
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3 text-base mb-2 border border-gray-300 text-gray-900"
            placeholder="e.g. Smith"
            value={lastName}
            onChangeText={setLastName}
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

        {/* Address Section */}
        {/* FIXME: VirtualizationList error */}
        <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
          <Text className="text-xl font-bold text-ruby mb-3 mt-1">Address</Text>
          <GooglePlacesAutocomplete
            placeholder="Search for address"
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            textInputProps={{
              value: address.label || "",
              onChangeText: (text) => handleAddressChange("label", text),
            }}
            onPress={(data, details = null) => {
              if (details) {
                const street =
                  details?.address_components?.find((c) =>
                    c.types.includes("route")
                  )?.long_name || "";
                const streetNumber =
                  details?.address_components?.find((c) =>
                    c.types.includes("street_number")
                  )?.long_name || "";
                const city =
                  details?.address_components?.find((c) =>
                    c.types.includes("locality")
                  )?.long_name || "";
                const state =
                  details?.address_components?.find((c) =>
                    c.types.includes("administrative_area_level_1")
                  )?.short_name || "";
                const zip =
                  details?.address_components?.find((c) =>
                    c.types.includes("postal_code")
                  )?.long_name || "";
                const country =
                  details?.address_components?.find((c) =>
                    c.types.includes("country")
                  )?.long_name || "";

                handleAddressChange(
                  "street",
                  `${streetNumber} ${street}`.trim()
                );
                handleAddressChange("city", city);
                handleAddressChange("state", state);
                handleAddressChange("zip", zip);
                handleAddressChange("country", country);
                handleAddressChange("placeId", details.place_id);
                handleAddressChange("latitude", details.geometry.location.lat);
                handleAddressChange("longitude", details.geometry.location.lng);
                handleAddressChange("label", data.description);
              }
            }}
            styles={{
              container: {
                flex: 0,
                alignSelf: "stretch",
                minHeight: 60,
                zIndex: 10,
              },
              textInputContainer: {
                width: "100%",
                minHeight: 48,
                backgroundColor: "transparent",
                paddingHorizontal: 6,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              },
              textInput: {
                borderRadius: 24,
                backgroundColor: "#f3f4f6",
                fontSize: 16,
                paddingHorizontal: 20,
                paddingLeft: 20,
                color: "#222",
                minHeight: 48,
                borderWidth: 0,
              },
              listView: {
                backgroundColor: "#fff",
                borderRadius: 12,
                borderWidth: 0,
                marginTop: 4,
                zIndex: 20,
              },
            }}
          />
          {/* Show the selected address below the input */}
          {address.label ? (
            <Text style={{ marginTop: 8, color: "#222", fontSize: 16 }}>
              {address.label}
            </Text>
          ) : null}
        </View>

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
              {languageOptions.map((item) => (
                <TouchableOpacity
                  key={item}
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
              ))}
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

        {/* Save/Continue Button */}
        <View className="w-full mt-5">
          {error && (
            <Text
              style={{ color: "#c41111", marginBottom: 8, textAlign: "center" }}
            >
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
      <Button
        title="Save Profile"
        onPress={async () => {
          setError(null);
          const validationError = validateProfile({
            firstName,
            lastName,
            phone,
          });
          if (validationError) {
            setError(validationError);
            return;
          }
          useLoadingStore.getState().setLoading(true);
          if (!user) return;
          try {
            await updateUser({
              firstName,
              lastName,
              phone,
              // Add other fields as needed
            });
            const { label, ...addressToSave } = address;
            await addAddressAsync(addressToSave);
            router.replace("/(app)");
          } catch (err) {
            setError("Failed to update profile. Please try again.");
            console.error("Failed to update user:", err);
          } finally {
            useLoadingStore.getState().setLoading(false);
          }
        }}
        className="py-6 bg-ruby self-center w-11/12"
        textClassName="text-white text-xl"
      />
    </>
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
