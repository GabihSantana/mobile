// axios -> utilizado para realizar requisições HTTP
import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

// armazena a URL base da PokeAPI
const API_BASE = 'https://pokeapi.co/api/v2';

// recebe um limite e retorna uma promise que resolve para um array de PokemonListItem
export async function getPokemons(limit: number, offset: number): Promise<PokemonListItem[]>{
    // faz um get
    try{
        const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
        // retorna o nome e a URL de detalhes
        return res.data.results;
    }catch(e){
        throw e;
    }
}

export async function getPokemonsDetails(url: string): Promise<Pokemon>{
    // aceita uma url específica de um Pokémon
    try{
        const res = await axios.get(url);
         // mapeia a resposta da API para a estrutura Pokemon, extraindo id, nome, imagem e os tipos
        return {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types.map((t: any) => t.type.name),
        };
    }catch(e){ // se der erro, lança um erro
        throw e;
    }
}