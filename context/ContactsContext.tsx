"use client";

import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  iconName: string;
};

type ContactsContextType = {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  loading: boolean;
};

const defaultContacts: Contact[] = [
  { id: "1", name: "Police", phoneNumber: "911", iconName: "shield" },
  { id: "2", name: "Fire", phoneNumber: "911", iconName: "flame" },
  { id: "3", name: "Ambulance", phoneNumber: "911", iconName: "medkit" },
  { id: "4", name: "Family", phoneNumber: "", iconName: "people" },
  { id: "5", name: "Doctor", phoneNumber: "", iconName: "medical" },
  { id: "6", name: "Neighbor", phoneNumber: "", iconName: "home" },
];

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem("emergencyContacts");
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        } else {
          setContacts(defaultContacts);
          await AsyncStorage.setItem(
            "emergencyContacts",
            JSON.stringify(defaultContacts)
          );
        }
      } catch (error) {
        console.error("Failed to load contacts:", error);
        setContacts(defaultContacts);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("emergencyContacts", JSON.stringify(contacts)).catch(
        (error) => console.error("Failed to save contacts:", error)
      );
    }
  }, [contacts, loading]);

  const addContact = (contact: Omit<Contact, "id">) => {
    if (contacts.length >= 8) {
      alert("Maximum of 8 contacts allowed");
      return;
    }

    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };

    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = (id: string, updatedFields: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updatedFields } : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    if (contacts.length <= 4) {
      alert("Minimum of 4 contacts required");
      return;
    }

    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact, loading }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
