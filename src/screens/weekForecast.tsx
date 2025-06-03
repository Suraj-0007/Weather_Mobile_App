import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { ForecastData } from "../utils"; // Assuming this is your forecast type
import { RouteProp, useRoute } from "@react-navigation/native";

type WeekForecastRouteProp = RouteProp<{ 
  WeekForecast: { 
    forecast: ForecastData[]; 
    city: string; 
  }; 
}, 'WeekForecast'>;

const WeekForecast = () => {
  const route = useRoute<WeekForecastRouteProp>();
  const { forecast, city } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.cityTitle}>Forecast for {city}</Text>

        {/* Description Row */}
        <View style={styles.cardFull}>
          <Text style={ styles.head}>🌦 Weekly Forecast Overview</Text>
        </View>

        {/* 2 Columns: Mon | Tue */}
        <View style={styles.rowDouble}>
          <ForecastCard data={forecast[0]} label="Monday" />
          <ForecastCard data={forecast[1]} label="Tuesday" />
        </View>

        {/* 2 Columns: Wed | Thu */}
        <View style={styles.rowDouble}>
          <ForecastCard data={forecast[2]} label="Wednesday" />
          <ForecastCard data={forecast[3]} label="Thursday" />
        </View>

        {/* 2 Columns: Fri | Sat */}
        <View style={styles.rowDouble}>
          <ForecastCard data={forecast[4]} label="Friday" />
          <ForecastCard data={forecast[5]} label="Saturday" />
        </View>

        {/* Sunday alone */}
        <View style={styles.rowSingle}>
          <ForecastCard data={forecast[6]} label="Sunday" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ForecastCard = ({ data, label }: { data: ForecastData; label: string }) => (
  <View style={styles.card}>
    <Text style={styles.day}>{label}</Text>
    <Text style={styles.temp}>{data.temp.toFixed(1)}°C</Text>
    <Text style={styles.description}>{data.description}</Text>
    <Text style={styles.humidity}>💧 {data.humidity}%</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6fd",
    paddingTop: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  cityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
    cardFull: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  rowSingle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
    width: "100%",
  },
  rowDouble: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  head: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#34495e",
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#34495e",
  },
  temp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e67e22",
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  humidity: {
    fontSize: 12,
    color: "#3498db",
    marginTop: 4,
  },
});

export default WeekForecast;
