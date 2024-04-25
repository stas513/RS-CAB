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

const ReportComplain = () => {
  const options = [
    {
      id: 1,
      repoetTitle: "Report A New Problem",
    },
    {
      id: 2,
      repoetTitle: "View Old Problem",
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
              {options?.map((option) => {
                return (
                  <View style={styles.option} key={option?.id}>
                    <Text style={styles.complainTitleText}>
                      {option?.repoetTitle}
                    </Text>
                    <View style={styles.arrowBtn}>
                      <TouchableOpacity>
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

export default ReportComplain;

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
  option: {
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
