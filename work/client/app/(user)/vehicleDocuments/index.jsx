import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useCallback } from "react";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { Ionicons } from "@expo/vector-icons";
import MainLayout from "@layout/MainLayout";
import CustomModal from "@components/Modal";
import * as DocumentPicker from "expo-document-picker";

const Document = () => {
  const [fileResponse, setFileResponse] = useState(false);
  const [files, setFiles] = useState([]);

  const list = [
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 1,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 2,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 3,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 4,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 5,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 6,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 7,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 8,
    },
    {
      name: "Vehicle Documents",
      description: "Upload your update documentys",
      id: 9,
    },
  ];

  return (
    <MainLayout>
      <View style={styles.documentListMainContainer}>
        <View style={styles.documentListHeader}>
          <Text style={styles.documetText}>Documents</Text>
          <Text style={styles.infoText1}>
            Consectetur Adipiscing Elit, Sed Do Eiusmod
          </Text>
          <Text style={styles.infoText2}>Tempor Incididunt </Text>
        </View>
      </View>
      <View style={styles.documentListContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {list.map((item, index) => {
            return (
              <DocumentCart item={item} files={files} setFiles={setFiles} />
            );
          })}
        </ScrollView>
      </View>
    </MainLayout>
  );
};

const DocumentCart = ({ item, files, setFiles }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: "image/*",
      });

      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.map((fileObj) => {
          if (fileObj.name === item.name) {
            // If the item already exists in files, update the file
            return { ...fileObj, file: response };
          }
          return fileObj;
        });

        // If the item does not exist in files, add it
        if (!updatedFiles.some((fileObj) => fileObj.name === item.name)) {
          updatedFiles.push({ name: item.name, file: response });
        }

        return updatedFiles;
      });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <CustomModal setVisible={setModalVisible} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.queCon}>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.infoTitle}
              >
                Take a picture
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "lightGrey",
                width: "90%",
              }}
            ></View>
            <View style={styles.queCon}>
              <Text
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleDocumentSelection();
                }}
                style={styles.infoTitle}
              >
                Choose a picture
              </Text>
            </View>
          </View>
        </View>
      </CustomModal>
      <View style={styles.listItem} key={item.id}>
        <View style={styles.listTitle}>
          <Text style={styles.titleText}>{item.name}</Text>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              setModalVisible(true);
              handleDocumentSelection();
            }}
          >
            <Text style={styles.uploadText}>Upload Files</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={10}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </>
  );
};

export default Document;

const styles = StyleSheet.create({
  documentListMainContainer: {
    width: "100%",
    marginTop: hp(3.7),
  },
  documetText: {
    fontSize: hp(3.4),
    color: colors.darkBlue,
    fontWeight: "600",
  },
  infoText1: {
    fontSize: hp(1.2),
    color: colors.black,
    marginTop: hp(1),
  },
  infoText2: {
    fontSize: hp(1.2),
    color: colors.black,
    marginTop: hp(0.7),
  },
  documentListContainer: {
    height: hp(75),
  },
  listItem: {
    marginTop: hp(4),
  },
  listTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(0.8),
  },
  titleText: {
    fontSize: hp(2),
    fontWeight: "600",
  },
  uploadBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  uploadText: {
    fontSize: hp(1.3),
    fontWeight: "400",
  },
  descriptionText: {
    fontSize: hp(1.4),
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
