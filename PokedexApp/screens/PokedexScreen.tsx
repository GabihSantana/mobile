import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonsDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

export const PokedexScreen = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const list = await getPokemons(30); // primeiros 30 pokemons
                const details = await Promise.all(list.map(p => getPokemonsDetails(p.url)));
                setPokemons(details);
            } catch (e){
                setError("Falha ao carregar a Pokédex. Verifique sua conexão.");
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <TextInput 
                placeholder='Buscar Pokémon...'
                style={styles.input}
                onChangeText={setSearch} />

            {error && <Text style={styles.error}>{error}</Text>}

            {/* Verifica de isLoding é true, se for, exibe o ActivityIndicator, se não, mostra a FlatList */}
            {isLoading ? (
                <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
            ) : (
                <FlatList data={filtered} // array de dados que será exibido
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={({item}) => <PokemonCard pokemon={item} /> } 
                    // caso a array (data) estiver vazia, será exibido:
                    ListEmptyComponent={() => (
                            search ? <Text>Nenhum Pokémon encontrado para {search}</Text> : <Text>Nenhum Pokémon para exibir no momento.</Text>
                            )}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12
    },
    input: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        marginTop: 10,
        color: 'red',
        backgroundColor: '#ffe0e0',
        padding: 8,
        borderRadius: 4,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});