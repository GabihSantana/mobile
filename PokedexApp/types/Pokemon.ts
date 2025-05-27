// define a estrutura de dados

export interface PokemonListItem{
    name: string;
    url: string;
}

export interface Pokemon{
    id: number;
    name: string;
    image: string;
    types: string[];
}