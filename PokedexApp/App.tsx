import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PokedexScreen } from "./screens/PokedexScreen";
import { PokemonDetailsScreen } from "./screens/PokemonDetailsScreen";
import { RootStackParamList } from "./types/Navigation"; // os tipos

import { FavoritesProvider } from "./src/contexts/FavoritesContext";

// pilha de navegação com os tipos definidos
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(){
  return(
    <SafeAreaProvider>
      {/* O Provider envolve a navegação e todas as telas */}
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Pokedex">
            {/* titulo na barra de navegação */}
            <Stack.Screen name="Pokedex" component={PokedexScreen} options={{ title: 'Pokédex' }} /> 
            <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} options={{ title: 'Detalhes do Pokémon' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}