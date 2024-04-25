import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView, } from "@gorhom/bottom-sheet";
import { colors } from "../utils/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CustomBottomSheet = ({
  children,
  backdrop,
  snapPoints = ["10%"],
  index = 0,
}) => {
  const bottomSheetRef = useRef(null);
  const snapPointsValue = useMemo(() => snapPoints, []);

  return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          index={index}
          snapPoints={snapPointsValue}
          backdropComponent={backdrop}
          enableDynamicSizing={true}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skyBlue,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default CustomBottomSheet;
