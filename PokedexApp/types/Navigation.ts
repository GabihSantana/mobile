export type RootStackParamList = {
    Pokedex: undefined; // tela Pokedex não recebe parâmetros
    PokemonDetails: { pokemonId: number }; // tela de detalhes recebe o ID do Pokémon como parâm
}