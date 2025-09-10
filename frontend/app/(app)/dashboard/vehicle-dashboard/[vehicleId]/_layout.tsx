import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function VehicleDashboardLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          drawerType: "slide", // Drawer slides over the main screen
          drawerPosition: "right",
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#fff",
            width: 360,
          },
          headerTitle: "Dashboard",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard Home",
          }}
        />
        <Drawer.Screen
          name="calendar"
          options={{
            drawerLabel: "Calendar",
            title: "Calendar",
          }}
        />
        <Drawer.Screen
          name="details"
          options={{
            drawerLabel: "Details",
            title: "Details",
          }}
        />
        <Drawer.Screen
          name="distance"
          options={{
            drawerLabel: "Distance",
            title: "Distance",
          }}
        />
        <Drawer.Screen
          name="extras"
          options={{
            drawerLabel: "Extras",
            title: "Extras",
          }}
        />
        <Drawer.Screen
          name="goals"
          options={{
            drawerLabel: "Goals",
            title: "Goals",
          }}
        />
        <Drawer.Screen
          name="hours"
          options={{
            drawerLabel: "Hours",
            title: "Hours",
          }}
        />
        <Drawer.Screen
          name="instructions"
          options={{
            drawerLabel: "Instructions",
            title: "Instructions",
          }}
        />
        <Drawer.Screen
          name="location"
          options={{
            drawerLabel: "Location",
            title: "Location",
          }}
        />
        <Drawer.Screen
          name="photos"
          options={{
            drawerLabel: "Photos",
            title: "Photos",
          }}
        />
        <Drawer.Screen
          name="preferences"
          options={{
            drawerLabel: "Preferences",
            title: "Preferences",
          }}
        />
        <Drawer.Screen
          name="prices"
          options={{
            drawerLabel: "Prices",
            title: "Prices",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
