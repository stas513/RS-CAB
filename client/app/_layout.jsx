import { Stack } from "expo-router";
import { UserProvider } from "../context/userContext";
import { SafeAreaView } from "react-native";
import { BookingProvider } from "../context/booking";
import { SocketProvider } from "../context/sockets";
import { PassengerProvider } from "../context/passenger";
import { DriverProvider } from "../context/driver";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootStack() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <SocketProvider>
        <BookingProvider>
          <UserProvider>
            <PassengerProvider>
              <DriverProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Stack
                    screenOptions={{ headerShown: false }}
                    initialRouteName=""
                  >
                    <Stack.Screen name="index" />
                  </Stack>
                </SafeAreaView>
              </DriverProvider>
            </PassengerProvider>
          </UserProvider>
        </BookingProvider>
      </SocketProvider>
    </GestureHandlerRootView>
  );
}
