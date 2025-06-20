import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';

import { useFavorites } from '../src/contexts/FavoritesContext'; // importar o hook

interface Props {
    pokemon: Pokemon;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonDetails'>; // garantir a segurança de tipo

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<PokemonCardNavigationProp>();

  // Consumir o contexto de favoritos
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handleToggleFavorite = () => {
    if(favorite){
      removeFavorite(pokemon.id);
    } else{
      addFavorite(pokemon.id);
    }
  }

  const handlePress = () => {
    navigation.navigate('PokemonDetails', { pokemonId: pokemon.id }); // PokemonDetails = rota de destino & pokemonId: pokemon.id = parâmetros passados para a tela de destino
  }

    return(
       <TouchableOpacity onPress={handlePress} style={styles.touchableCard}>
          <View style={[styles.card, favorite && styles.cardFavorite]}>
            {/* Ícone de favorito no topo do card */}
            <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>{favorite ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
              <Image source={ { uri: pokemon.image } } style={styles.image} />
              <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    margin: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  image: { 
    width: 80, 
    height: 80 
  },
  name: { 
    marginTop: 8, 
    fontWeight: 'bold' 
  },
    touchableCard: {
    flex: 1,
    margin: 8,
  },
  cardFavorite: {
    backgroundColor: '#fffbe6', // Cor de fundo para favoritos
    borderColor: '#facc15',
    borderWidth: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  favoriteIcon: {
    fontSize: 24,
  },
});