import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import { hp, wp } from "@utils";
import DocumentCard from "@components/DocumentCard";
import CustomModal from "@components/Modal";
const Documents = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const documents = [
    { id: 1, label: "Driver Documents", name: "identificationCard" },
    { id: 2, label: "Driver Documents", name: "confirmationCards" },
    { id: 3, label: "Driver Documents", name: "vehicalInfo" },
    { id: 4, label: "Driver Documents", name: "vehicalInfo" },
    { id: 5, label: "Driver Documents", name: "vehicalInfo" },
    { id: 6, label: "Driver Documents", name: "vehicalInfo" },
    { id: 7, label: "Driver Documents", name: "vehicalInfo" },
    { id: 8, label: "Driver Documents", name: "vehicalInfo" },
    { id: 9, label: "Driver Documents", name: "vehicalInfo" },
  ];
  useEffect(() => {}, [files]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.documentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: "100%" }}
          >
            {documents.map((document) => (
              <DocumentCard
                visible={modalVisible}
                setVisible={setModalVisible}
                key={document.id}
                document={document}
                files={files}
                setFiles={setFiles}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(12),
    paddingLeft: wp(4),
    paddingBottom: hp(10),
    height: hp(110),
    backgroundColor: "rgba(0, 69, 191, 0.1)",
  },
  documentContainer: {
    minHeight: hp(90),
  },
  modalView: {
    justifyContent: "space-between",
    height: hp(25),
    width: wp(80),
    paddingVertical: hp(7),
    marginTop: wp(5),
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1000,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
