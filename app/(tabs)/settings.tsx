import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContacts, type Contact } from "../../context/ContactsContext";

type IconName = keyof typeof Ionicons.glyphMap;

const iconOptions: IconName[] = [
  "shield",
  "flame",
  "medkit",
  "people",
  "medical",
  "home",
  "call",
  "heart",
  "warning",
  "car",
  "boat",
  "airplane",
];

const Settings = () => {
  const { contacts, updateContact, deleteContact, addContact, loading } =
    useContacts();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Omit<Contact, "id"> | null>(
    null
  );
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("shield");
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhoneNumber(contact.phoneNumber);
    setSelectedIcon(contact.iconName);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingContact(null);
    setNewContact({
      name: "",
      phoneNumber: "",
      iconName: "person",
    });
    setName("");
    setPhoneNumber("");
    setSelectedIcon("person");
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteContact(id),
          style: "destructive",
        },
      ]
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Contact name cannot be empty");
      return;
    }

    if (editingContact) {
      updateContact(editingContact.id, {
        name,
        phoneNumber,
        iconName: selectedIcon,
      });
    } else if (newContact) {
      addContact({
        name,
        phoneNumber,
        iconName: selectedIcon,
      });
    }

    setModalVisible(false);
    setEditingContact(null);
    setNewContact(null);
  };

  const openIconSelector = () => {
    setIconModalVisible(true);
  };

  const selectIcon = (iconName: string) => {
    setSelectedIcon(iconName as IconName);
    setIconModalVisible(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-2 text-base text-gray-700">
          Loading contacts...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        className="mt-4"
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 my-1 mx-2 rounded-lg shadow">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name={item.iconName}
                size={24}
                color="#585858"
                className="mr-4"
              />
              <View>
                <Text className="text-base font-bold font-mono tracking-wide lowercase">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500 mt-0.5 font-mono tracking-wide lowercase">
                  {item.phoneNumber ? item.phoneNumber : "No number set"}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                className="p-2 mr-1"
              >
                <Ionicons name="pencil" size={20} color="#585858" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                className="p-2"
              >
                <Ionicons name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          contacts.length < 8 ? (
            <TouchableOpacity
              className="flex-row items-center justify-center bg-[#585858] p-4 m-2 rounded-lg shadow"
              onPress={handleAdd}
            >
              <Ionicons name="add-circle" size={24} color="white" />
              <Text className="text-white text-base font-mono tracking-wide font-bold ml-2">
                add new contact
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[85%] bg-white rounded-xl p-5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center font-mono tracking-wide">
              {editingContact ? "edit contact" : "add new contact"}
            </Text>

            <View className="mb-4">
              <Text className="text-base mb-1 font-medium font-mono tracking-wide">
                name
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2.5 text-base font-mono tracking-wide"
                value={name}
                onChangeText={setName}
                placeholder="contact name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-base mb-1 font-medium font-mono tracking-wide">
                phone number
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2.5 text-base font-mono tracking-wide"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-base mb-1 font-medium font-mono tracking-wide">
                icon
              </Text>
              <TouchableOpacity
                className="flex-row items-center border border-gray-300 rounded-lg p-2.5"
                onPress={openIconSelector}
              >
                <Ionicons name={selectedIcon} size={24} color="#585858" />
                <Text className="ml-2 text-base font-mono tracking-wide">
                  change icon
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                className="flex-1 bg-gray-200 p-3 rounded-lg mr-2 items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-800 font-medium font-mono tracking-wide">
                  cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#585858] p-3 rounded-lg items-center"
                onPress={handleSave}
              >
                <Text className="text-white font-medium font-mono tracking-wide">
                  save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={iconModalVisible}
        onRequestClose={() => setIconModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[85%] bg-white rounded-xl p-5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center">
              Select Icon
            </Text>
            <ScrollView className="max-h-[300px]">
              <View className="flex-row flex-wrap justify-between">
                {iconOptions.map((iconName) => (
                  <TouchableOpacity
                    key={iconName}
                    className="w-[30%] items-center p-2.5 m-1 border border-gray-200 rounded-lg"
                    onPress={() => selectIcon(iconName)}
                  >
                    <Ionicons name={iconName} size={30} color="#007AFF" />
                    <Text className="mt-1 text-xs">{iconName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-lg mt-2.5 items-center w-full"
              onPress={() => setIconModalVisible(false)}
            >
              <Text className="text-gray-800 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
