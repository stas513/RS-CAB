import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MainLayout from "@layout/MainLayout";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { useNavigation } from "expo-router";

const ContactUs = () => {
  const navigation = useNavigation();
  const servies = [
    {
      id: 1,
      serviceName: "Call",
      icon: <Ionicons name="call" size={hp(4.1)} color={colors?.darkBlue} />,
      route: "",
    },
    {
      id: 2,
      serviceName: "Your Complaints",
      icon: (
        <FontAwesome5
          name="headphones-alt"
          size={hp(4.1)}
          color={colors?.darkBlue}
        />
      ),
      route: "complain/Complain",
    },
    {
      id: 3,
      serviceName: "About R.S Cab",
      icon: (
        <Feather
          name="message-circle"
          size={hp(4.1)}
          color={colors?.darkBlue}
        />
      ),
      route: "",
    },
  ];
  return (
    <MainLayout>
      <View style={styles.contactUsMainContainer}>
        <View style={styles.contactUsHeadingContainer}>
          <Text style={styles.contactUsText}>Contact Us</Text>
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.servicesContainer}>
              {servies?.map((service) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(service?.route)
                    }
                    style={styles.service}
                    key={service?.id}
                  >
                    <Text>{service?.icon}</Text>
                    <Text style={styles.serviceNameText}>
                      {service?.serviceName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  contactUsMainContainer: {
    width: wp(100),
  },
  contactUsHeadingContainer: {
    alignItems: "center",
    marginTop: hp(1.7),
  },
  contactUsText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
  servicesContainer: {
    justifyContent: "space-between",
    width: wp(100),
    gap: hp(2.2),
    marginTop: hp(3.5),
  },
  service: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: hp(1.95),
    backgroundColor: colors?.white,
    width: wp(100),
    height: hp(16),
  },
  serviceNameText: {
    fontSize: hp(2.8),
  },
});
