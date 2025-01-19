import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { mapImage } from "../../utils/imageMap";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/AppNavigator";
import { Data, Show } from "types/uidesign";
import { Ionicons } from "@expo/vector-icons";
type UIHomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
export default function UIHome() {
  const [data, setData] = useState<Data | null>(null);
  const navigation = useNavigation<UIHomeNavigationProp>();
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData: Data = require("../../data/UIDesign.json");
        setData(jsonData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);
  if (!data) return null;
  const renderShow = ({
    item
  }: {
    item: Show;
  }) => <Animatable.View animation="fadeInRight" duration={800} delay={100} style={styles.showCard}>
      <TouchableOpacity onPress={() => navigation.navigate("UIDetails", {
      details: data.details
    })} activeOpacity={0.8}>
        <Image source={mapImage(item.image)} style={styles.showImage} />
        <Text style={styles.showTime}>{item.time}</Text>
        <Text style={styles.showTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>;
  return <ScrollView contentContainerStyle={styles.scrollContainer}>
      {}
      <Animatable.View animation="slideInDown" duration={800} style={styles.header}>
        {}
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()} accessibilityLabel="Go Back">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {}
        <Image source={mapImage(data.header.logo)} style={styles.logo} />

        {}
        <TouchableOpacity style={styles.headerButton} onPress={() => {}} accessibilityLabel="Notifications">
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </Animatable.View>

      {}
      {data.banner && <Animatable.Image animation="fadeIn" duration={1000} source={mapImage(data?.banner.image)} style={styles.banner} resizeMode="cover" />}

      {}
      <Animatable.View animation="fadeIn" duration={1500} style={styles.navigationGrid}>
        {data.navigation.map((item, index) => <View key={index} style={styles.navItem}>
            <TouchableOpacity style={styles.navButton} onPress={() => {}} activeOpacity={0.7} accessibilityLabel={item.label}>
              <Image source={mapImage(item.icon)} style={styles.navIcon} />
            </TouchableOpacity>
            <Text style={styles.navLabel}>{item.label}</Text>
          </View>)}
      </Animatable.View>

      {}
      <Animatable.View animation="fadeInUp" duration={1000} delay={300} style={styles.infoCards}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>My e-tickets</Text>
          <Text style={styles.infoValue}>{data.parkInfo.tickets}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Park Hours</Text>
          <Text style={styles.infoValue}>{data.parkInfo.hours}</Text>
        </View>
      </Animatable.View>

      {}
      <Animatable.View animation="fadeInUp" duration={1000} delay={500} style={styles.upcoming}>
        <Text style={styles.sectionTitle}>Upcoming Shows</Text>
        <FlatList data={data.upcomingShows} horizontal renderItem={renderShow} keyExtractor={item => item.id.toString()} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.upcomingList} />
      </Animatable.View>
    </ScrollView>;
}
const {
  width
} = Dimensions.get("window");
const navButtonSize = 70;
const cardWidth = (width - 64) / 2;
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    position: "relative"
  },
  headerButton: {
    padding: 8
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain"
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 16
  },
  navigationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 16
  },
  navItem: {
    width: (width - 64) / 4,
    alignItems: "center",
    marginVertical: 8
  },
  navButton: {
    width: navButtonSize,
    height: navButtonSize,
    borderRadius: navButtonSize / 2,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  navLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#333"
  },
  infoCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  infoTitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  upcoming: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333"
  },
  upcomingList: {
    paddingLeft: 8
  },
  showCard: {
    width: 200,
    backgroundColor: "#fff",
    marginRight: 16,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  showImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover"
  },
  showTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6347",
    marginBottom: 4
  },
  showTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500"
  }
});