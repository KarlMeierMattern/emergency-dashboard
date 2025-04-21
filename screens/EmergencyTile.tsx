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
      className="flex h-36 w-0.5 mb-2 flex-col justify-center items-center rounded-3xl bg-[#6a6a6a]"
      style={{ minWidth: "45%" }}
      onPress={handlePress}
    >
      <Text className="font-mono tracking-widest lowercase text-center text-xl font-semibold text-[#fcf7ee]">
        {name}
      </Text>
      <View className="mt-2">
        <Ionicons name={iconName} size={16} color="#fcf7ee" />
      </View>
    </TouchableOpacity>
  );
}
