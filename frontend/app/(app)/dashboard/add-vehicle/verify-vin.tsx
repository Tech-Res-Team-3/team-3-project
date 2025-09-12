import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components/Button";
import { useRouter } from "expo-router";
import { Switch } from "react-native-switch";
import { fetchVehicleDetailsByVin } from "../../../../utils/fetchVehicleDetailsByVin";
import { useVehicleStore } from "../../../../stores/vehicleStore";
import { mapNhtsaToVehicleDraft } from "../../../../utils/mapNhtsaToVehicleDraft";

const { height } = Dimensions.get("window");

export default function VerifyVinScreen() {
  const router = useRouter();
  const { vehicleDraft, setVehicleDraft } = useVehicleStore();
  const [vin, setVin] = useState(vehicleDraft?.vin ?? "");
  const [is1981OrLater, setIs1981OrLater] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!vin || vin.length < 5) {
      Alert.alert("Invalid VIN", "Please enter a valid VIN.");
      return;
    }
    setLoading(true);
    try {
      const modelYear = is1981OrLater ? undefined : 1980;
      const data = await fetchVehicleDetailsByVin(vin, modelYear);
      if (data?.Results) {
        // Map NHTSA data to vehicleDraft
        const mapped = mapNhtsaToVehicleDraft(data.Results);
        setVehicleDraft({ ...vehicleDraft, ...mapped, vin });
        // Go back to add-vehicle screen, passing VIN as param
        router.replace({ pathname: "/dashboard/add-vehicle", params: { vin } });
      } else {
        Alert.alert(
          "Not found",
          "Could not fetch vehicle details for this VIN."
        );
      }
    } catch (e) {
      Alert.alert("Error", "Failed to fetch vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-start w-full">
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mt-8 mb-6 self-center">
          Verify VIN
        </Text>

        {/* Main content */}
        <View
          className="w-11/12 bg-white rounded-2xl items-center py-8 px-4"
          style={{ elevation: 4 }}
        >
          <Text className="text-xl font-semibold text-gray-900 mb-4 self-start">
            Let's verify your car VIN
          </Text>
          <View className="w-full mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-600">
              My car's model number is 1981 or later
            </Text>
            <Switch
              value={is1981OrLater}
              onValueChange={setIs1981OrLater}
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
          <View className="w-full mb-2">
            <Text className="mb-2 text-lg font-semibold text-gray-600">
              VIN <Text className="text-ruby">*</Text>
            </Text>
            <TextInput
              className="w-full text-lg text-gray-900 bg-gray-100 rounded-xl px-4 py-6"
              value={vin}
              onChangeText={setVin}
              placeholder="Enter VIN"
              placeholderTextColor="#d1d5db"
              autoCapitalize="characters"
              editable={!loading}
            />
          </View>
        </View>
      </View>
      {/* Fixed bottom button */}
      <View
        className="absolute w-full bg-white justify-center items-center"
        style={{
          bottom: 0,
          height: height / 8,
          borderTopWidth: 1,
          borderColor: "#f3f4f6",
          shadowColor: "#CCC",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 10,
        }}
      >
        <Button
          title={loading ? "Verifying..." : "Next"}
          onPress={handleNext}
          disabled={!vin || loading}
          className="py-6 w-11/12 bg-ruby"
          textClassName="text-white text-xl"
        />
      </View>
    </SafeAreaView>
  );
}
