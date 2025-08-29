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
import { useAddresses } from "../../hooks/address/useAddresses";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import type { Address } from "../../types/address";
import { Portal } from "@gorhom/portal";
import { useUpdateUser } from "../../hooks/auth";
import { useAuthStore } from "../../stores/authStore";
import { useLoadingStore } from "../../stores/loadingStore";
import GlobalLoading from "../../components/GlobalLoading";

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

  const defaultPhoto = require("../../assets/profile-placeholder.png");

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { updateUser } = useUpdateUser();

  const { addresses, addAddress, updateAddress, removeAddress } =
    useAddresses();

  const handleAddAddress = () => {
    addAddress({
      id: Date.now(), // Temporary ID for frontend
      street: "",
      city: "",
      state: "",
      zip: 0,
      country: "",
      userId: 0,
    });
  };

  const handleAddressChange = (
    id: number,
    field: string,
    value: string | number
  ) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      updateAddress({ ...address, [field]: value });
    }
  };

  const handleRemoveAddress = (id: number) => {
    removeAddress(id);
  };

  const handleToggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSaveLanguages = () => {
    setShowLanguageModal(false);
  };

  // Render item for FlatList
  const renderAddressItem = ({ item: address }: { item: Address }) => (
    <View style={{ marginBottom: 16 }} pointerEvents="box-none">
      <Portal>
        <GooglePlacesAutocomplete
          placeholder="Search for address"
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            if (details) {
              // Parse details to extract address fields
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
                address.id,
                "street",
                `${streetNumber} ${street}`.trim()
              );
              handleAddressChange(address.id, "city", city);
              handleAddressChange(address.id, "state", state);
              handleAddressChange(address.id, "zip", zip);
              handleAddressChange(address.id, "country", country);
              // Optionally store place_id, lat/lng, etc.
              handleAddressChange(address.id, "placeId", details.place_id);
              handleAddressChange(
                address.id,
                "latitude",
                details.geometry.location.lat
              );
              handleAddressChange(
                address.id,
                "longitude",
                details.geometry.location.lng
              );
            }
          }}
          styles={{
            container: { flex: 0, marginBottom: 8 },
            textInput: {
              backgroundColor: "#f3f4f6",
              borderRadius: 12,
              fontSize: 16,
              paddingHorizontal: 12,
              color: "#222",
              minHeight: 44,
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
      </Portal>

      <TouchableOpacity
        onPress={() => handleRemoveAddress(address.id)}
        style={{
          alignSelf: "flex-end",
          marginTop: 4,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "#c41111" }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

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

        {/* Addresses Section */}
        <View className="w-[90%] bg-white rounded-2xl p-5 mb-5 shadow">
          <Text className="text-xl font-bold text-ruby mb-3 mt-1">
            Addresses
          </Text>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAddressItem}
            scrollEnabled={false}
            ListFooterComponent={
              <Button
                title="Add Address"
                onPress={handleAddAddress}
                className="bg-gray-200 mt-2"
                textClassName="text-ruby"
              />
            }
          />
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

        {/* Save/Continue Button */}
        <View className="w-full mt-5">
          {error && (
            <Text
              style={{ color: "#c41111", marginBottom: 8, textAlign: "center" }}
            >
              {error}
            </Text>
          )}
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
                });
                router.replace("/(app)");
              } catch (err) {
                setError("Failed to update profile. Please try again.");
                console.error("Failed to update user:", err);
              } finally {
                useLoadingStore.getState().setLoading(false);
              }
            }}
            className="bg-ruby self-center w-11/12"
            textClassName="text-white"
          />
        </View>
      </ScrollView>
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
