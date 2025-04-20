import { TouchableOpacity, Text, Linking } from "react-native";

type EmergencyTileProps = {
  name: string;
  phoneNumber: string;
  className?: string;
  textClassName?: string;
};

export default function EmergencyTile({
  name,
  phoneNumber,
}: EmergencyTileProps) {
  const handlePress = () => {
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error("Failed to call number:", err)
    );
  };

  return (
    <TouchableOpacity
      className="m-2 flex h-36 w-0.5 flex-row items-center justify-center rounded-3xl bg-[#d6832a]"
      style={{ minWidth: "45%" }}
      onPress={handlePress}
    >
      <Text className="text-center text-2xl font-semibold text-[#fcf7ee]">
        {name}
      </Text>
    </TouchableOpacity>
  );
}
