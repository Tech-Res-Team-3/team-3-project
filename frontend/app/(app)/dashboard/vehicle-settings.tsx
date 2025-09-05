import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVehicles } from "../../../hooks/vehicle/useVehicles";
import { useAddresses } from "../../../hooks/address/useAddresses";
import { Vehicle } from "../../../types/vehicle";

export default function VehicleSettings() {
  const { vehicles, fetchUserVehicles, addVehicleAsync, removeVehicleAsync } =
    useVehicles();
  const { addresses, fetchUserAddresses } = useAddresses();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({});

  // Enum and boolean options
  const transmissionOptions = ["AUTOMATIC", "MANUAL"];
  const conditionOptions = ["EXCELLENT", "GOOD", "FAIR", "NOT WORKING"];
  const seatbeltTypeOptions = ["SHOULDER", "LAP", "BOTH"];

  useEffect(() => {
    fetchUserVehicles();
  }, []);

  useEffect(() => {
    if (addressModalVisible) {
      // TODO VEHICLE: Update logic to actually fetch addresses saved under current user
      // fetchUserAddresses();
    }
  }, [addressModalVisible]);

  // Minimal required fields for demo; expand as needed
  const requiredFields = [
    "make",
    "model",
    "year",
    "licensePlate",
    "color",
    "type",
    "value",
    "seatbeltType",
    "condition",
    "vin",
    "mileage",
    "transmission",
    "salesTaxPaid",
    "trim",
    "bodyStyle",
    "hasSalvageTitle",
    "extraInfo",
  ];

  const handleAddVehicle = async () => {
    for (const field of requiredFields) {
      const val = newVehicle[field as keyof Vehicle];
      if (
        val === undefined ||
        val === "" ||
        (typeof val === "number" && isNaN(val))
      ) {
        Alert.alert("Missing Field", `Please enter ${field}`);
        return;
      }
    }
    try {
      await addVehicleAsync({
        ...newVehicle,
        seatbeltType: newVehicle.seatbeltType || undefined,
        condition: newVehicle.condition || undefined,
        transmission: newVehicle.transmission || undefined,
      });
      await fetchUserVehicles();
      setAddModalVisible(false);
      setNewVehicle({});
    } catch (err) {
      console.error("Add vehicle error:", err);
      Alert.alert("Error", "Failed to add vehicle.");
    }
  };

  const handleRemoveVehicle = async (id: number) => {
    try {
      await removeVehicleAsync(id);
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Error", "Failed to remove vehicle.");
    }
  };

  // Assign address to vehicle (adjust endpoint as needed)
  const handleAssignAddress = async () => {
    if (!selectedVehicle || !selectedAddressId) return;
    try {
      // Example PATCH request, adjust as needed for your backend
      await fetch(
        `${process.env.API_URL || "http://localhost:3333"}/vehicles/${selectedVehicle.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            addressId: selectedAddressId,
          }),
        }
      );
      setAddressModalVisible(false);
      setModalVisible(false);
      Alert.alert("Success", "Address assigned to vehicle.");
    } catch (err) {
      Alert.alert("Error", "Failed to assign address.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Vehicle Settings
      </Text>
      <ScrollView>
        {vehicles.length === 0 && (
          <Text style={{ color: "#888", marginBottom: 16 }}>
            No vehicles found.
          </Text>
        )}
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={{
              backgroundColor: "#eee",
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
              alignItems: "center",
            }}
            onPress={() => {
              setSelectedVehicle(vehicle);
              setModalVisible(true);
            }}
          >
            <Text style={{ fontSize: 18 }}>Vehicle ID: {vehicle.id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title="Add Vehicle" onPress={() => setAddModalVisible(true)} />

      {/* Vehicle Info Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
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
              borderRadius: 12,
              padding: 24,
              width: "90%",
            }}
          >
            {selectedVehicle && (
              <>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}
                >
                  Vehicle ID: {selectedVehicle.id}
                </Text>
                {Object.entries(selectedVehicle).map(([key, value]) => (
                  <Text key={key} style={{ marginBottom: 4 }}>
                    {key}: {String(value)}
                  </Text>
                ))}
                <Button
                  title="Add Address to Vehicle"
                  onPress={() => setAddressModalVisible(true)}
                />
                <Button
                  title="Remove Vehicle"
                  color="#c41111"
                  onPress={() => handleRemoveVehicle(selectedVehicle.id)}
                />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Address Selection Modal */}
      <Modal
        visible={addressModalVisible}
        animationType="slide"
        transparent={true}
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
              borderRadius: 12,
              padding: 24,
              width: "90%",
              maxHeight: "80%",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Select Address
            </Text>
            {addresses.length === 0 ? (
              <Text style={{ color: "#888", marginBottom: 16 }}>
                No addresses found. Please add an address first.
              </Text>
            ) : (
              <ScrollView style={{ maxHeight: 300 }}>
                {addresses.map((address) => (
                  <TouchableOpacity
                    key={address.id}
                    style={{
                      padding: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                      backgroundColor:
                        selectedAddressId === address.id ? "#f3f3f3" : "#fff",
                    }}
                    onPress={() => setSelectedAddressId(address.id)}
                  >
                    <Text>
                      {address.street}
                      {address.apartment ? `, Apt ${address.apartment}` : ""}
                    </Text>
                    <Text>
                      {address.city}, {address.state} {address.zip}
                    </Text>
                    <Text>{address.country}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <Button
              title="Assign Address"
              disabled={!selectedAddressId}
              onPress={handleAssignAddress}
            />
            <Button
              title="Cancel"
              onPress={() => setAddressModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Add Vehicle Modal */}
      <Modal visible={addModalVisible} animationType="slide" transparent={true}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 24,
              width: "90%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
              Add New Vehicle
            </Text>

            <Text style={{ fontWeight: "bold" }}>Make</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.make || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, make: text }))
              }
              placeholder="Enter make"
            />

            <Text style={{ fontWeight: "bold" }}>Model</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.model || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, model: text }))
              }
              placeholder="Enter model"
            />

            <Text style={{ fontWeight: "bold" }}>Year</Text>
            <TextInput
              style={inputStyle}
              value={
                typeof newVehicle.year === "number"
                  ? newVehicle.year.toString()
                  : newVehicle.year || ""
              }
              onChangeText={(text) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  year: text === "" ? undefined : Number(text),
                }))
              }
              placeholder="Enter year"
              keyboardType="numeric"
            />

            <Text style={{ fontWeight: "bold" }}>License Plate</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.licensePlate || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, licensePlate: text }))
              }
              placeholder="Enter license plate"
            />

            <Text style={{ fontWeight: "bold" }}>Color</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.color || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, color: text }))
              }
              placeholder="Enter color"
            />

            <Text style={{ fontWeight: "bold" }}>Type</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.type || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, type: text }))
              }
              placeholder="Enter type"
            />

            <Text style={{ fontWeight: "bold" }}>Value</Text>
            <TextInput
              style={inputStyle}
              value={
                typeof newVehicle.value === "number"
                  ? newVehicle.value.toString()
                  : newVehicle.value || ""
              }
              onChangeText={(text) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  value: text === "" ? undefined : Number(text),
                }))
              }
              placeholder="Enter value"
              keyboardType="numeric"
            />

            <Text style={{ fontWeight: "bold" }}>Seatbelt Type</Text>
            <Picker
              selectedValue={newVehicle.seatbeltType || ""}
              onValueChange={(value) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  seatbeltType: value as Vehicle["seatbeltType"],
                }))
              }
            >
              <Picker.Item label="Select seatbelt type" value="" />
              {seatbeltTypeOptions.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>

            <Text style={{ fontWeight: "bold" }}>Condition</Text>
            <Picker
              selectedValue={newVehicle.condition || ""}
              onValueChange={(value) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  condition: value as Vehicle["condition"],
                }))
              }
            >
              <Picker.Item label="Select condition" value="" />
              {conditionOptions.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>

            <Text style={{ fontWeight: "bold" }}>VIN</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.vin || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, vin: text }))
              }
              placeholder="Enter VIN"
            />

            <Text style={{ fontWeight: "bold" }}>Mileage</Text>
            <TextInput
              style={inputStyle}
              value={
                typeof newVehicle.mileage === "number"
                  ? newVehicle.mileage.toString()
                  : newVehicle.mileage || ""
              }
              onChangeText={(text) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  mileage: text === "" ? undefined : Number(text),
                }))
              }
              placeholder="Enter mileage"
              keyboardType="numeric"
            />

            <Text style={{ fontWeight: "bold" }}>Transmission</Text>
            <Picker
              selectedValue={newVehicle.transmission || ""}
              onValueChange={(value) =>
                setNewVehicle((prev) => ({
                  ...prev,
                  transmission: value as Vehicle["transmission"],
                }))
              }
            >
              <Picker.Item label="Select transmission" value="" />
              {transmissionOptions.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 8 }}>
                Sales Tax Paid
              </Text>
              <Switch
                value={!!newVehicle.salesTaxPaid}
                onValueChange={(val) =>
                  setNewVehicle((prev) => ({ ...prev, salesTaxPaid: val }))
                }
              />
            </View>

            <Text style={{ fontWeight: "bold" }}>Trim</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.trim || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, trim: text }))
              }
              placeholder="Enter trim"
            />

            <Text style={{ fontWeight: "bold" }}>Body Style</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.bodyStyle || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, bodyStyle: text }))
              }
              placeholder="Enter body style"
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <Text style={{ fontWeight: "bold", marginRight: 8 }}>
                Has Salvage Title
              </Text>
              <Switch
                value={!!newVehicle.hasSalvageTitle}
                onValueChange={(val) =>
                  setNewVehicle((prev) => ({ ...prev, hasSalvageTitle: val }))
                }
              />
            </View>

            <Text style={{ fontWeight: "bold" }}>Extra Info</Text>
            <TextInput
              style={inputStyle}
              value={newVehicle.extraInfo || ""}
              onChangeText={(text) =>
                setNewVehicle((prev) => ({ ...prev, extraInfo: text }))
              }
              placeholder="Enter extra info"
            />

            <Button title="Save Vehicle" onPress={handleAddVehicle} />
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  padding: 8,
  marginBottom: 8,
};
