// 🔧 Exercício 2 – Tipos literais e união de tipos
// Objetivo: Representar múltiplos formatos possíveis para um mesmo tipo de dado.

// Criando 2 tipos:
type Sucesso = { tipo: "sucesso"; dados: string[] };
type Erro = { tipo: "erro"; mensagem: string };
type Resultado = Sucesso | Erro;

// Criando a função que retorna um resultado
const exibirResultado = (r: Resultado): void => {
    if(r.tipo === "sucesso") {
        console.log(`Sucesso: ${r.dados}`);
    }else{
        console.log(`Erro: ${r.mensagem}`);
    }
}

// Criando casos de sucesso e erro
const resultadoSucesso: Resultado = { tipo: "sucesso", dados: ["Info 1", "Info 2"] };
const resultadoErro: Resultado = { tipo: "erro", mensagem: "Erro ao buscar dados" };

// Chamando a função para testar o exercício
exibirResultado(resultadoSucesso);
exibirResultado(resultadoErro);