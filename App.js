import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  VirtualizedList,
  ScrollView,
} from "react-native";
// import { FlatList } from "react-native-virtualized-view";
const path = "https://pokeapi.co/api/v2/";
const query = "pokemon?limit=20&offset=0";
export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const fetchPokemons = async () => {
    let response = await fetch(`${path}${query}`);
    response = await response.json();
    await Promise.all(
      response.results.map(async (e) => {
        let resp = await fetch(e.url);
        resp = await resp.json();
        const name = e.name;
        const types = [];
        resp.types.map((e) => {
          types.push(e.type.name);
        });
        const image_url = resp.sprites.front_default;
        const pokemon = { name: name, types: types, image_url: image_url };
        setPokemons((pokemons) => [...pokemons, pokemon]);
      })
    );
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        keyExtractor={(item) => item.key}
        data={pokemons}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.heading}>{item.name}</Text>
              <View style={styles.imageCard}>
                <ImageBackground
                  style={styles.image}
                  source={{ uri: item.image_url }}
                ></ImageBackground>
              </View>
            </View>
            <ScrollView horizontal={true} style={styles.typeCard}>
              {item.types.map((e) => {
                return (
                  <View style={{ backgroundColor: "#FFF", height: 20 }}>
                    <Text style={styles.types}>{e + " "}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: "#37796C",
    height: 100,
    width: "98%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
  },
  image: { height: "100%", width: "100%", aspectRatio: 1 },
  heading: {
    color: "#FFF",
    fontSize: 30,
    marginLeft: 10,
    marginTop: 10,
  },
  types: { color: "#000", marginLeft: 10, fontSize: 15 },
  typeCard: { flexDirection: "row", marginTop: -40 },
  imageCard: { height: 100, width: 100 },
});
