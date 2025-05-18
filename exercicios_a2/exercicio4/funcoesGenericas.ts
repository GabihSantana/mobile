// 🔧 Exercício 4 – Funções genéricas
// Objetivo: Criar funções reutilizáveis fortemente tipadas.

// Criando a função genérica para obter o primeiro elemento da lista
const obterPrimeiro = <T>(lista: T[]): T => {
    if (lista.length === 0) {
        throw new Error("A lista está vazia");
    }
    return lista[0];
}

// Testando a função com diferentes tipos de dados

// Strings
const nomes = ["Ana", "Bia", "Carlos"];
const primeiroAluno = obterPrimeiro(nomes);
console.log(primeiroAluno); // Ana

// Números
const idade = [16, 15, 18];
const primeiraIdade = obterPrimeiro(idade);
console.log(primeiraIdade); // 16

// Tipo personalizado - Produto
interface Produto {
      nome: string;
      preco: number;
}

const produtos: Produto[] = [
    { nome: "Produto 1", preco: 10 },
    { nome: "Produto 2", preco: 20 }
];
const primeiroProduto = obterPrimeiro(produtos);
console.log(primeiroProduto); // { nome: "Produto 1", preco: 10 }