import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "navigation/AppNavigator";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mapImage } from "utils/imageMap";
type DetailsNavigationProp = RouteProp<RootStackParamList, "UIDetails">;
const UIDetails = () => {
  const route = useRoute<DetailsNavigationProp>();
  const navigation = useNavigation();
  const {
    details
  } = route.params;
  return <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.close}>X</Text>
      </TouchableOpacity>
      <Image source={mapImage(details.image)} style={styles.image} />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.distance}>{details.distance}</Text>
      <Text style={styles.description}>{details.description}</Text>
    </View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  close: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right"
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16
  },
  distance: {
    fontSize: 16,
    color: "#777",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    lineHeight: 22
  }
});
export default UIDetails;