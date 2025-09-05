import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  BackHandler,
} from "react-native";
import { Switch } from "react-native-switch";
import DashboardMenuButton from "../../components/DashboardMenuButton";
import { Button } from "../../components/Button";
import { HamburgerIcon } from "../../components/icons/HamburgerIcon";
import { BellIcon } from "../../components/icons/BellIcon";
import { useRouter, useFocusEffect } from "expo-router";
import { useLoadingStore } from "../../stores/loadingStore";
import { useProfileCompleteStore } from "../../stores/profileCompleteStore";
import { useAuthStore } from "../../stores/authStore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/en";
import GlobalLoading from "../../components/GlobalLoading";
import LogoutConfirmationModal from "../../components/LogoutConfirmationModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { signOut } from "@react-native-firebase/auth";
import { useCallback } from "react";
import notifee, { AndroidStyle } from "@notifee/react-native"; // remove after done testing!!
import { useVehicles } from "../../hooks/vehicle/useVehicles";

dayjs.locale("en");

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
const { height, width } = Dimensions.get("window");
async function requestPermissionIfNeeded() {
  const settings = await notifee.requestPermission();
  // Optionally check settings.authorizationStatus
}

export default function MainAppScreen() {
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCurrentLocationEnabled, setIsCurrentLocationEnabled] =
    useState(true);
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const { vehicles, fetchVehiclesNearby } = useVehicles();
  const defaultStyles = useDefaultStyles();
  const [startDate, setStartDate] = useState<DateType>();
  const [endDate, setEndDate] = useState<DateType>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false); // Prevent infinite redirects

  requestPermissionIfNeeded();
  function getRadiusFromRegion(region: { latitudeDelta: number }) {
    // Approximate: 1 degree latitude ≈ 111km
    return (region.latitudeDelta / 2) * 111;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const radius = getRadiusFromRegion(region);
      fetchVehiclesNearby(region.latitude, region.longitude, radius);
    }, 400); // Debounce

    return () => clearTimeout(timeout);
  }, [region, fetchVehiclesNearby]);

  // Handle back navigation - show logout confirmation modal only when this screen is focused
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        console.log(
          "Back button pressed on main app - showing logout confirmation modal"
        );
        setShowLogoutModal(true);
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    console.log("Starting logout process...");
    setShowLogoutModal(false);
    useLoadingStore.getState().setLoading(true);

    try {
      // Clear Zustand state first
      useAuthStore.getState().clearUser();
      console.log("Cleared Zustand user data");

      // Sign out from Firebase
      const app = getApp();
      const auth = getAuth(app);
      await signOut(auth);
      console.log(
        "Firebase signOut completed - navigation will be handled by root layout"
      );
    } catch (error) {
      console.log("Logout error:", error);
      useLoadingStore.getState().setLoading(false);
    }
  };

  const handleLogoutCancel = () => {
    console.log("Logout cancelled by user");
    setShowLogoutModal(false);
  };

  // The (app) layout handles Firebase auth, so we just check for Zustand user here
  if (!user) {
    console.log("MainAppScreen waiting for user sync");
    return (
      <>
        <GlobalLoading />
        <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
          <Text className="text-lg text-gray-600">Loading your profile...</Text>
        </SafeAreaView>
      </>
    );
  }

  // TODO: Create Notifications Screen
  async function handleTestNotification() {
    try {
      await notifee.displayNotification({
        title: "Test Notification",
        body: "This is a local test notification!",
        android: {
          channelId: "alerts",
          color: "#c41111",
          // smallIcon: "ic_stat_name", // Remove or ensure it exists
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: "https://placekitten.com/400/300",
          },
          actions: [{ title: "Action 1", pressAction: { id: "action-1" } }],
        },
      });
    } catch (e) {
      console.log("Notifee error:", e);
    }
  }

  return (
    <>
      <GlobalLoading />
      <SafeAreaView className="flex-1 bg-gray-100 items-center">
        {/* Top circle buttons */}
        <View className="flex-row justify-between w-11/12 mb-6">
          <DashboardMenuButton
            className="bg-white rounded-full p-2"
            style={styles.circleButton}
            icon={<HamburgerIcon size={30} />}
            onPress={() => router.push("/dashboard")}
            size={45}
          />
          <TouchableOpacity
            onPress={() => router.push("/complete-profile")}
            style={styles.circleButton}
          >
            <Text className="text-ruby">X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTestNotification}
            style={styles.circleButton}
          >
            <BellIcon size={30} />
          </TouchableOpacity>
        </View>

        {/* Two stacked views at the top (each about 1/6 of height, together ~1/3) */}
        <View
          className="flex flex-col w-11/12 bg-white rounded-2xl mb-6 items-center py-6 gap-3"
          style={[styles.shadow]}
        >
          <Text className="font-semibold text-2xl self-start px-6">
            City, Address, Airport
          </Text>
          <GooglePlacesAutocomplete
            placeholder="Los Angeles, CA"
            placeholderTextColor="#d1d5db"
            onPress={(data, details = null) => {
              if (details && details.geometry && details.geometry.location) {
                const { lat, lng } = details.geometry.location;
                setRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onFail={(error) => console.error(error)}
            enablePoweredByContainer={false}
            styles={{
              container: {
                flex: 0,
                alignSelf: "stretch",
                minHeight: 60, // Ensures the input is visible
                zIndex: 10, // Makes sure dropdown is above other elements
              },
              textInputContainer: {
                width: "100%",
                minHeight: 48,
                backgroundColor: "transparent",
                paddingHorizontal: 6,
                borderTopWidth: 0, // Remove top border
                borderBottomWidth: 0, // Remove bottom border
                borderWidth: 0, // Remove any border
                elevation: 0, // Remove shadow on Android
                shadowOpacity: 0,
              },
              textInput: {
                borderRadius: 24,
                backgroundColor: "#f3f4f6",
                fontSize: 16,
                paddingHorizontal: 20, // Increase for more padding
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
        </View>
        <View
          className="flex flex-col w-11/12 bg-white rounded-2xl mb-6 items-center py-6 gap-3"
          style={[styles.shadow]}
        >
          <Text className="font-semibold text-2xl self-start px-6">When?</Text>
          <TouchableOpacity
            className="border-none rounded-full bg-gray-100 w-11/12 px-6 py-5"
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: "#222" }}>
              {startDate && endDate
                ? `${dayjs(startDate).format("MMM D, YYYY")} - ${dayjs(endDate).format("MMM D, YYYY")}`
                : startDate
                  ? `${dayjs(startDate).format("MMM D, YYYY")} - ...`
                  : "Select date range"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transparent section (about 10% height) */}
        <View
          className="w-5/6 justify-center py-6"
          style={{ backgroundColor: "transparent" }}
        >
          <View className="flex flex-row justify-between">
            <Text className="text-xl text-gray-800">
              Driver's age is 25 or above:
            </Text>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              disabled={false}
              circleSize={30}
              barHeight={30}
              circleBorderWidth={2}
              circleBorderActiveColor="#c41111"
              circleBorderInactiveColor="#d1d5db"
              backgroundActive={"#c41111"}
              backgroundInactive={"#d1d5db"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={3}
              switchRightPx={3}
              switchBorderRadius={30}
              switchWidthMultiplier={1.5}
            />
          </View>

          <Text className="text-md text-gray-400">
            In order to carry on you need to verify your age
          </Text>
        </View>

        {/* Main box with shadow (about 40% height) */}
        <View
          className="w-11/12 bg-white rounded-2xl justify-center items-center"
          style={[
            styles.shadowMain,
            { height: height * 0.3, marginBottom: height * 0.04 },
          ]}
        >
          {/* Header section for the map */}
          <View className="w-full flex-row items-center justify-between px-6 py-3 border-b border-gray-100">
            <Text className="text-2xl font-semibold text-gray-800">
              Current Location
            </Text>
            <Switch
              value={isCurrentLocationEnabled}
              onValueChange={setIsCurrentLocationEnabled}
              circleSize={30}
              barHeight={30}
              circleBorderWidth={2}
              circleBorderActiveColor="#c41111"
              circleBorderInactiveColor="#d1d5db"
              backgroundActive={"#c41111"}
              backgroundInactive={"#d1d5db"}
              circleActiveColor={"#fff"}
              circleInActiveColor={"#fff"}
              changeValueImmediately={true}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={3}
              switchRightPx={3}
              switchBorderRadius={30}
              switchWidthMultiplier={1.5}
            />
          </View>

          {/* Map content placeholder */}
          <View className="flex-1 justify-center items-center w-full">
            <MapView
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
              region={region}
              onRegionChangeComplete={setRegion}
              scrollEnabled={isCurrentLocationEnabled}
              zoomEnabled={isCurrentLocationEnabled}
              pitchEnabled={isCurrentLocationEnabled}
              rotateEnabled={isCurrentLocationEnabled}
            >
              {vehicles.map((vehicle) => (
                <Marker
                  key={vehicle.id}
                  coordinate={{
                    latitude: vehicle.address.latitude ?? 0,
                    longitude: vehicle.address.longitude ?? 0,
                  }}
                  title={`${vehicle.make} ${vehicle.model}`}
                />
              ))}
            </MapView>
          </View>
        </View>

        {/* Fixed bottom button */}
        <View
          className="absolute w-full bg-white justify-center items-center"
          style={[styles.shadowBottom, { bottom: 0, height: height / 8 }]}
        >
          <Button
            title="View Rentals"
            onPress={() => {}}
            className="w-11/12 bg-ruby"
            textClassName="text-white"
          />
        </View>
      </SafeAreaView>
      {showDatePicker && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              width: "90%",
            }}
          >
            <DateTimePicker
              mode="range"
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
              min={2}
              max={15}
              styles={defaultStyles}
            />
            <Button
              title="Done"
              onPress={() => setShowDatePicker(false)}
              className="mt-4"
            />
          </View>
        </View>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        visible={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#888",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },
  shadow: {
    shadowColor: "#CCC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 10,
  },
  shadowMain: {
    shadowColor: "#CCC",
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 10,
  },
  shadowBottom: {
    shadowColor: "#CCC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
});
