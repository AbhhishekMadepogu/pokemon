import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
const path = "https://pokeapi.co/api/v2/";
const query = "pokemon?limit=20&offset=0";

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
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
          console.log(pokemon);
          setPokemons((pokemons) => [...pokemons, pokemon]);
        })
      );
    };
    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
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
