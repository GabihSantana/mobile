import React, { createContext, useState, ReactNode, useContext } from 'react';

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

    // retorna o Provider do contexto, passando o estado e as funções no "value"
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }} >
            {children}
        </FavoritesContext.Provider>
    )
}

// Hook customizado para consumir o contexto de favoritos
export function useFavorites(): FavoritesContextData {
    const context = useContext(FavoritesContext);

    // garante que o hook só seja utilizado dentro de um FavoritesProvider
    if(!context){
        throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
    }

    return context;

}