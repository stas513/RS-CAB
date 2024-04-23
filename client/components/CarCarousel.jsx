import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { colors } from "../utils/theme";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../context/userContext";
import { fetchImageFromBackend, getPackages } from "../utils/appApis/index";
import { CarNullImage } from "./ProfileNullImage";
import PackagesSkeleton from "./PackagesSkeleton";

const CarouselComponent = ({ onCarSelect }) => {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [packages, setPackages] = useState([]);
  const [pacCarImages, setPacCarImages] = useState({});
  const [Loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const GetPackages = async () => {
    setSkeletonLoading(true);
    const response = await getPackages();
    setPackages(response);
    setSkeletonLoading(false);
  };
  const fetchImages = async (item) => {
    if (item?.coverImage) {
      try {
        const data = await fetchImageFromBackend(item.coverImage);

        setPacCarImages((prevImages) => ({
          ...prevImages,
          [item.id]: data,
        }));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };
  useEffect(() => {
    GetPackages(); // Fetch packages

    // This effect will execute whenever packages or pacCarImages change
  }, []);

  // Add a separate effect to fetch images when packages are updated
  useEffect(() => {
    // Check if packages is not empty and there are coverImages to fetch
    if (packages.length > 0) {
      packages.forEach((item) => {
        if (item?.coverImage) {
          setLoading(true);
          fetchImages(item); // Fetch images for items with coverImage
          setLoading(false);
        }
      });
    }
  }, [packages]);

  const handleCarSelect = (id) => {
    setSelectedCarId(id);
    onCarSelect(id);
  };

  return (
    <>
      {skeletonLoading ? (
        <PackagesSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 20 }}
          horizontal
        >
          {packages?.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.cartypesContchild,
                selectedCarId === item.id && {
                  backgroundColor: colors.darkBlue,
                },
              ]}
              onPress={() => handleCarSelect(item.id)}
            >
              {Loading ? (
                <ActivityIndicator color={colors.white} />
              ) : item?.coverImage ? (
                <Image
                  source={{ uri: pacCarImages[item.id] }}
                  style={styles.carTypeImage}
                />
              ) : (
                <CarNullImage />
              )}
              <Text
                style={[
                  selectedCarId === item.id && {
                    color: colors.white,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cartypesContchild: {
    marginHorizontal: 4,
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 0,
  },
  carTypeImage: {
    borderRadius: 10,
    resizeMode: "cover",
    height: 30,
    width: 60,
    marginHorizontal: 5,
  },
  contianer: {
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 0,
  },
});

export default CarouselComponent;
