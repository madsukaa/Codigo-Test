import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
interface MButtonProps {
  title: string;
  onPress: () => void;
  style: ViewStyle;
}
const MButton: FunctionComponent<MButtonProps> = props => {
  const {
    title,
    onPress,
    style
  } = props;
  return <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>;
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default MButton;