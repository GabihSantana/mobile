Como eu reestruturaria a tela PokedexScreen

1. Padrão escolhido: MVVM (Model - View - ViewModel)
É um padrão que se beneficia de frameworks e suportam Data Binding (vinculação dos dados)

2. Nova estrutura de arquivos:

POKEDEXAPP
|
|__ View
    |
    |__ PokedexScreenUI.tsx
    |
    |__ PokedexScreenVM.tsx

3. Divisão de responsabilidade:
PokedexScreenUI.tsx: Seria responsável pela parte visual (User Interface). Nele, ficaria o que é retornado ao usuário para realizar a visualização, recebendo os dados do ViewModel, os estados e as funções.

PokedexScreenVM.tsx: Seria responsável pela parte lógica de negócios e o estado da tela. Nele, ficaria a parte os hookes, que poderiam ser encapsulados, e se comunicaria com services para pegar os dados. Ele também poderia ser dividido em mais arquivos, por exemplo, criando um para os hookes, outro para a lógica de negócio, dividindo e definindo bem as resposabilidades entre eles, mas a principal ideia seria essa, ter essa parte de ViewModel para cuidar dessa parte.

4. Fluxo de Dados:
    1. O usuário acessa a Pokedex (PokedexScreenUI) > 2. Realiza a chamada do PokedexScreenVM > 3. O PokedexScreenVM se comunica com o service para pegar os dados dos pokemons e setLoading = True enquanto não é retornado  > 4. O service retorna ao PokedexScreenVM os dados > 5. O PokedexScreenVM retorna para PokedexScreenUI os dados, em caso de sucesso, ou uma mensagem no formato de alerta, caso erro.