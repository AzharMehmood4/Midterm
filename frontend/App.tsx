import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock?: boolean;
};

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [randomItem, setRandomItem] = useState<MenuItem | null>(null);
  const [screen, setScreen] = useState<"home" | "menu" | "random">("home");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const BASE_URL = "http://192.168.1.117:5000"; // Your backend IP

  const getMenu = async () => {
    try {
      const res = await fetch(`${BASE_URL}/menu`);
      const data: MenuItem[] = await res.json();
      setMenu(data);
      setScreen("menu");
    } catch {
      Alert.alert("Error", "Error fetching menu");
    }
  };

  const getRandom = async () => {
    try {
      const res = await fetch(`${BASE_URL}/menu/random`);
      const data: MenuItem = await res.json();
      setRandomItem(data);
      setScreen("random");
    } catch {
      Alert.alert("Error fetching random item");
    }
  };

  // Home Screen
  if (screen === "home") {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.title}>☕ Coffee Shop Menu ☕</Text>
        <TouchableOpacity style={styles.button} onPress={getMenu}>
          <Text style={styles.buttonText}>Full Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getRandom}>
          <Text style={styles.buttonText}>Surprise Me 🎁</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Menu Screen
  if (screen === "menu") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🍽️ Our Full Menu</Text>

        <FlatList
          data={menu}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 20, alignSelf: "center" }]}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.buttonText}>⬅ Back to Home</Text>
        </TouchableOpacity>

        {/* Modal for Item Details */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
              <Text style={styles.modalText}>
                Category: {selectedItem?.category}
              </Text>
              <Text style={styles.modalText}>
                Price: Rs. {selectedItem?.price}
              </Text>
              <Text style={styles.modalText}>
                Status:{" "}
                {selectedItem?.inStock ? "Available ✅" : "Out of Stock ❌"}
              </Text>
              <TouchableOpacity
                style={[styles.button, { marginTop: 15 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Random Item Screen
  if (screen === "random" && randomItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎁 Your Surprise Item!</Text>
        <View style={styles.card}>
          <Text style={styles.itemName}>{randomItem.name}</Text>
          <Text style={styles.itemCategory}>{randomItem.category}</Text>
          <Text style={styles.itemPrice}>Rs. {randomItem.price}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20, alignSelf: "center" }]}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.buttonText}>⬅ Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#808080",
  },
  button: {
    backgroundColor: "#808080", // Gray color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#808080",
  },
  itemCategory: {
    fontSize: 16,
    color: "#808080",
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 18,
    color: "#00897B",
    marginTop: 6,
    fontWeight: "500",
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#808080",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#808080",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#808080",
    marginVertical: 3,
  },
});
