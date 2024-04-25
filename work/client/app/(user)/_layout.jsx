import { Drawer } from "expo-router/drawer";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { colors } from "@utils/theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { hp, wp } from "@utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserContext } from "@context/userContext/useUserContext";
import { useState } from "react";
import { ProfileNullImage } from "../../components/ProfileNullImage";
import { useEffect } from "react";
import { fetchImageFromBackend } from "../../utils/appApis";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerContent = () => {
  const navigation = useRouter();
  const { mode, setMode, user, dispatch } = useUserContext();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const passengerMenu = [
    {
      id: 1,
      title: <Text style={styles.menuTitle}>Home</Text>,
      icon: <Feather name="home" size={22} color={colors.darkBlue} />,
      route: "/passengers",
    },
    {
      id: 2,
      title: <Text style={styles.menuTitle}>Booking History</Text>,
      icon: <Entypo name="back-in-time" size={22} color={colors.darkBlue} />,
      route: "/passengers/booking/list",
    },
    {
      id: 3,
      title: <Text style={styles.menuTitle}>Wallet</Text>,
      icon: (
        <MaterialCommunityIcons
          name="wallet"
          size={22}
          color={colors.darkBlue}
        />
      ),
      route: "/wallet",
    },
    {
      id: 4,
      title: <Text style={styles.menuTitle}>Contact Us</Text>,
      icon: <FontAwesome name="phone" size={22} color={colors.darkBlue} />,
      route: "/contactUs",
    },
  ];

  const driverMenu = [
    {
      id: 1,
      title: <Text style={styles.menuTitle}>Home</Text>,
      icon: <Feather name="home" size={22} color={colors.darkBlue} />,
      route: "/drivers/driverOffline",
    },
    {
      id: 2,
      title: <Text style={styles.menuTitle}>Booking History</Text>,
      icon: <Entypo name="back-in-time" size={22} color={colors.darkBlue} />,
      route: "/drivers/booking/list",
    },
    {
      id: 3,
      title: <Text style={styles.menuTitle}>Documents</Text>,
      icon: <Ionicons name="cloud-upload" size={22} color={colors.darkBlue} />,
      route: "/driverDocuments",
    },
    {
      id: 4,
      title: <Text style={styles.menuTitle}>Vehicle Documents</Text>,
      icon: (
        <MaterialCommunityIcons
          name="file-document"
          size={22}
          color={colors.darkBlue}
        />
      ),
      route: "/vehicleDocuments",
    },
    {
      id: 5,
      title: <Text style={styles.menuTitle}>Wallet</Text>,
      icon: (
        <MaterialCommunityIcons
          name="wallet"
          size={22}
          color={colors.darkBlue}
        />
      ),
      route: "/wallet",
    },
    {
      id: 6,
      title: <Text style={styles.menuTitle}>Contact Us</Text>,
      icon: <FontAwesome name="phone" size={22} color={colors.darkBlue} />,
      route: "/contactUs",
    },
  ];

  const fetchImages = async () => {
    const imageSource =
      mode == "driver"
        ? user?.driver?.profileImage
        : user?.passenger?.profileImage;
    const data = imageSource ? await fetchImageFromBackend(imageSource) : null;

    setImage(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const menus = mode == "driver" ? driverMenu : passengerMenu;

  const onChangeMode = () => {
    setMode(mode == "user" ? "driver" : "user");
    navigation.push(
      mode == "driver" ? "/passengers" : "/drivers/driverOffline"
    );
  };

  const registerDriverAsAPassenger = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", user?.id);
      const response = await axios.post(
        "https://rsadmin.vercel.app/api/users/passenger",
        formData
      );
      if (response.status == 201) {
        Alert.alert("Passenger Profile Created Successfully");
        navigation.push(`/passengers`);
        dispatch({
          type: "setPassengerInUser",
          payload: {
            passenger: response.data,
          },
        });
        dispatch({
          type: "SET_USER_MODE",
          payload: {
            mode: "user",
          },
        });
      }
      setLoading(false);
    } catch (err) {
      Alert.alert(err.response?.response?.data?.message);
      setLoading(false);
    }
  };

  const RenderButton = () => {
    if (user?.passenger && user?.driver) {
      return (
        <TouchableOpacity
          style={[styles.btn, styles.switchBtn]}
          onPress={onChangeMode}
        >
          <MaterialCommunityIcons
            name="account-convert"
            size={22}
            color={colors.white}
          />
          <Text style={styles.btnText}>
            Switch To {mode == "driver" ? "User" : "Driver"}
          </Text>
        </TouchableOpacity>
      );
    }

    if (!user?.passenger) {
      return (
        <TouchableOpacity
          style={[styles.btn, styles.switchBtn]}
          onPress={registerDriverAsAPassenger}
        >
          <SimpleLineIcons name="user" size={22} color={colors.white} />
          <Text style={styles.btnText}>Become a User</Text>
        </TouchableOpacity>
      );
    }

    if (!user?.driver) {
      return (
        <TouchableOpacity
          style={[styles.btn, styles.switchBtn]}
          onPress={() => navigation.push("/auth/registerDriver")}
        >
          <MaterialCommunityIcons
            name="account-convert"
            size={22}
            color={colors.white}
          />
          <Text style={styles.btnText}>Become a Driver</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const logout = async() => {
    dispatch({
      type: "LOGOUT",
    });
    await AsyncStorage.removeItem("user-data")
    navigation.push("/user&Captain");
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerProfileContainer}>
        <View style={styles.profileContainer}>
          {image ? (
            <Image
              source={{uri:image}}
              alt="Profile Image"
              style={styles.profileImage}
            />
          ) : (
            <ProfileNullImage />
          )}
          <Link href={"/profile"}>
            <Text style={styles.editText}>Edit</Text>
          </Link>
        </View>
        <View style={styles.profileDetailsContainer}>
          <View style={styles.nameAndSettingContainer}>
            <Text style={styles.userNameText}>{user?.name}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.levelText}>Basic Level</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <FontAwesome key={index} name="star" size={15} color="orange" />
              ))}
            </View>
            <Text style={styles.ratingText}>
              Rating
              {mode == "user" ? user?.passenger?.ratings : user?.driver?.ratings}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.drawerMenuMainContainer}>
        {menus?.map((menu) => {
          return (
            <View key={menu?.id}>
              <Link href={menu?.route}>
                <View style={styles.menuItemContainer}>
                  <View style={styles.icon}>{menu?.icon}</View>
                  <View>{menu?.title}</View>
                </View>
              </Link>
            </View>
          );
        })}

        <TouchableOpacity
          style={[styles.btn, styles.logoutBtn]}
          onPress={logout}
        >
          <MaterialIcons name="logout" size={22} color={colors.white} />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
        <RenderButton />
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          swipeEdgeWidth: 0,
          headerTransparent: true,
          title: false,
          lazy: true,
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => <NotificationButton />,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="passengers"
          options={{
            drawerLabel: "Passenger",
            drawerItemStyle: { height: 0 },
          }}
        />
        <Drawer.Screen
          name="drivers"
          options={{
            drawerLabel: "Driver",
            drawerItemStyle: { height: 0 },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function DrawerToggleButton({ tintColor, ...rest }) {
  const navigation = useNavigation();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={[styles.touchable]}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
    >
      <Ionicons
        name="menu-sharp"
        size={25}
        color="white"
        backgroundColor={colors.lightGreen}
        style={{
          borderRadius: 50,
          padding: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
    </PlatformPressable>
  );
}

function NotificationButton({ tintColor, ...rest }) {
  const navigation = useNavigation();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      style={[styles.touchable]}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
    >
      <Ionicons
        name="md-notifications-sharp"
        size={25}
        color="white"
        backgroundColor={colors.darkBlue}
        style={{
          borderRadius: 50,
          padding: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
    </PlatformPressable>
  );
}
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: "contain",
  },
  touchable: {
    marginHorizontal: 11,
  },
  menuTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
  },
  menuItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },

  drawerContainer: {
    backgroundColor: colors.white,
  },
  drawerProfileContainer: {
    backgroundColor: colors.skyBlue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileDetailsContainer: {
    paddingVertical: hp(6),
    paddingHorizontal: 20,
  },

  ratingContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: wp(1.8),
  },
  userNameText: {
    fontSize: hp(2.1),
  },
  profileImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  editText: {
    fontSize: 14,
    paddingVertical: 20,
  },
  nameAndSettingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  btn: {
    flexDirection: "row",
    gap: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginHorizontal: wp(1),
    marginVertical: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutBtn: {
    backgroundColor: colors.darkBlue,
  },
  switchBtn: {
    backgroundColor: colors.lightGreen,
  },

  btnText: {
    color: colors.white,
    fontSize: hp(2.5),
  },
});
