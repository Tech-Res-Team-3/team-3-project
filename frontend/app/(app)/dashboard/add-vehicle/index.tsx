import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useVehicleStore } from "../../../../stores/vehicleStore";
import type {
  Transmission,
  Condition,
  SeatbeltType,
} from "../../../../types/vehicle";
import { useVehicles } from "../../../../hooks/vehicle/useVehicles";
import { useLoadingStore } from "../../../../stores/loadingStore";

const { height } = Dimensions.get("window");

const mileageRanges = [
  "0 - 10k miles",
  "10k - 20k miles",
  "20k - 30k miles",
  "30k - 40k miles",
  "40k - 50k miles",
  "50k - 60k miles",
  "60k - 70k miles",
  "70k - 80k miles",
  "80k - 90k miles",
  "90k - 100k miles",
  "100k - 110k miles",
  "110k - 120k miles",
  "120k - 130k miles",
  "130k - 140k miles",
  "140k - 150k miles",
  "150k - 160k miles",
  "160k - 170k miles",
  "170k - 180k miles",
  "180k - 190k miles",
  "190k - 200k miles",
];

const transmissionOptions: Transmission[] = ["AUTOMATIC", "MANUAL"];
const conditionOptions: Condition[] = [
  "EXCELLENT",
  "GOOD",
  "FAIR",
  "NOT WORKING",
];
const seatbeltTypeOptions: SeatbeltType[] = ["SHOULDER", "LAP", "BOTH"];

export default function AddVehicleIntroScreen() {
  const router = useRouter();
  const { vin: vinParam } = useLocalSearchParams<{ vin?: string }>();
  const { vehicleDraft, setVehicleDraft } = useVehicleStore();

  // Modal state
  const [mileageModalVisible, setMileageModalVisible] = useState(false);
  const [transModalVisible, setTransModalVisible] = useState(false);
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [seatbeltModalVisible, setSeatbeltModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [trimModalVisible, setTrimModalVisible] = useState(false);
  const [bodyStyleModalVisible, setBodyStyleModalVisible] = useState(false);
  const { addVehicleAsync } = useVehicles();
  const setLoading = useLoadingStore((s) => s.setLoading);

  // If coming back from verify-vin, update draft with VIN
  useEffect(() => {
    if (vinParam && vinParam !== vehicleDraft?.vin) {
      setVehicleDraft({ ...vehicleDraft, vin: vinParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vinParam]);

  // Compose car name from draft (will be populated after VIN verification)
  const carName = [vehicleDraft?.year, vehicleDraft?.make, vehicleDraft?.model]
    .filter(Boolean)
    .join(" ")
    .trim();

  // Handler for navigating to verify-vin screen
  const goToVerifyVin = () => {
    router.push("/dashboard/add-vehicle/verify-vin");
  };

  // Handler for Next button (proceed to next step)
  const handleNext = async () => {
    if (!vehicleDraft) return;
    setLoading(true);
    try {
      const draftToSend = {
        ...vehicleDraft,
        extraInfo: vehicleDraft.extraInfo ?? "", // default to empty string if undefined/null
      };
      await addVehicleAsync(draftToSend);
      setLoading(false);
      router.replace("/dashboard/vehicle-dashboard");
    } catch (err) {
      setLoading(false);
      // Optionally show error to user
      alert("Failed to add vehicle. Please try again.");
    }
  };

  // Helper to display mileage as string
  const getMileageLabel = () => {
    if (vehicleDraft?.mileage === undefined || vehicleDraft?.mileage === null)
      return "";
    for (let i = 0; i < mileageRanges.length; i++) {
      const [min, max] = mileageRanges[i]
        .replace(/k/g, "000")
        .replace(/ miles/g, "")
        .split(" - ")
        .map(Number);
      if (vehicleDraft.mileage >= min && vehicleDraft.mileage <= max) {
        return mileageRanges[i];
      }
    }
    return `${vehicleDraft.mileage} miles`;
  };

  // Helper for boolean fields
  const renderBooleanSwitch = (
    label: string,
    value: boolean | undefined,
    onValueChange: (val: boolean) => void
  ) => (
    <View className="flex-row items-center justify-between bg-gray-100 rounded-xl px-4 py-4 mb-4">
      <Text className="mb-1 text-lg font-semibold text-gray-600">{label}</Text>
      <Switch
        value={!!value}
        onValueChange={onValueChange}
        trackColor={{ false: "#d1d5db", true: "#c41111" }}
        thumbColor={value ? "#fff" : "#fff"}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: height / 8 + 10 }}
      >
        <View className="flex-1 items-center justify-start w-full">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mt-8 mb-6 self-center">
            Add Vehicle
          </Text>

          {/* Placeholder image */}
          <View
            className="w-11/12 bg-gray-200 rounded-2xl mb-6 items-center justify-center"
            style={{ height: height * 0.23 }}
          >
            <Text className="text-gray-400 text-lg">[Photo Placeholder]</Text>
          </View>

          {/* Main content */}
          <View
            className="w-11/12 bg-white rounded-2xl items-center py-8 px-4"
            style={[styles.shadow]}
          >
            <Text className="text-xl font-semibold text-gray-900 mb-4 self-start">
              Let's talk about your car
            </Text>
            <View className="w-full mb-2">
              <Text className="mb-2 text-lg font-semibold text-gray-600">
                What car do you have? <Text className="text-ruby">*</Text>
              </Text>
              <Pressable
                className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4"
                onPress={goToVerifyVin}
              >
                <TextInput
                  className="flex-1 text-lg text-gray-900"
                  value={carName}
                  placeholder="Identify your car"
                  placeholderTextColor="#d1d5db"
                  editable={false}
                  pointerEvents="none"
                />
                <TouchableOpacity
                  onPress={goToVerifyVin}
                  style={{
                    marginLeft: 8,
                    padding: 8,
                  }}
                  accessibilityLabel="Verify VIN"
                >
                  <FontAwesome name="chevron-right" size={20} color="#c41111" />
                </TouchableOpacity>
              </Pressable>
              {/* Show VIN if confirmed */}
              {vehicleDraft?.vin && (
                <View className="mt-4">
                  <Text className="mb-2 text-lg font-semibold text-gray-600">
                    VIN <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900 bg-gray-100 rounded-xl px-4 py-4"
                    value={vehicleDraft.vin}
                    editable={false}
                  />
                </View>
              )}
            </View>

            {/* Car details view, only if VIN is present */}
            {vehicleDraft?.vin && (
              <View className="w-full mt-8">
                <Text className="text-xl font-semibold text-gray-900 mb-4 self-start">
                  Car details
                </Text>

                {/* Mileage field */}
                <Pressable
                  className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4 mb-4"
                  onPress={() => setMileageModalVisible(true)}
                >
                  <View className="flex-1">
                    <Text className="mb-1 text-lg font-semibold text-gray-600">
                      Car's current mileage <Text className="text-ruby">*</Text>
                    </Text>
                    <Text className="text-lg text-gray-900">
                      {getMileageLabel() || "Select mileage"}
                    </Text>
                  </View>
                  <FontAwesome name="chevron-right" size={20} color="#c41111" />
                </Pressable>

                {/* Transmission type field */}
                <Pressable
                  className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4 mb-4"
                  onPress={() => setTransModalVisible(true)}
                >
                  <View className="flex-1">
                    <Text className="mb-1 text-lg font-semibold text-gray-600">
                      Transmission type <Text className="text-ruby">*</Text>
                    </Text>
                    <Text className="text-lg text-gray-900">
                      {vehicleDraft?.transmission || "Select transmission"}
                    </Text>
                  </View>
                  <FontAwesome name="chevron-right" size={20} color="#c41111" />
                </Pressable>

                {/* Condition field */}
                <Pressable
                  className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4 mb-4"
                  onPress={() => setConditionModalVisible(true)}
                >
                  <View className="flex-1">
                    <Text className="mb-1 text-lg font-semibold text-gray-600">
                      Condition <Text className="text-ruby">*</Text>
                    </Text>
                    <Text className="text-lg text-gray-900">
                      {vehicleDraft?.condition || "Select condition"}
                    </Text>
                  </View>
                  <FontAwesome name="chevron-right" size={20} color="#c41111" />
                </Pressable>

                {/* Seatbelt type field */}
                <Pressable
                  className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4 mb-4"
                  onPress={() => setSeatbeltModalVisible(true)}
                >
                  <View className="flex-1">
                    <Text className="mb-1 text-lg font-semibold text-gray-600">
                      Seatbelt type <Text className="text-ruby">*</Text>
                    </Text>
                    <Text className="text-lg text-gray-900">
                      {vehicleDraft?.seatbeltType || "Select seatbelt type"}
                    </Text>
                  </View>
                  <FontAwesome name="chevron-right" size={20} color="#c41111" />
                </Pressable>

                {/* Has seatbelts */}
                {renderBooleanSwitch(
                  "Has seatbelts",
                  vehicleDraft?.hasSeatbelts,
                  (val) =>
                    setVehicleDraft({ ...vehicleDraft, hasSeatbelts: val })
                )}

                {/* Has salvage title */}
                {renderBooleanSwitch(
                  "Has salvage title",
                  vehicleDraft?.hasSalvageTitle,
                  (val) =>
                    setVehicleDraft({ ...vehicleDraft, hasSalvageTitle: val })
                )}

                {/* Sales tax paid */}
                {renderBooleanSwitch(
                  "Sales tax paid",
                  vehicleDraft?.salesTaxPaid,
                  (val) =>
                    setVehicleDraft({ ...vehicleDraft, salesTaxPaid: val })
                )}

                {/* License plate */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    License plate <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.licensePlate || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, licensePlate: text })
                    }
                    placeholder="Enter license plate"
                  />
                </View>

                {/* Color */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Color <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.color || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, color: text })
                    }
                    placeholder="Enter color"
                  />
                </View>

                {/* Value */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Value ($) <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={
                      vehicleDraft?.value !== undefined
                        ? String(vehicleDraft.value)
                        : ""
                    }
                    onChangeText={(text) =>
                      setVehicleDraft({
                        ...vehicleDraft,
                        value: Number(text.replace(/[^0-9]/g, "")),
                      })
                    }
                    placeholder="Enter value"
                    keyboardType="numeric"
                  />
                </View>

                {/* Type */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Type <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.type || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, type: text })
                    }
                    placeholder="Enter type"
                  />
                </View>

                {/* Trim */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Trim <Text className="text-ruby">*</Text>
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.trim || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, trim: text })
                    }
                    placeholder="Enter trim"
                  />
                </View>

                {/* Body class (from VIN API) */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Body class
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.bodyStyle || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, bodyStyle: text })
                    }
                    placeholder="Enter body class"
                  />
                </View>

                {/* Doors (from VIN API) */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Doors
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={
                      vehicleDraft?.seats !== undefined
                        ? String(vehicleDraft.seats)
                        : ""
                    }
                    onChangeText={(text) =>
                      setVehicleDraft({
                        ...vehicleDraft,
                        seats: Number(text.replace(/[^0-9]/g, "")),
                      })
                    }
                    placeholder="Enter number of doors"
                    keyboardType="numeric"
                  />
                </View>

                {/* Extra info */}
                <View className="bg-gray-100 rounded-xl px-4 py-4 mb-4">
                  <Text className="mb-1 text-lg font-semibold text-gray-600">
                    Extra info
                  </Text>
                  <TextInput
                    className="w-full text-lg text-gray-900"
                    value={vehicleDraft?.extraInfo || ""}
                    onChangeText={(text) =>
                      setVehicleDraft({ ...vehicleDraft, extraInfo: text })
                    }
                    placeholder="Enter extra info"
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Mileage Modal */}
      <Modal
        visible={mileageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMileageModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-6">
            <Text className="text-lg font-bold mb-4">Select mileage</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {mileageRanges.map((range, idx) => (
                <TouchableOpacity
                  key={range}
                  className="py-3"
                  onPress={() => {
                    const max = Number(
                      range
                        .split("-")[1]
                        ?.replace(/k miles/, "000")
                        .replace(/\s/g, "")
                    );
                    setVehicleDraft({
                      ...vehicleDraft,
                      mileage: max,
                    });
                    setMileageModalVisible(false);
                  }}
                >
                  <Text className="text-lg">{range}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Cancel"
              onPress={() => setMileageModalVisible(false)}
              className="mt-4 bg-gray-200"
              textClassName="text-gray-700"
            />
          </View>
        </View>
      </Modal>

      {/* Transmission Modal */}
      <Modal
        visible={transModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTransModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-6">
            <Text className="text-lg font-bold mb-4">Select transmission</Text>
            {transmissionOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className="py-3"
                onPress={() => {
                  setVehicleDraft({
                    ...(vehicleDraft || {}),
                    transmission: option,
                  });
                  setTransModalVisible(false);
                }}
              >
                <Text className="text-lg">
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              title="Cancel"
              onPress={() => setTransModalVisible(false)}
              className="mt-4 bg-gray-200"
              textClassName="text-gray-700"
            />
          </View>
        </View>
      </Modal>

      {/* Condition Modal */}
      <Modal
        visible={conditionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConditionModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-6">
            <Text className="text-lg font-bold mb-4">Select condition</Text>
            {conditionOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className="py-3"
                onPress={() => {
                  setVehicleDraft({
                    ...(vehicleDraft || {}),
                    condition: option,
                  });
                  setConditionModalVisible(false);
                }}
              >
                <Text className="text-lg">
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              title="Cancel"
              onPress={() => setConditionModalVisible(false)}
              className="mt-4 bg-gray-200"
              textClassName="text-gray-700"
            />
          </View>
        </View>
      </Modal>

      {/* Seatbelt Type Modal */}
      <Modal
        visible={seatbeltModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSeatbeltModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-6">
            <Text className="text-lg font-bold mb-4">Select seatbelt type</Text>
            {seatbeltTypeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className="py-3"
                onPress={() => {
                  setVehicleDraft({
                    ...(vehicleDraft || {}),
                    seatbeltType: option,
                  });
                  setSeatbeltModalVisible(false);
                }}
              >
                <Text className="text-lg">
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              title="Cancel"
              onPress={() => setSeatbeltModalVisible(false)}
              className="mt-4 bg-gray-200"
              textClassName="text-gray-700"
            />
          </View>
        </View>
      </Modal>

      {/* Fixed bottom button */}
      <View
        className="absolute w-full bg-white justify-center items-center"
        style={{
          bottom: 0,
          height: height / 8,
          shadowColor: "#CCC",
          shadowOffset: { width: 0, height: 0 },
          elevation: 5,
        }}
      >
        <Button
          title="Next"
          onPress={handleNext}
          disabled={!carName || !vehicleDraft?.vin}
          className="w-11/12 bg-ruby"
          textClassName="text-white"
        />
      </View>
    </SafeAreaView>
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
