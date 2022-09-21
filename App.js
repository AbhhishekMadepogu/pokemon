import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
const path = "https://pokeapi.co/api/v2/";
const query = "pokemon?limit=20&offset=0";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const fetchPokemons = async () => {
    let response = await fetch(`${path}${query}`);
    response = await response.json();
    console.log("Response", response.results);
    await Promise.all(
      response.results.map(async (e) => {
        let resp = await fetch(e.url);
        resp = await resp.json();
        console.log(e.name);
        resp.types.map((e) => {
          console.log(e.type.name);
        });
        console.log(resp.sprites.front_default);
      })
    );
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
