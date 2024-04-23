import { Stack } from 'expo-router'
import React from 'react'

export const HomeLayout = () => {
  return (
<Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index"/>
</Stack>
  )
}
export default HomeLayout