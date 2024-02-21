import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../assets/ThemeColors";
import { ScrollView, TextInput } from "react-native-gesture-handler";


const InspectRoutine = () => {

    let [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
      });
      if (!fontsLoaded) {
        return null;
      }





    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
            <Text style={styles.headerText}>Plan 1</Text>
            </View>
            <TextInput 
            style={styles.notes} 
            placeholder="Type notes..." 
            multiline={true}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.main}> 
                    <Movement name="Squat" set="3" reps="5" weight="100"/>
                    <Movement name="Bench Press" set="3" reps="5" weight="80"/>
                    <Movement name="Deadlift" set="1" reps="5" weight="120"/>
                    <Movement name="Squat" set="3" reps="5" weight="100"/>
                    <Movement name="Bench Press" set="3" reps="5" weight="80"/>
                    <Movement name="Deadlift" set="1" reps="5" weight="120"/>
                </View>
            </ScrollView>

        </SafeAreaView>

    );
    };

    const Movement = ({set, reps, weight, name}) => {
        return (
            <View style={styles.singleMovement}>
                <Text style={styles.movementName}> {name}</Text>
                <Text style={styles.movementNumbers}> {set} x {reps} {weight} kg</Text>
            </View>
        )
    }


    const styles = StyleSheet.create({
        notes: {
            width: "90%",
            height: 100,
            backgroundColor: ThemeColors.white,
            marginVertical: 7,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            paddingHorizontal: 10,
            position: "relative",
            alignSelf: "center",
            marginTop: 10,
            fontFamily: "DMRegular",
            textAlignVertical: "top",
        },

        container: {
            flex: 1,
        },
        header: {
            backgroundColor: ThemeColors.orange,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            borderRadius: 15,
            
            
        },
        headerText: {
            fontSize: 24,
            color: ThemeColors.black,
            fontFamily: "DMBold",

        },
        singleMovement: {
            width: "90%",
            height: 100,
            backgroundColor: ThemeColors.white,
            marginVertical: 7,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            paddingHorizontal: 10,
            position: "relative",
            
        },
        main: {
            flex: 1,
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 20,
          },
            movementName: {
                fontSize: 20,
                fontFamily: "DMBold",
                bottom: 20,
            },
            movementNumbers: {
                fontSize: 20,
                fontFamily: "DMRegular",
            },
    });



export default InspectRoutine;