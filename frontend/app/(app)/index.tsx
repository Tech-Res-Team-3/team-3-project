import React, { useEffect, useRef, useState, useCallback } from "react";
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
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import MapView, { Callout, Marker, Region } from "react-native-maps";
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
import notifee, { AndroidStyle } from "@notifee/react-native";
import { useVehicles } from "../../hooks/vehicle/useVehicles";
import { useMapStore } from "../../stores/mapStore";

dayjs.locale("en");

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
const { height, width } = Dimensions.get("window");

const DEFAULT_REGION: Region = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

async function requestPermissionIfNeeded() {
  const settings = await notifee.requestPermission();
}

export default function MainAppScreen() {
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCurrentLocationEnabled, setIsCurrentLocationEnabled] =
    useState(true);

  const pendingRegion = useMapStore((s) => s.pendingRegion);
  const setPendingRegion = useMapStore((s) => s.setPendingRegion);
  const region = useMapStore((s) => s.region) ?? DEFAULT_REGION;
  const setRegion = useMapStore((s) => s.setRegion);
  const { vehicles, fetchVehiclesNearby } = useVehicles();
  const defaultStyles = useDefaultStyles();
  const [startDate, setStartDate] = useState<DateType>();
  const [endDate, setEndDate] = useState<DateType>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [vehiclePrices, setVehiclePrices] = useState<{ [id: number]: number }>(
    {}
  );

  useEffect(() => {
    if (!useMapStore.getState().region) {
      useMapStore.getState().setRegion(DEFAULT_REGION);
    }
  }, []);

  function getOrGeneratePrice(vehicleId: number) {
    if (vehiclePrices[vehicleId] !== undefined) {
      return vehiclePrices[vehicleId];
    }
    const price = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
    setVehiclePrices((prev) => ({ ...prev, [vehicleId]: price }));
    return price;
  }

  requestPermissionIfNeeded();

  function getRadiusFromRegion(region: { latitudeDelta: number }) {
    return (region.latitudeDelta / 2) * 111;
  }

  function areRegionsEqual(
    r1: Region,
    r2: Region,
    threshold = 0.0001
  ): boolean {
    return (
      Math.abs(r1.latitude - r2.latitude) < threshold &&
      Math.abs(r1.longitude - r2.longitude) < threshold &&
      Math.abs(r1.latitudeDelta - r2.latitudeDelta) < threshold &&
      Math.abs(r1.longitudeDelta - r2.longitudeDelta) < threshold
    );
  }

  useEffect(() => {
    console.log("useEffect triggered", region, fetchVehiclesNearby);
    const timeout = setTimeout(() => {
      const radius = getRadiusFromRegion(region);
      fetchVehiclesNearby(region.latitude, region.longitude, radius);
    }, 400);

    return () => clearTimeout(timeout);
  }, [region, fetchVehiclesNearby]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        console.log(
          "Back button pressed on main app - showing logout confirmation modal"
        );
        setShowLogoutModal(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const handleLogoutConfirm = async () => {
    console.log("Starting logout process...");
    setShowLogoutModal(false);
    useLoadingStore.getState().setLoading(true);

    try {
      useAuthStore.getState().clearUser();
      console.log("Cleared Zustand user data");

      const app = getApp();
      const auth = getAuth(app);
      await signOut(auth);
      useMapStore.getState().setRegion(null);
      useMapStore.getState().setPendingRegion(null);
      useMapStore.getState().setLastSearch("");
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

  async function handleTestNotification() {
    try {
      await notifee.displayNotification({
        title: "Test Notification",
        body: "This is a local test notification!",
        android: {
          channelId: "alerts",
          color: "#c41111",
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

  const placesRef = useRef<any>(null);

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

        {/* Two stacked views at the top */}
        <View
          className="flex flex-col w-11/12 bg-white rounded-2xl mb-6 items-center py-6 gap-3"
          style={[styles.shadow]}
        >
          <Text className="font-semibold text-2xl self-start px-6">
            City, Address, Airport
          </Text>
          <GooglePlacesAutocomplete
            ref={placesRef}
            placeholder="Los Angeles, CA"
            placeholderTextColor="#d1d5db"
            onPress={(data, details = null) => {
              if (details && details.geometry && details.geometry.location) {
                const { lat, lng } = details.geometry.location;
                setPendingRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.1,
                });
              }
              placesRef.current?.close && placesRef.current.close();
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

        {/* Transparent section */}
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

        {/* Main box with shadow */}
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

          {/* Map content */}
          <View className="flex-1 justify-center items-center w-full">
            <MapView
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
              region={region}
              onRegionChangeComplete={(newRegion) => {
                if (!areRegionsEqual(region, newRegion)) {
                  setRegion(newRegion);
                }
              }}
              scrollEnabled={isCurrentLocationEnabled}
              zoomEnabled={isCurrentLocationEnabled}
              pitchEnabled={isCurrentLocationEnabled}
              rotateEnabled={isCurrentLocationEnabled}
            >
              {vehicles.map((vehicle) =>
                vehicle.address ? (
                  <Marker
                    key={vehicle.id}
                    coordinate={{
                      latitude: vehicle.address.latitude ?? 0,
                      longitude: vehicle.address.longitude ?? 0,
                    }}
                    image={require("../../assets/rao-icon-medium.png")}
                  >
                    <Callout
                      onPress={() => router.push(`/vehicle/${vehicle.id}`)}
                    >
                      <View className="w-fit p-0">
                        <Text className="font-bold text-base">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </Text>
                        <Text className="text-emerald-500 text-lg mt-1">
                          ${getOrGeneratePrice(vehicle.id)}/day
                        </Text>
                      </View>
                    </Callout>
                  </Marker>
                ) : null
              )}
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
            onPress={() => {
              if (pendingRegion) {
                setRegion(pendingRegion);
              }
            }}
            className="py-6 bg-ruby w-11/12"
            textClassName="text-xl text-white"
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
