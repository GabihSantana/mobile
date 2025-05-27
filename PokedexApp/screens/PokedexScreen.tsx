import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonsDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

export const PokedexScreen = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const list = await getPokemons(30, offset); // primeiros 30 pokemons com offset
                const details = await Promise.all(list.map(p => getPokemonsDetails(p.url)));

                // adiciona os novos pokemons na lista atual - como um .append
                setPokemons(prev => {
                    const novos = details.filter(p => !prev.some(existing => existing.id === p.id)); // valida se o id do pokemon já foi carregado anteriormente (duplicação)
                    return [...prev, ...novos];
                }); 

            } catch (e){
                setError('Falha ao carregar a Pokédex. Verifique sua conexão.');
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [offset]); // o evento sera chamado toda vez que o offset mudar

    // função quando chega ao fim da flatlist
    const loadMorePokemons = () => {
        if(!isLoading){
            setOffset((prev) => prev + 30);
        }
    };

    const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <TextInput 
                placeholder='Buscar Pokémon...'
                style={styles.input}
                onChangeText={setSearch} />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            {/* Verifica de isLoding é true, se for, exibe o ActivityIndicator, se não, mostra a FlatList */}
            {isLoading && pokemons.length === 0 ? (
                <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
            ) : (
                <FlatList data={filtered} // array de dados que será exibido
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={({item}) => <PokemonCard pokemon={item} /> } 
                    // caso a array (data) estiver vazia, será exibido:
                    ListEmptyComponent={() => (<Text>
                        {search ? `Nenhum Pokémon encontrado para "${search}"` : "Nenhum Pokémon para exibir no momento"}
                    </Text> )}
                    onEndReached={loadMorePokemons} // quando a lista chegar no final, chama a função para carregar mais pokemons
                    // indicador de carregamento no rodapé da lista 
                    ListFooterComponent = {() => isLoading ? <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> : null}
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
    },
});