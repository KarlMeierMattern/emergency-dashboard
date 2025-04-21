import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import EmergencyDashboard from "./index";
import Settings from "./settings";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#27272a",
          position: "absolute",
        },
        tabBarActiveTintColor: "#ffffff",
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
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <View className="items-center w-16 mt-4">
              <MaterialIcons name="dashboard" size={24} color={color} />
              <Text className="text-xs text-white mt-1" numberOfLines={1}>
                dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <View className="items-center w-16 mt-4">
              <MaterialIcons name="settings" size={24} color={color} />
              <Text className="text-xs text-white mt-1" numberOfLines={1}>
                settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
