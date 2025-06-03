import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchInput, Hourly, MainInfo, MoreInfo } from "../components";
import { formattedWeartherData } from "../services";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation";
import {
  CurrentData,
  ForecastData,
  defaultGradient,
  defaultTextSearch,
} from "../utils";


const Screens = () => {
  const [current, setCurrent] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [gradient, setGradient] = useState<[string, string]>(defaultGradient);
  const [loading, setLoading] = useState<boolean>(true);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
  const navigation = useNavigation<NavigationProp>();

  const onError = () => {
    Alert.alert(
      "Attention",
      "There was an error with the search or with the database. Try again."
    );
  };

  const getData = async (text: string) => {
    setLoading(true);
    const { formatedCurent, formatedForecast } = await formattedWeartherData({
      textSearch: text,
    });

    if (formatedCurent.error) {
      onError();
    } else {
      const { temp } = formatedCurent;
      setCurrent(formatedCurent);
      setForecast(formatedForecast);
      setGradient(temp < 20 ? ["#123699", "#0f648e"] : ["#8a2d09", "#9b5207"]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(defaultTextSearch);
  }, []);

  return (
    <LinearGradient
      colors={loading ? defaultGradient : gradient}
      style={styles.linearGradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SearchInput getData={getData} />
          {!loading && current && (
            <View>
              <MainInfo current={current} />
              <TouchableOpacity 
                style={styles.button}
                onPress={() =>
                  navigation.navigate("WeekForecast", {
                    forecast,
                    city: current.name || "Unknown",
                  })
                }
              >
                <Text style={styles.buttonText}>Full Week Temperature</Text>
              </TouchableOpacity>

              <Hourly forecast={forecast} />
              <MoreInfo current={current} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      {loading && (
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  viewLoading: {
    flex: 0.93,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "partial transparent",
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#white",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Screens;
