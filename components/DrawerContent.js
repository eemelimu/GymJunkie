import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { storeData, hexToRgba } from "../assets/utils/utils";
import Toast, { ErrorToast } from "react-native-toast-message";
import { useSettings } from "./SettingsContext";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { BACKEND_URL } from "../assets/config";
import Button from "./Button";
import { useNotification } from "./NotificationContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeContext";

// TODO
// - FEEDBACK: Animoi inputin avaaminen ja sulkeminen
// - FEEDBACK: Lähetä palautetta toiminnallisuus

const ThemeBtn = ({ colors, name }) => {
  const { theme: ThemeColors, changeThemeColor } = useContext(ThemeContext);

  const handleThemeChange = (colors) => {
    console.log("changing theme");
    storeData("theme", {
      primary: colors[0],
      secondary: colors[1],
      tertiary: colors[2],
      quaternary: colors[3],
    });
    changeThemeColor({
      primary: colors[0],
      secondary: colors[1],
      tertiary: colors[2],
      quaternary: colors[3],
    });
  };

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      width: 70,
      height: 60,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      padding: 10,
      borderRadius: 10,
      margin: 5,
      width: 50,
      height: 40,
    },
    text: {
      fontSize: 16,
      color: ThemeColors.tertiary,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          handleThemeChange(colors);
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        ></LinearGradient>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

export const DrawerContent = () => {
  const { disableNotifications, enableTips } = useSettings();
  const { state, dispatch } = useAuth();
  const token = state.token;
  const { setError, setSuccess, startLoading, stopLoading } = useNotification();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const {
    theme: ThemeColors,
    resetTheme,
    changeThemeColor,
  } = useContext(ThemeContext);
  console.log("ThemeColors", ThemeColors);
  const [feedbackInputVisible, setFeedbackInputVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackWarning, setFeedbackWarning] = useState(false);
  const navigation = useNavigation();

  const logoutAll = async () => {
    setLogoutModalVisible(false);
    try {
      const response = await fetch(BACKEND_URL + "logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,

        },
      });
      if (!response.ok) {
        setError("Something went wrong! Please try again later.");
      } else {
        enableTips();
        disableNotifications();
        dispatch({ type: "LOGOUT" });
        resetTheme();
        storeData("theme", ThemeColors);
        setSuccess("Logged out from all devices successfully");
      }
    } catch (error) {
      setError("Check your internet connection");
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    disableNotifications();
    enableTips();
    dispatch({
      type: "LOGOUT",
    });
    resetTheme();
    setSuccess("Logged out successfully");
    storeData("theme", ThemeColors);
    setLogoutModalVisible(false);
  };

  const handleSendFeedback = () => {
    if (feedbackText.length > 0) {
      try {
        fetch(BACKEND_URL + "feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,

          },
          body: JSON.stringify({
            text: feedbackText,
          }),
        });
      } catch (error) {
        setError("Check your internet connection");
        console.error("Error:", error);
      }
      setFeedbackText("");
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
      }, 3000);
      setFeedbackInputVisible(false);
    } else {
      setFeedbackWarning(true);
      setTimeout(() => {
        setFeedbackWarning(false);
      }, 3000);
    }
  };

  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: ThemeColors.primary,
    },
    sendFeedBackItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    sendFeedBackItemSent: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: ThemeColors.secondary,
      borderRadius: 10,
      alignSelf: "center",
      marginTop: 10,
    },
    sendFeedbackInput: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: ThemeColors.secondary,
      width: 225,
      borderRadius: 5,
      marginHorizontal: 5,
      textAlign: "center",
      fontStyle: "italic",
      color: ThemeColors.tertiary,
      alignSelf: "center",
    },
    drawerItem: {
      fontSize: 25,
      padding: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: ThemeColors.quaternary,
      flexDirection: "row",
      alignItems: "center",
    },
    drawerFooterItem: {
      fontSize: 25,
      padding: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    drawerItemIcon: {
      marginRight: 10,
    },
    drawerFooter: {
      position: "absolute",
      bottom: 10,
      width: "100%",
    },
    regularText: {
      fontSize: 16,
      color: ThemeColors.tertiary,
    },
    row: {
      maxWidth: "100%",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: ThemeColors.quaternary,
    },
    modalContainer: {
      flex: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: hexToRgba(ThemeColors.primary, 0.8),
    },
    modalContent: {
      backgroundColor: hexToRgba(ThemeColors.secondary, 0.9),
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    boldText: {
      fontSize: 20,
      fontWeight: "bold",
      color: ThemeColors.tertiary,
    },
  });

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate("Account Settings");
        }}
      >
        <AntDesign
          name="user"
          size={24}
          color={ThemeColors.tertiary}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.regularText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Feather
          name="settings"
          size={24}
          color={ThemeColors.tertiary}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.regularText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("Troubleshooting")}
      >
        <MaterialIcons
          name="troubleshoot"
          size={24}
          color={ThemeColors.tertiary}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.regularText}>Troubleshooting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("About")}
      >
        <Entypo
          name="help"
          size={24}
          color={ThemeColors.tertiary}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.regularText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => setFeedbackInputVisible(!feedbackInputVisible)}
      >
        <AntDesign
          name="mail"
          size={24}
          color={ThemeColors.tertiary}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.regularText}>Send Feedback</Text>
      </TouchableOpacity>
      {feedbackInputVisible && (
        <View style={styles.sendFeedBackItem}>
          <TextInput
            style={[
              styles.sendFeedbackInput,
              feedbackWarning && { borderWidth: 1, borderColor: "red" },
            ]}
            placeholder="What's on your mind?"
            onChangeText={setFeedbackText}
            placeholderTextColor={ThemeColors.tertiary}
          />
          <TouchableOpacity onPress={handleSendFeedback}>
            <Feather
              name="send"
              size={24}
              color={ThemeColors.tertiary}
              style={{ fontSize: 22, padding: 5 }}
            />
          </TouchableOpacity>
        </View>
      )}
      {feedbackSent && (
        <View style={styles.sendFeedBackItemSent}>
          <Text style={styles.regularText}>Feedback Sent</Text>
        </View>
      )}
      <View style={styles.row}>
        <ThemeBtn
          colors={["#212121", "#141313", "#b8bfc9", "#797979"]}
          name="Midnight"
        />
        <ThemeBtn
          colors={["#4c669f", "#3b5998", "#ffffff", "#192f6a"]}
          name="Deep Sea"
        />
        <ThemeBtn
          colors={["#f9d423", "#e65c00", "#333333", "#333333"]}
          name="Sunset"
        />
        <ThemeBtn
          colors={["#f8f9fa", "#e9ecef", "#212529", "#495057"]}
          name="Light"
        />
        {/* <ThemeBtn
          colors={["#fffacd", "#ffffe0", "#e6d150", "#e6b800"]}
          name="Lemon Sorbet"
        />

        <ThemeBtn
          colors={["#f5f5f5", "#ffe4e1", "#ffc0cb", "#ffb6c1"]}
          name="Rose Quartz"
        />
        <ThemeBtn
          colors={["#fff8dc", "#fffacd", "#d4b996", "#ffb6c1"]}
          name="Buttercream"
        /> */}
      </View>

      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.drawerFooterItem}
          onPress={() => {
            setLogoutModalVisible(true);
          }}
        >
          <SimpleLineIcons
            name="logout"
            size={24}
            color={ThemeColors.tertiary}
            style={styles.drawerItemIcon}
          />
          <Text style={{ fontWeight: "bold", color: ThemeColors.tertiary }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.boldText}>
              Are you sure you want to logout?
            </Text>
            <Button
              width={"80%"}
              text={"Yes log me out from all devices"}
              onPress={logoutAll}
              textColor={ThemeColors.tertiary}
            />
            <Button
              width={"80%"}
              text={"Logout just from this device"}
              onPress={handleLogout}
            />
            <Button
              isHighlighted={true}
              width={"80%"}
              text={"Cancel"}
              onPress={() => setLogoutModalVisible(false)}
            />
          </View>
        </View>
        <Toast />
      </Modal>
    </View>
  );
};
