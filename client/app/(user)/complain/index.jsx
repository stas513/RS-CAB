import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MainLayout from "@layout/MainLayout";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { useNavigation } from "expo-router";

const Complain = () => {
  const navigation = useNavigation();
  const complaints = [
    {
      id: 1,
      complainTitle: "OFFER",
      route: "ReportComplain",
    },
    {
      id: 2,
      complainTitle: "FARE ISSUE",
      route: "ReportComplain",
    },
    {
      id: 3,
      complainTitle: "CUSTOMER ISSUE",
      route: "ReportComplain",
    },
    {
      id: 4,
      complainTitle: "GPS/TRACKING",
      route: "ReportComplain",
    },
    {
      id: 5,
      complainTitle: "APP ISSUE",
      route: "ReportComplain",
    },
    {
      id: 6,
      complainTitle: "ACCOUNT BLOCKED",
      route: "ReportComplain",
    },
  ];
  return (
    <MainLayout>
      <View style={styles.complainsMainContainer}>
        <View style={styles.complainsHeadingContainer}>
          <Text style={styles.complainsText}>Complain</Text>
        </View>
        <View style={styles.complainsScrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.complainsContainer}>
              {complaints?.map((complain) => {
                return (
                  <View style={styles.complain} key={complain?.id}>
                    <Text style={styles.complainTitleText}>
                      {complain?.complainTitle}
                    </Text>
                    <View style={styles.arrowBtn}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("reportComplain/ReportComplain")
                        }
                      >
                        <AntDesign
                          name="arrowright"
                          size={hp(2.5)}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default Complain;

const styles = StyleSheet.create({
  complainsMainContainer: {
    width: wp(100),
  },
  complainsHeadingContainer: {
    alignItems: "center",
    marginTop: hp(1.7),
  },
  complainsText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
  complainsScrollContainer: {
    height: hp(72),
    width: wp(100),
  },
  complainsContainer: {
    justifyContent: "space-between",
    width: wp(100),
    gap: hp(2.2),
    marginTop: hp(3.5),
  },
  complain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: hp(1.95),
    backgroundColor: colors?.white,
    width: wp(100),
    height: hp(9.5),
    paddingHorizontal: wp(5),
  },
  complainTitleText: {
    fontSize: hp(2),
    fontWeight: "500",
  },
  arrowBtn: {
    backgroundColor: colors.lightGreen,
    height: hp(3.5),
    width: wp(7),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
