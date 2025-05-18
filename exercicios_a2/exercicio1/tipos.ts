// 🔧 Exercício 1 – Tipos, interfaces e métodos de array
// Objetivo: Tipar corretamente dados e funções que operam sobre listas.

// crioando a interface Livro
interface Livro{
    titulo : string;
    autor : string;
    ano : number;
    disponivel : boolean;
}

// Criando uma array Livro[] com livros
const biblioteca: Livro[] = [
    {titulo: "1984", autor: "George Orwell", ano: 1949, disponivel: false},
    {titulo: "A Revolução dos Bichos", autor: "George Orwell", ano: 1945, disponivel: true},
    {titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, disponivel: false}
]

// Função com arrow function para listar apenas os títulos (String) dos livros disponíveis
const listarTitulosDisponiveis = (livros: Livro[]): string[] => {
    // usando o filter para filtrar pelos livros disponíveis
    return livros.filter(livro => livro.disponivel === true)
    // map para retornar apenas os títulos
    .map(livro => livro.titulo);
}

// visualizar pelo terminal
console.log(listarTitulosDisponiveis(biblioteca));