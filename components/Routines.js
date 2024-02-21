import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemeColors } from "../assets/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const Routines = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const moveToInspectRoutine = () => {
    console.log("called movetoInspectRoutine");
    navigation.navigate("InspectRoutine");
  }


  return (
    <SafeAreaView style={styles.container}>
      <View >
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.main}>
          <Routine name="Plan 1" type="Push" />
          <Routine name="Plan 2" type="Pull" />
        </View>
      </ScrollView>

      <View style={styles.footer}>


        <TouchableOpacity
          style={[styles.footerButton, styles.selectRoutineButton]}
          onPress={moveToInspectRoutine}>
          <AntDesign name="plus" size={24} color="black" />

          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Create routine
          </Text>
        </TouchableOpacity>

       

      </View>
    </SafeAreaView>
  );
};

const Routine = ({ name, type }) => {
  return (
    <View style={styles.singleRoutine}>
      <Text style={styles.RoutineName}>{name}</Text>
      <Text style={styles.RoutineType}>Type: {type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  singleRoutine: {
    width: "90%",
    height: 100,
    backgroundColor: ThemeColors.orange,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    position: "relative",
  },

  RoutineName: {
    fontSize: 20,
    fontFamily: "DMBold",
    bottom: 20,

  },

  RoutineType: {
    fontSize: 20,
    fontFamily: "DMRegular",

  },

  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
 
  Type: {
    color: "#02075d",
    fontSize: 10,
    opacity: 0.5,
  },
  footer: {
    bottom: 0,
    width: "100%",
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: ThemeColors.primary,
    bottom: 10,
  },
  selectRoutineButton: {
    backgroundColor: ThemeColors.orange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150, 
    alignItems: "center", 
  },
  footerButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 150, 
    alignItems: "center", 
  },
});

export default Routines;