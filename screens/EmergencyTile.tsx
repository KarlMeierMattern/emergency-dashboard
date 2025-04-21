import { TouchableOpacity, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

type EmergencyTileProps = {
  name: string;
  phoneNumber: string;
  className?: string;
  textClassName?: string;
  iconName: IconName;
};

export default function EmergencyTile({
  name,
  phoneNumber,
  iconName,
}: EmergencyTileProps) {
  const handlePress = () => {
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error("Failed to call number:", err)
    );
  };

  return (
    <TouchableOpacity
      className="flex h-36 w-0.5 mb-2 flex-col justify-center items-center bg-[#ffffff] rounded-md border border-zinc-200 shadow-sm"
      style={{ minWidth: "45%" }}
      onPress={handlePress}
    >
      <Text className="font-mono lowercase text-center text-lg font-semibold text-[#27272a]">
        {name}
      </Text>
      <View className="mt-2">
        <Ionicons name={iconName} size={16} color="#27272a" />
      </View>
    </TouchableOpacity>
  );
}
