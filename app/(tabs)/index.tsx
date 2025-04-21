import EmergencyTile from "../../screens/EmergencyTile";
import { View, ScrollView } from "react-native";
import { useContacts } from "../../context/ContactsContext";

export default function EmergencyDashboard() {
  const { contacts } = useContacts(); // destructure contacts from useContacts hook

  return (
    <ScrollView
      className="flex-1 bg-[#FAFAFA]"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <View className="w-full flex flex-row flex-wrap justify-between items-center p-4">
        {contacts.map((contact) => (
          <EmergencyTile
            key={contact.id}
            name={contact.name}
            phoneNumber={contact.phoneNumber}
            iconName={contact.iconName}
          />
        ))}
      </View>
    </ScrollView>
  );
}
