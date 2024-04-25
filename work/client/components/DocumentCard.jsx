import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { hp, wp } from "@utils";
import CustomModal from "@components/Modal";
import { SimpleLineIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

const DocumentCard = ({ document, files, setFiles }) => {
  const [fileResponse, setFileResponse] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const RenderFilePreview = () => {
    const file = fileResponse;
    if (!file) {
      return null;
    }

    return (
      <Image
        source={{ uri: file.assets[0].uri }}
        style={{
          height: hp(15),
          width: wp(45),
        }}
      />
    );
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: "image/*",
      });
      setFileResponse(response);

      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.map((fileObj) => {
          if (fileObj.name === document.name) {
            // If the document already exists in files, update the file
            return { ...fileObj, file: response };
          }
          return fileObj;
        });

        // If the document does not exist in files, add it
        if (!updatedFiles.some((fileObj) => fileObj.name === document.name)) {
          updatedFiles.push({ name: document.name, file: response });
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
                borderColor: "black",
                width: "100%",
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
      <View style={styles.container}>
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            {fileResponse ? (
              <View style={styles.uploadButton}>
                <RenderFilePreview />
              </View>
            ) : (
              <SimpleLineIcons
                name="cloud-upload"
                size={hp(7)}
                color="#999e9b"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>{document.label}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.uploadLabel}>
              Upload File{" "}
              <AntDesign name="arrowright" size={wp(4)} color="#818185" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DocumentCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1.25),
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(1),
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: hp(15),
    width: wp(45),
    backgroundColor: "white",
    borderRadius: wp(5),
    overflow: "hidden",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: wp(4),
    width: wp(40),
  },
  label: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#4c5ce0",
    fontFamily: "Poppins-Medium",
  },
  uploadLabel: {
    fontWeight: "bold",
    marginTop: hp(1),
    color: "#818185",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Poppins-Medium",
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
