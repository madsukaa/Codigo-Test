import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import Store, { persistor } from "./config/store/store";
import ScreenView from "./components/ScreenView";
import React from "react";
const Main = () => {
  return <Provider store={Store}>
      <PersistGate loading={<View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
            <ActivityIndicator size="large" />
          </View>} persistor={persistor}>
        <ScreenView>
          <AppNavigator />
        </ScreenView>
      </PersistGate>
    </Provider>;
};
export default Main;