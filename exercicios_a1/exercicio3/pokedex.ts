// Pega o valor da linha de comando
const pokemon = process.argv[2];

// Função principal que irá ser chamada
const fetchPokemonData = async (pokemon: string) => {
  try {
    // Fazendo a requisição para a API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Verifica se a resposta foi ok
    if (!response.ok) {
      throw new Error('Pokémon não encontrado!');
    }

    const data = await response.json();

    // Capitalizando o nome
    const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    // Converte altura e peso
    const alturaMetros = (data.height / 10).toFixed(1); // Converte de decímetros para metros
    const pesoKg = (data.weight / 10).toFixed(1); // Converte de hectogramas para kg
    const tipos = data.types.map((t: any) => t.type.name).join(', ');

    // Exibe o resultado formatado
    console.log(`${capitalizedName} – ${alturaMetros} m – ${pesoKg} kg – ${tipos}`);
  } catch (error) {
    console.log('Erro de rede. Tente novamente.');
  }
}

// Valida se o Pokémon foi informado
if (!pokemon) {
  console.log('Pokemon válido nao informado!');
} else {
  // Executa a função
  fetchPokemonData(pokemon);
}
