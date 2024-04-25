import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { hp } from "@utils/index";
import { Ionicons, Octicons } from "@expo/vector-icons";

function FixedAddressComponent({ data }) {
  return (
    <View style={styles.Container}>
      <View style={styles.startingPoint}>
        <View>
          <Ionicons
            style={styles.startingPointIcon}
            name="ios-locate-sharp"
            size={24}
            color="#0045BF"
          />
        </View>
        <Text style={styles.startingPointText}>{data[0]}</Text>
      </View>
      {data?.slice(1, -1)?.map((el, ind) => (
        <View style={styles.stopages} key={ind}>
          <View>
            <Octicons
              name={!ind ? "dot" : "dot-fill"}
              size={!ind ? 22 : 14}
              color="grey"
            />
          </View>
          <Text style={styles.stopagesText}>{el}</Text>
        </View>
      ))}
      <View style={styles.destination}>
        <Ionicons
          style={styles.addTextInpIcon}
          name="location"
          size={24}
          color="#88C507"
        />
        <Text style={styles.destinationText}>{data[data.length - 1]}</Text>
      </View>
    </View>
  );
}

export default FixedAddressComponent;
const styles = StyleSheet.create({
  Container: {
    marginVertical: 10,
  },

  startingPoint: {
    flexDirection: "row",
    alignItems: "center",
  },
  startingPointText: {
    color: "#36454F",
  },
  destinationText: {
    color: "#36454F",
  },
  stopages: {
    marginStart: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  stopagesText: {
    paddingVertical: 10,
    color: "#36454F",
  },
  destination: {
    flexDirection: "row",
    alignItems: "center",
  },
});
