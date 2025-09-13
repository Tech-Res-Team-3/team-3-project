import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useVehicleStore } from "../../../../stores/vehicleStore";
import { CalendarAltIcon } from "../../../../components/icons/CalendarAltIcon";
import { ClockSmallIcon } from "../../../../components/icons/ClockSmallIcon";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { Button } from "../../../../components/Button";
import { useBookings } from "../../../../hooks/booking/useBookings";
import { useTrips } from "../../../../hooks/trip/useTrips";
import { useAuthStore } from "../../../../stores/authStore";
import axiosInstance from "../../../../utils/axios";

const { width, height } = Dimensions.get("window");

export default function VehicleDetailScreen() {
  const defaultStyles = useDefaultStyles();
  const { price, vehicleId } = useLocalSearchParams();
  const vehicle = useVehicleStore((state) =>
    state.vehicles.find((v) => v.id === Number(vehicleId))
  );
  const bookingPrice = Number(price) || 0;
  const { addTrip } = useTrips();
  const user = useAuthStore((s) => s.user);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { addBooking } = useBookings();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState<"from" | "to" | null>(
    null
  );
  // Date and time state
  const [fromDate, setFromDate] = useState<DateType>();
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState<DateType>();
  const [toTime, setToTime] = useState("");

  // Helper to format date for display
  const formatDate = (date?: DateType) =>
    date ? dayjs(date).format("MMM D, YYYY") : "Select date";

  if (!vehicle) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
        <Text>Loading vehicle...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center">
      {/* Vehicle Photo */}
      <View className="w-full items-center">
        <Image
          source={
            vehicle.vehicleImage
              ? { uri: vehicle.vehicleImage }
              : require("../../../../assets/default-bmw.jpg")
          }
          className="w-11/12 h-56 rounded-2xl"
          resizeMode="cover"
        />
      </View>

      {/* Vehicle Info (no card, just text) */}
      <View className="w-11/12 mt-5 mb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          {vehicle.year} {vehicle.make} {vehicle.model}{" "}
          <Text className="font-normal text-lg text-gray-500">
            • {vehicle.licensePlate}
          </Text>
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-400 font-bold text-lg">
            ★ {vehicle.rating ?? 0}
          </Text>
          <Text className="text-gray-500 font-medium text-base ml-6">
            {vehicle.trips?.length ?? 0} trips
          </Text>
        </View>
      </View>

      <ScrollView
        className="w-full"
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          paddingBottom: 32,
        }}
      >
        {/* Trip Dates Card */}
        <View className="w-11/12 bg-white rounded-2xl p-5 mt-5 shadow">
          <Text className="text-xl font-bold mb-4">Trip Dates</Text>
          {/* From Row */}
          <View className="flex-row items-center mb-3 gap-4">
            {/* From Date */}
            <View className="flex-1">
              <Text className="text-base text-gray-500 mb-1">From</Text>
              <TouchableOpacity
                className="flex-row items-center bg-gray-100 rounded px-3 py-2 min-w-[80px]"
                onPress={() => {
                  setActiveDateField("from");
                  setShowDatePicker(true);
                }}
              >
                <CalendarAltIcon size={22} color="#c41111" />
                <Text className="text-base text-gray-900 ml-2">
                  {formatDate(fromDate)}
                </Text>
              </TouchableOpacity>
            </View>
            {/* From Time */}
            <View className="flex-1">
              <Text className="text-base text-gray-500 mb-1">Time</Text>
              <TouchableOpacity className="flex-row items-center bg-gray-100 rounded px-3 py-2 min-w-[80px]">
                <ClockSmallIcon size={22} color="#c41111" />
                <Text className="text-base text-gray-900 ml-2">
                  {fromTime || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* To Row */}
          <View className="flex-row items-center mb-3 gap-4">
            {/* To Date */}
            <View className="flex-1">
              <Text className="text-base text-gray-500 mb-1">To</Text>
              <TouchableOpacity
                className="flex-row items-center bg-gray-100 rounded px-3 py-2 min-w-[80px]"
                onPress={() => {
                  setActiveDateField("to");
                  setShowDatePicker(true);
                }}
              >
                <CalendarAltIcon size={22} color="#c41111" />
                <Text className="text-base text-gray-900 ml-2">
                  {formatDate(toDate)}
                </Text>
              </TouchableOpacity>
            </View>
            {/* To Time */}
            <View className="flex-1">
              <Text className="text-base text-gray-500 mb-1">Time</Text>
              <TouchableOpacity className="flex-row items-center bg-gray-100 rounded px-3 py-2 min-w-[80px]">
                <ClockSmallIcon size={22} color="#c41111" />
                <Text className="text-base text-gray-900 ml-2">
                  {toTime || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Pickup & Return Card */}
        <View className="w-11/12 bg-white rounded-2xl p-5 mt-5 shadow">
          <Text className="text-xl font-bold mb-4">Pickup</Text>
          <Text className="text-base text-gray-700 mt-1 mb-2">
            Pickup location and instructions...
          </Text>
          <Text className="text-xl font-bold mt-5 mb-4">Return</Text>
          <Text className="text-base text-gray-700 mt-1 mb-2">
            Return location and instructions...
          </Text>
        </View>
        {/* Trip Savings Card */}
        <View className="w-11/12 bg-white rounded-2xl p-5 mt-5 shadow">
          <Text className="text-xl font-bold mb-4">Trip Savings</Text>
          <TouchableOpacity className="flex-row items-center bg-gray-100 rounded px-3 py-2 w-11/12">
            <Text className="text-base text-gray-900 flex-1">
              3+ day discount
            </Text>
            <Text className="text-base text-ruby/60">US$79</Text>
          </TouchableOpacity>
        </View>
        {/* Cancellation Policy */}
        <View className="w-11/12 bg-white rounded-2xl p-5 mt-5 shadow">
          <Text className="text-xl font-bold mb-4">Cancellation Policy</Text>
          <Text className="text-base text-gray-700 mt-1 mb-2">
            Free Cancellation
          </Text>
          <Text className="text-base text-gray-500 mt-1 mb-2">
            Free refund before{" "}
            <Text className="text-gray-600 font-bold">10/01/2025 at 12AM</Text>
          </Text>
        </View>
      </ScrollView>
      <View className="w-full pt-4">
        <Button
          title="Confirm Booking"
          className="py-6 bg-ruby w-11/12 self-center"
          textClassName="text-white text-xl"
        />
      </View>

      {/* Date Picker Modal */}
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
              mode="single"
              date={activeDateField === "from" ? fromDate : toDate}
              onChange={({ date }) => {
                if (activeDateField === "from") setFromDate(date);
                else if (activeDateField === "to") setToDate(date);
              }}
              styles={defaultStyles}
            />
            <TouchableOpacity
              className="mt-4 bg-ruby rounded py-3"
              onPress={() => setShowDatePicker(false)}
            >
              <Text className="text-white text-center text-lg">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Booking Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              width: "85%",
            }}
          >
            <Text className="text-xl font-bold mb-2">Confirm Your Booking</Text>
            <Text>
              Vehicle: {vehicle.year} {vehicle.make} {vehicle.model}
            </Text>
            <Text>
              From: {formatDate(fromDate)} {fromTime}
            </Text>
            <Text>
              To: {formatDate(toDate)} {toTime}
            </Text>
            <Text className="mt-2 text-lg font-semibold">
              Price: ${bookingPrice}
            </Text>
            <View className="flex-row justify-between mt-6">
              <Button
                title="Cancel"
                className="bg-gray-300 flex-1 mr-2"
                textClassName="text-gray-800"
                onPress={() => setShowConfirmModal(false)}
              />
              <Button
                title="Book"
                className="bg-ruby flex-1 ml-2"
                textClassName="text-white"
                onPress={async () => {
                  // Prepare trip data
                  const tripData = {
                    startLocation: { latitude: 0, longitude: 0 }, // TODO: get real values
                    endLocation: { latitude: 0, longitude: 0 }, // TODO: get real values
                    startAt: fromDate
                      ? dayjs.isDayjs(fromDate)
                        ? fromDate.toDate().toISOString()
                        : new Date(fromDate).toISOString()
                      : new Date().toISOString(),
                    endAt: toDate
                      ? dayjs.isDayjs(toDate)
                        ? toDate.toDate().toISOString()
                        : new Date(toDate).toISOString()
                      : new Date().toISOString(),
                    status: "SCHEDULED",
                    price: bookingPrice,
                    discount: 0,
                    rating: 0,
                    userId: user?.id,
                    vehicleId: vehicle.id,
                  };
                  // Call backend to create trip (and booking)
                  const res = await axiosInstance.post("/trips", tripData);
                  addTrip(res.data); // Add to Zustand
                  setShowConfirmModal(false);
                  // Optionally navigate or show success
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
