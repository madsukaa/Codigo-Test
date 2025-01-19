import { StyleSheet } from "react-native";
import { Colors, FontSizes, Spacing } from "./theme";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.md,
    justifyContent: "space-between"
  },
  header: {
    fontSize: FontSizes.xLarge,
    fontWeight: "bold",
    marginBottom: Spacing.lg,
    textAlign: "center",
    color: Colors.text
  },
  label: {
    fontSize: FontSizes.medium,
    marginBottom: Spacing.xs,
    color: Colors.text
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSizes.small,
    marginTop: Spacing.xs
  },
  input: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.surface,
    fontSize: FontSizes.medium,
    color: Colors.text
  },
  inputError: {
    borderColor: Colors.error
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md
  },
  picker: {
    height: 50,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg
  },
  button: {
    flex: 1,
    marginHorizontal: Spacing.sm
  }
});