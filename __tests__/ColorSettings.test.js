import React from "react";
import renderer from "react-test-renderer";
import ColorSettings from "../pages/ColorSettings";
import { waitFor, render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { getData } from "../utils/utils";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ThemeColors } from "../assets/theme/ThemeColors";
import { NotificationProvider } from "../contexts/NotificationContext";
import Notification from "../components/Notification";
import Toast, { ErrorToast } from "react-native-toast-message";
import { createStackNavigator } from "@react-navigation/stack";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

test("Color settings component renders correctly", async () => {
  let component;
  await act(async () => {
    const Stack = createStackNavigator();
    // Render the component
    component = renderer.create(
      <NavigationContainer>
        <NotificationProvider>
          <ThemeProvider>
            <Stack.Screen name="Color Settings" component={ColorSettings} />
            <Notification />
          </ThemeProvider>
          <Toast />
        </NotificationProvider>
      </NavigationContainer>
    );
  });
  await waitFor(() => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}, 20000);

test("Color resets correctly", async () => {
  const { getByText } = render(
    <NavigationContainer>
      <NotificationProvider>
        <ThemeProvider>
          <ColorSettings />
          <Notification />
        </ThemeProvider>

        <Toast />
      </NotificationProvider>
    </NavigationContainer>
  );
  waitFor(async () => {
    fireEvent.press(getByText("Reset to default"));
    console.log(await getData("theme"));
    expect(await getData("theme")).toStrictEqual(ThemeColors);
  });
});
