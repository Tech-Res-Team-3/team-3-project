import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text } from "react-native";

export default function DashboardLayout() {
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
          name="notifications"
          options={{
            drawerLabel: "Notification Settings",
            title: "Notification Settings",
          }}
        />
        <Drawer.Screen
          name="messages"
          options={{
            drawerLabel: "Messages",
            title: "Messages",
          }}
        />
        <Drawer.Screen
          name="password"
          options={{
            drawerLabel: "Password",
            title: "Password",
          }}
        />
        <Drawer.Screen
          name="activity"
          options={{
            drawerLabel: "Activity",
            title: "Activity",
          }}
        />
        <Drawer.Screen
          name="travel-credit"
          options={{
            drawerLabel: "Travel Credit",
            title: "Travel Credit",
          }}
        />
        <Drawer.Screen
          name="how-it-works"
          options={{
            drawerLabel: "How Rao Rentals Works",
            title: "How Rao Rentals Works",
          }}
        />
        <Drawer.Screen
          name="support"
          options={{
            drawerLabel: "Contact Support",
            title: "Contact Support",
          }}
        />
        <Drawer.Screen
          name="legal"
          options={{
            drawerLabel: "Legal",
            title: "Legal",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
