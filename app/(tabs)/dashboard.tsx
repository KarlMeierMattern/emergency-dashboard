// app/EmergencyDashboard.tsx
import EmergencyTile from "@/components/EmergencyTile";
import { View, Text } from "react-native";

const emergencyTiles = [
  { name: "911", phoneNumber: "911" },
  { name: "Beans", phoneNumber: "0609464129" },
  { name: "Police", phoneNumber: "10111" },
  { name: "Ambulance", phoneNumber: "10177" },
  { name: "Fire", phoneNumber: "10111" },
  { name: "Towing", phoneNumber: "0800735555" },
  { name: "Doctors", phoneNumber: "0800022222" },
  { name: "Poison", phoneNumber: "0861555555" },
];

export default function EmergencyDashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-[#f9f0dc] p-4">
      <Text className="mb-6 mt-10 text-2xl font-bold text-[#803920]">
        Emergency Dashboard
      </Text>
      <View className="w-full max-w-[500px] flex-row flex-wrap justify-between">
        {emergencyTiles.map((tile, index) => (
          <EmergencyTile
            key={index}
            name={tile.name}
            phoneNumber={tile.phoneNumber}
          />
        ))}
      </View>
    </View>
  );
}
