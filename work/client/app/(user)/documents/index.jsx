import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import { hp, wp } from "@utils";
import DocumentCard from "@components/DocumentCard";
const Documents = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const documents = [
    { id: 1, label: "vehicle Document", name: "identificationCard" },
    { id: 2, label: "vehicle Document", name: "confirmationCards" },
    { id: 3, label: "vehicle Document", name: "vehicalInfo" },
    { id: 4, label: "vehicle Document", name: "vehicalInfo" },
    { id: 5, label: "vehicle Document", name: "vehicalInfo" },
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
    height: hp(110),
    paddingBottom: hp(10),

    backgroundColor: "rgba(0, 69, 191, 0.1)",
  },
  documentContainer: {
    minHeight: hp(90),
  },
});
