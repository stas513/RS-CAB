import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";

const CustomModal = ({
  visible,
  setVisible,
  children,
  position = "center",
}) => {
  const translateY = new Animated.Value(0);

  const getModalPosition = () => {
    switch (position) {
      case "top":
        return { justifyContent: "flex-start", top: 0 };
      case "bottom":
        return { justifyContent: "flex-end", bottom: 0 };
      default:
        return { justifyContent: "center" };
    }
  };

  // Update the modal state when 'visible' prop changes
  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // Set modalVisible to false when the modal is dismissed
        setVisible(false);
      });
    }
  }, [visible, setVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onDismiss={() => {
        // Set modalVisible to false when the modal is dismissed
        setVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          // Set modalVisible to false when the modal is dismissed
          setVisible(false);
        }}
      >
        <View style={[styles.modalContainer, getModalPosition()]}>
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
