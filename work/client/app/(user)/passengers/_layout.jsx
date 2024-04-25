import { Stack } from "expo-router"

const PassengerLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="home"/>
    </Stack>
  )
}

export default PassengerLayout