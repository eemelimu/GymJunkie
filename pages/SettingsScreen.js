import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useLocalization } from "../contexts/LocalizationContext";
//import { ThemeColors } from "../assets/ThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_URL } from "../assets/config";
import { useAuth } from "../contexts/AuthContext";
import useRequest from "../hooks/useRequest";
import Button from "../components/Button";

const SettingsButton = ({ color, text, children, navigationPage }) => {
  const navigation = useNavigation();
  const {
    theme: ThemeColors,
    resetTheme,
    changeThemeColor,
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ThemeColors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    boldText: {
      fontWeight: "bold",
      color: ThemeColors.tertiary,
      fontSize: 20,
    },
    button: {
      flex: 1,
      padding: 10,
      backgroundColor: ThemeColors.secondary,
      width: "80%",
      borderRadius: 5,
      borderBottomWidth: 2,
      borderBottomColor: ThemeColors.quaternary,
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scrollView: {
      width: "100%",
      marginTop: 20,
      marginVertical: 20,
      marginHorizontal: 20,
    },
  });
  return (
    <Pressable
      onPress={() => navigation.navigate(navigationPage)}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1,
        },
        styles.row,
      ]}
    >
      <View style={[styles.row]}>
        {children}
        <Text style={styles.boldText}>{text}</Text>
      </View>
      <AntDesign name="arrowright" size={24} color={color} />
    </Pressable>
  );
};

const SettingsScreen = () => {
  const { t, setLanguage } = useLocalization();
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const { state } = useAuth();
  const token = state.token;
  const { fetcher } = useRequest(token);
  const {
    theme: ThemeColors,
    resetTheme,
    changeThemeColor,
  } = useContext(ThemeContext);

  const getUsername = async () => {
    const res = await fetcher({
      url: BACKEND_URL + "user",
      reqMethod: "GET",
      showLoading: true,
    });
    if (res) setUsername(res.username);
  };

  useFocusEffect(
    useCallback(() => {
      getUsername();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ThemeColors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    boldText: {
      fontWeight: "bold",
      color: ThemeColors.tertiary,
      fontSize: 20,
    },
    button: {
      flex: 1,
      padding: 10,
      backgroundColor: ThemeColors.secondary,
      width: "80%",
      borderRadius: 5,
      borderBottomWidth: 2,
      borderBottomColor: "black",
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scrollView: {
      width: "100%",
      marginTop: 20,
      marginVertical: 20,
      marginHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="account-circle"
        size={200}
        color={ThemeColors.secondary}
      />
      <Text style={styles.boldText}>{username}</Text>
      <ScrollView style={styles.scrollView}>
        {/* <SettingsButton
          navigationPage={"Account Settings"}
          color={ThemeColors.tertiary}
          text="Account"
        >
          <MaterialIcons
            name="account-circle"
            size={24}
            color={ThemeColors.tertiary}
          />
        </SettingsButton> */}
        <SettingsButton
          navigationPage={"Appearance"}
          color={ThemeColors.tertiary}
          text={t("appearance")}
        >
          <FontAwesome
            name="paint-brush"
            size={24}
            color={ThemeColors.tertiary}
            style={{ paddingRight: 15 }}
          />
        </SettingsButton>
        <SettingsButton
          navigationPage={"Notification Settings"}
          color={ThemeColors.tertiary}
          text={t("notification-settings")}
        >
          <Ionicons
            name="notifications"
            size={24}
            color={ThemeColors.tertiary}
            style={{ paddingRight: 15 }}
          />
        </SettingsButton>
        <SettingsButton
          navigationPage={"Tip Settings"}
          color={ThemeColors.tertiary}
          text={t("tip-settings")}
        >
          <MaterialIcons
            name="lightbulb"
            style={{ paddingRight: 15 }}
            size={24}
            color={ThemeColors.tertiary}
          />
        </SettingsButton>
        <SettingsButton
          navigationPage={"Preferences Settings"}
          color={ThemeColors.tertiary}
          text={t("preferences")}
        >
          <FontAwesome
            name="wrench"
            size={24}
            color={ThemeColors.tertiary}
            style={{ paddingRight: 15 }}
          />
        </SettingsButton>
        <SettingsButton
          navigationPage={"Terms of Service"}
          color={ThemeColors.tertiary}
          text={t("terms-of-service")}
        >
          <FontAwesome
            name="legal"
            size={24}
            color={ThemeColors.tertiary}
            style={{ paddingRight: 15 }}
          />
        </SettingsButton>
        <SettingsButton
          navigationPage={"Language Settings"}
          color={ThemeColors.tertiary}
          text={t("language-settings")}
        >
          <Entypo
            style={{ paddingRight: 15 }}
            name="globe"
            size={24}
            color={ThemeColors.tertiary}
          />
        </SettingsButton>
        {/* <SettingsButton
          navigationPage={"About"}
          color={ThemeColors.tertiary}
          text="About"
        >
          <AntDesign
            name="exclamationcircle"
            size={24}
            color={ThemeColors.tertiary}
          />
        </SettingsButton> */}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
