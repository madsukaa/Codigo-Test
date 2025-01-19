import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
interface SelectableChipsProps<T> {
  data: T[];
  selectedItems: T[];
  onToggle: (item: T) => void;
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  selectionLimit?: number;
}
const MSelectableChips = <T extends {
  id: string;
},>({
  data,
  selectedItems,
  onToggle,
  keyExtractor,
  labelExtractor,
  selectionLimit
}: SelectableChipsProps<T>) => {
  return <FlatList data={data} renderItem={({
    item
  }) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    return <TouchableOpacity style={[styles.chip, isSelected && styles.selectedChip]} onPress={() => onToggle(item)}>
            <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
              {labelExtractor(item)}
            </Text>
          </TouchableOpacity>;
  }} keyExtractor={keyExtractor} numColumns={3} contentContainerStyle={styles.chipsContainer} />;
};
const styles = StyleSheet.create({
  chipsContainer: {
    marginBottom: 20
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#f5f5f5"
  },
  selectedChip: {
    backgroundColor: "#2196f3",
    borderColor: "#2196f3"
  },
  chipText: {
    fontSize: 14,
    color: "#333"
  },
  selectedChipText: {
    color: "#fff"
  }
});
export default MSelectableChips;