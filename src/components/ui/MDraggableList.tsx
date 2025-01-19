import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
interface PrioritizedDraggableListProps<T> {
  data: T[];
  onDragEnd: (data: T[]) => void;
  keyExtractor: (item: T) => string;
  renderItem: (params: RenderItemParams<T>) => React.ReactElement;
}
const MDraggableList = <T extends {
  id: string;
},>({
  data,
  onDragEnd,
  keyExtractor,
  renderItem
}: PrioritizedDraggableListProps<T>) => {
  return <DraggableFlatList data={data} onDragEnd={({
    data
  }) => onDragEnd(data)} keyExtractor={keyExtractor} renderItem={renderItem} contentContainerStyle={styles.draggableList} />;
};
const styles = StyleSheet.create({
  draggableList: {
    flexGrow: 1,
    marginBottom: 20
  }
});
export default MDraggableList;