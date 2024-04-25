import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
} from "victory-native"; // Make sure to import the Victory components properly for React Native
import { colors } from "@utils/theme";

const MyDataset = [
  [
    { x: "a", y: 5 },
    { x: "b", y: 2 },
    { x: "c", y: 3 },
    { x: "d", y: 2 },
    { x: "e", y: 1 },
  ],
  [
    { x: "a", y: 2 },
    { x: "b", y: 3 },
    { x: "c", y: 4 },
    { x: "d", y: 5 },
    { x: "e", y: 5 },
  ],
];

const Chart = ({ containerStyle, chartHeight, chartWidth, barColors }) => {
  const [dataset, setDataset] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Weekly");

  useEffect(() => {
    const transformData = (dataset) => {
      const totals = dataset[0].map((data, i) => {
        return dataset.reduce((memo, curr) => {
          return memo + curr[i].y;
        }, 0);
      });
      return dataset.map((data) => {
        return data.map((datum, i) => {
          return { x: datum.x, y: (datum.y / totals[i]) * 10 };
        });
      });
    };

    setDataset(transformData(MyDataset));
  }, [selectedFilter]);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.filtersContainer}>
        <TouchableOpacity onPress={() => setSelectedFilter("Weekly")}>
          <Text
            style={[
              styles.filterText,
              selectedFilter === "Weekly" && styles.selectedFilterText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedFilter("Monthly")}>
          <Text
            style={[
              styles.filterText,
              selectedFilter === "Monthly" && styles.selectedFilterText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedFilter("Yearly")}>
          <Text
            style={[
              styles.filterText,
              selectedFilter === "Yearly" && styles.selectedFilterText,
            ]}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>
      <VictoryChart
        height={chartHeight}
        width={chartWidth}
        domainPadding={{ x: 30, y: 20 }}
      >
        <VictoryStack colorScale={barColors}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
        <VictoryAxis tickFormat={["a", "b", "c", "d", "e"]} />
      </VictoryChart>
    </View>
  );
};

export default Chart;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  filtersContainer: {
    paddingVertical: "4%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: -40,
  },
  filterText: {
    color: colors.textDarkGrey,
  },
  selectedFilterText: {
    color: colors.lightGreen,
  },
});
