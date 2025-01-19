import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent } from "react";
import MultiStageForm from "../screens/TaskStateManagement/MultiStageForm";
import HomeScreen from "screens/TaskCodeManagement/HomeScreen";
import React from "react";
import DetailsScreen from "screens/TaskCodeManagement/DetailsScreen";
import Home from "screens/TaskUIDesign/UIHome";
import UIDetails from "screens/TaskUIDesign/UIDetails";
import { Details } from "types/uidesign";
import NavigationScreen from "screens/NavigationScreen";
export type RootStackParamList = {
  NavigationDefault: undefined;
  MultiStageForm: undefined;
  Home: undefined;
  Details: {
    movieId: number;
  };
  UIHome: undefined;
  UIDetails: {
    details: Details;
  };
};
const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator: FunctionComponent = () => {
  return <NavigationContainer>
      <Stack.Navigator initialRouteName="NavigationDefault">
        <Stack.Screen name="NavigationDefault" component={NavigationScreen} options={{
        headerShown: false
      }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
        title: "Movies"
      }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{
        title: "Movie Details"
      }} />
        <Stack.Screen name="MultiStageForm" component={MultiStageForm} />
        <Stack.Screen name="UIHome" component={Home} />
        <Stack.Screen name="UIDetails" component={UIDetails} />
      </Stack.Navigator>
    </NavigationContainer>;
};
export default AppNavigator;