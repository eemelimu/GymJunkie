import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";



import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BACKEND_URL } from "../assets/config";
import { useAuth } from "./AuthContext";



import { ThemeColors } from "../assets/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Routines = () => {
  const [trainingPlans, setTrainingPlans] = useState([]);

  const navigation = useNavigation();
  const { state } = useAuth();
  const token = state.token;

  let [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const moveToCreateRoutine = () => {
    navigation.navigate("CreateRoutine");
  }


  const moveToInspectRoutine = (routineName) => {
    console.log("called movetoCreateRoutine");
    navigation.navigate("InspectRoutine", { routineName });
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(BACKEND_URL+  "trainingplan", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": token,
            },
          });
          const data = await res.json();
          setTrainingPlans(data.trainingplan_list);
          console.log("luk"+data);
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      fetchData();
    }, [])
  );




  return (
    <SafeAreaView style={styles.container}>
      <View >
      </View>
      <ScrollView style={{ flex: 1 }}>
        {trainingPlans.map((trainingPlan) => (
        <TouchableOpacity 
        style={styles.main} 
        key={trainingPlan.id}
        onPress={() => moveToInspectRoutine(trainingPlan.training_plan_name)}>
          <Routine name= {trainingPlan.training_plan_name} />
        </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>


        <TouchableOpacity
          style={[styles.footerButton, styles.selectRoutineButton]}
          onPress={moveToCreateRoutine}>
          <AntDesign name="plus" size={24} color="black" />

          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Create routine
          </Text>
        </TouchableOpacity>

       

      </View>
    </SafeAreaView>
  );
};

const Routine = ({ name }) => {
  return (
    
    <View style={styles.singleRoutine}>
      <Text style={styles.RoutineName}>{name}</Text>
  
    </View>
    
  );
};

const styles = StyleSheet.create({
  singleRoutine: {
    width: "90%",
    height: 100,
    backgroundColor: ThemeColors.secondary,
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
    backgroundColor: ThemeColors.secondary,
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