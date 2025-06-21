import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@PokedexApp:favorites';

// Definindo a interface (contrato)
interface FavoritesContextData {
    favorites: number[]; // armazena os IDs dos pokemons favoritos
    addFavorite: (pokemonId: number) => void; // adiciona um novo id à lista
    removeFavorite: (pokemonId: number) => void; // remove um id da lista
    isFavorite: (pokemonId: number) => boolean; // verifica se um id já está na lista
}

// Criando o contexto com o contrado e um valor padrão
export const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData); // FavoritesContextData como genérico para create context saber a forma dos dados

// Provider
export const FavoritesProvider = ({ children }: { children: ReactNode}) => {
    // armazena os IDs dos pokémons favoritos
    const [favorites, setFavorites] = useState<number[]>([]);

    // 'loading' para o carregamento inicial
    const [loading, setLoading] = useState(true);

    // efeito para CARREGAR os favoritos do AsyncStorage na inicialização
    useEffect(() => {
        async function loadFavorites(){
            try{
                const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
                if(storedFavorites) { // se há dados
                    setFavorites(JSON.parse(storedFavorites)); // converte de JSON para array
                }
            }catch(e){
                console.error("Falha ao carregar os favoritos do armazenamento.", e);
            } finally{
                setLoading(false);
            }
        }
        loadFavorites();
    }, []); // roda apenas 1 vez quando o provider é montado

    // efeito para SALVAR os favoritos do AsyncStorage sempre que a lista mudar / sempre que o estado favorites muda
    useEffect(() => {
        // Evitamos salvar no primeniro render, antes dos dados serem carregados
        if(!loading){
            async function saveFavorites() {
                try{
                    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); // converte para JSON e salva no disco
                }catch(e){
                    console.error("Falha ao salvar os favoritos no armazenamento.", e);
                }
            }
            saveFavorites();
        }
    }, [favorites, loading]); // O efeito é disparado quando 'favorites' ou 'loading' muda

    // função para adicionar um favorito sem duplicar
    const addFavorite = (pokemonId: number) => {
        if(!favorites.includes(pokemonId)){
            setFavorites(prevFavorites => [...prevFavorites, pokemonId]);
        }
    };

    // função para remover um favorito
    const removeFavorite = (pokemonId: number) => {
        setFavorites(prevFavorites => prevFavorites.filter(id => id !== pokemonId));
    };

    // função para checar se um pokemon é favorito

    const isFavorite = (pokemonId: number) => {
        return favorites.includes(pokemonId);
    };

    // Evita renderizar a aplicação antes que os favoritos sejam carregados
    if (loading) {
        return null;
    }

    // retorna o Provider do contexto, passando o estado e as funções no "value"
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }} >
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook customizado para consumir o contexto de favoritos
export function useFavorites(): FavoritesContextData {
    const context = useContext(FavoritesContext);

    // garante que o hook só seja utilizado dentro de um FavoritesProvider
    if(!context){
        throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
    }
    return context;
}