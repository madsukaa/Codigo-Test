import { FunctionComponent, ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
interface MTypographyProps {
  children: ReactNode;
  variant?: "header" | "subheader" | "body";
  style?: TextStyle;
}
const MTypography: FunctionComponent<MTypographyProps> = props => {
  const {
    children,
    variant = "body",
    style
  } = props;
  return <Text style={[styles[variant], style]}>{children}</Text>;
};
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#263238"
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    color: "#546E7A",
    marginBottom: 24
  },
  body: {
    fontSize: 14,
    color: "#546E7A",
    textAlign: "center"
  }
});
export default MTypography;