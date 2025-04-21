import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import EmergencyDashboard from "./index";
import Settings from "./settings";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#c2c2c2",
          position: "absolute",
        },
        tabBarActiveTintColor: "#585858",
        tabBarInactiveTintColor: "#818181",
        tabBarLabelStyle: {
          fontFamily: "SpaceMono",
          fontWeight: 300,
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={EmergencyDashboard}
        options={{
          tabBarLabel: "dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
