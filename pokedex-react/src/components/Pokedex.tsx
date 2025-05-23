import React, { useState, useEffect } from "react";
import "./Pokedex.css";
import "./PokeCard.css"
import { PokemonCard } from "./PokemonCard";

// Definindo o tipo com base no Json para simplificar a implementação
type Pokemon = {
    name: string;
    height: number;
    weight: number;
    sprites:{
        front_default: string | null;
    };
    types: Array<{
        type: { name: string}
    }>;
};

export default function Pokedex() {
    const [nome, setNome] = useState("");
    const [carregando, setCarregando] = useState(false);

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [erro, setErro] = useState("");

    // exibe mensagem no console quando um Pokémon é carregado
    useEffect(() => {
        if (pokemon) {
            const nomeCapitalizado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            console.log(`Pokémon ${nomeCapitalizado} carregado com sucesso!`);
        }
    }, [pokemon]);

    // função para pegar os pokemons via API
    const buscarPokemon = async () => {
        // verifica se o usuário enviou campo vazio
        if (!nome.trim()) return;

        setCarregando(true);
        setErro("");
        setPokemon(null);

        try{
            const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`); 
            if(!resposta.ok) {
                throw new Error("Pokemon não encontrado");
            }
            // convertendo o JSON dizendo ao TS que ele tem formato Pokemon 
            const dados: Pokemon = await resposta.json();
            setPokemon(dados);
        } catch {
            setErro("Pokemon não encontrado");	
        } finally {
            setCarregando(false);
        }
    };
    
    return(
        <div className="pokedex-container">
            <h2 className="pokedex-title">🔎 Pokédex</h2>
            
            <input
                className="pokedex-input"
                type="text"
                placeholder="Digite o nome do Pokemon"
                value={nome}
                /* onChange para sincronizar cada tecla com o estado */
                onChange={(e) => setNome(e.target.value)}
            />
            {/* O botão dispara a função de buscar Pokemon */}
            <button className="pokedex-button" onClick={buscarPokemon}>
                Buscar
            </button>

            {/* Blocos Condicionais */}

            {/* Se carregando for verdadeiro mostra o carregando... */}
            {carregando && <p className="pokedex-loading">Carregando...</p>}

            {/* Se erro, exibir o erro */}
            {erro && <p className="pokedex-error">{erro}</p>}

            {/* Se pokemon estiver preenchido o card é exibido */}
            {pokemon && (
                <>
                    <PokemonCard name={pokemon.name} height={pokemon.height} weight={pokemon.weight} sprites={pokemon.sprites} types={pokemon.types} />
                </>
            )}
                    
        </div>
    );
}