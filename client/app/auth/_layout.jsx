import { Stack } from "expo-router"


 const SingInLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" ></Stack.Screen>
    </Stack>
  )
}

export default SingInLayout
