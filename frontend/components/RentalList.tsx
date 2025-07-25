import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
interface Rental {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
}
interface RentalListProps {
  rentals: Rental[];
  onItemPress: (rental: Rental) => void;
}
export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  onItemPress,
}) => {
  const renderRental = ({ item }: { item: Rental }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}/day</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={rentals}
      renderItem={renderRental}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});
