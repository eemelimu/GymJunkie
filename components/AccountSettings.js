import React, { useState, useContext, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
//import { ThemeColors } from "../assets/ThemeColors";
import { ThemeContext } from "./ThemeContext";
import { BACKEND_URL } from "../assets/config";
import { useFocusEffect } from "@react-navigation/native";

const AccountSettings = () => {
  const { dispatch, state } = useAuth();
  const token = state.token;
  const [username, setUsername] = useState("Username"); //fetch the username from the database
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const { theme: ThemeColors } = useContext(ThemeContext);

  const getUserData = async () => {
    try {
      const response = await fetch(BACKEND_URL + "user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": `${token}`,
        },
      });
      if (!response.ok) {
        console.log(token);
        throw new Error("HTTP status " + response.status);
      }
      const data = await response.json();
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailChange = async () => {
    setEmailModalVisible(false);
    try {
      const response = await fetch(BACKEND_URL + "user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": `${token}`,
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        console.log(JSON.stringify({ email: email }));
        console.log(token);
        throw new Error("HTTP status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    setPasswordModalVisible(false);
    try {
      const response = await fetch(BACKEND_URL + "user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": `${token}`,
        },
        body: JSON.stringify({ password: password }),
      });
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: ThemeColors.primary,
    },
    username: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: "bold",
      color: ThemeColors.tertiary,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    buttonText: {
      marginLeft: 10,
      color: ThemeColors.tertiary,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: ThemeColors.secondary,
      opacity: 0.8,
    },
    modalContent: {
      backgroundColor: ThemeColors.secondary,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: ThemeColors.quaternary,
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
    saveButton: {
      backgroundColor: ThemeColors.primary,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    saveButtonText: {
      color: ThemeColors.tertiary,
    },
    cancelButton: {
      marginTop: 10,
      padding: 5,
    },
    cancelButtonText: {
      color: ThemeColors.quaternary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Username: {username}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setEmailModalVisible(true)}
      >
        <MaterialIcons name="email" size={24} color={ThemeColors.tertiary} />
        <Text style={styles.buttonText}>Change Email</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => setPasswordModalVisible(true)}
      >
        <MaterialIcons name="lock" size={24} color={ThemeColors.tertiary} />
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color={ThemeColors.tertiary} />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => {
          getUserData();
          setEmailModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={email}
              color={ThemeColors.tertiary}
              placeholderTextColor={ThemeColors.tertiary}
            />
            <Pressable style={styles.saveButton} onPress={handleEmailChange}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                getUserData();
                setEmailModalVisible(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              color={ThemeColors.tertiary}
              placeholderTextColor={ThemeColors.tertiary}
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholderTextColor={ThemeColors.tertiary}
              color={ThemeColors.tertiary}
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable style={styles.saveButton} onPress={handlePasswordChange}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setPasswordModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountSettings;
