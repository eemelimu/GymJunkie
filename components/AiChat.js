import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import useRequest from "../hooks/useRequest";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { BACKEND_URL } from "../assets/config";

export const AiChat = () => {
  const [openChat, setOpenChat] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState([
    { type: "sent", content: "Hello! :))" },
    { type: "received", content: "hello, t. chatgpt!" },
  ]);
  const { state } = useAuth();
  const token = state.token;
  const { fetcher } = useRequest(token);
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const updatedConversation = [
        ...conversation,
        { type: "sent", content: newMessage.trim() },
      ];
      setConversation(updatedConversation);
     await getResponse();
      setNewMessage("");
    }
  };

  const getResponse = async () => {
    const res = await fetcher({
      url: BACKEND_URL + "question",
      reqMethod: "POST",
      object: { question: newMessage },
    });
    if (res) {
      res.answer && setConversation([...conversation, { type: "received", content: res.answer }]);
      console.log(res.answer);
    }}

  return (
    <View style={styles.container}>
      {openChat && (
        <Modal
          visible={openChat}
          onRequestClose={() => setOpenChat(!openChat)}
          animationType="slide"
        >
          <View style={styles.chatbox}>
            <View style={styles.messageContainer}>
              {conversation.map((message, index) => (
                <Text
                  key={index}
                  style={
                    message.type === "sent"
                      ? styles.sentMessage
                      : styles.receivedMessages
                  }
                >
                  {message.content}
                </Text>
              ))}
            </View>
            <View style={styles.inputRow}>
              <TextInput
                onSubmitEditing={sendMessage}
                style={styles.input}
                value={newMessage}
                onChangeText={(text) => setNewMessage(text)}
                placeholder="Type your question..."
                placeholderTextColor={"#ccc"}
                width="85%"
                keyboardType="default"
              />
              <Pressable onPress={sendMessage} style={styles.sendIcon}>
                <Feather
                  name="send"
                  size={24}
                  color="black"
                  style={{ paddingHorizontal: 5 }}
                />
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {!openChat && (
        <Pressable
          style={styles.openChat}
          onPress={() => setOpenChat(!openChat)}
        >
          <Fontisto name="hipchat" size={50} color="orange" />
        </Pressable>
      )}
      {openChat && (
        <Pressable
          style={styles.closeChat}
          onPress={() => setOpenChat(!openChat)}
        >
          <SimpleLineIcons name="arrow-down" size={40} color="black" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  chatbox: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "scroll",
    paddingBottom: 50,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  sendIcon: {
    marginLeft: 10,
  },
  messageContainer: {
    padding: 10,
    overflow: "scroll",
    justifyContent: "flex-start",
    textAlign: "right",
  },
  sentMessage: {
    borderRadius: 10,
    marginBottom: 5,
    textAlign: "right",
  },
  receivedMessages: {
    borderRadius: 10,
    marginBottom: 5,
    textAlign: "left",
  },
  closeChat: {
    position: "absolute",
    bottom: 0,
    padding: 5,
  },
  openChat: {
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    bottom: 100,
    zIndex: 0,
  },
  closeChat: {
    alignItems: "flex-end",
    position: "absolute",
    right: "45%",
    top: 0,
  },
});
