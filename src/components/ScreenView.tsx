import React, { FunctionComponent, ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import Constants from "expo-constants";
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  view: {
    flex: 1
  }
});
interface ScreenViewProps {
  children: ReactNode;
  sx?: ViewStyle;
}
const ScreenView: FunctionComponent<ScreenViewProps> = props => {
  const {
    children,
    sx
  } = props;
  return <SafeAreaView style={{
    ...styles.main,
    ...sx
  }}>
      <View style={{
      ...styles.view
    }}>{children}</View>
    </SafeAreaView>;
};
export default ScreenView;