// 🔧 Exercício 3 – Utility Types (Omit, Partial, Readonly)
// Objetivo: Criar variações seguras de tipos com base em estruturas existentes.

// Criando uma interface Usuario
interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

// Criando novos tipos  
type UsuarioSemSenha = Omit<Usuario, "senha">;
type UsuarioAtualizacao = Partial<Usuario>;

// Implementando duas funções:
function exibirPerfil(u: UsuarioSemSenha): void {
    console.log(`ID: ${u.id}, Nome: ${u.nome}, Email: ${u.email}`);
}

function atualizarUsuario(id: number, dados: UsuarioAtualizacao): void {
    console.log(`Atualizando usuário com ID: ${id}`);

    if(dados.nome) {
        console.log(`Novo nome: ${dados.nome}`);
    } else if(dados.email) {
        console.log(`Novo email: ${dados.email}`);
    } else if(dados.senha) {
        console.log(`Nova senha: ${dados.senha}`);
    }
    else{
        console.log("Dado inválido");
    }
}

// Criando Usuario sem senha
let usuarioSemSenha : UsuarioSemSenha = {
    id: 2,
    nome: "Gabi",
    email: "gabi@hotmail.com"
}

exibirPerfil(usuarioSemSenha);

// Atualizando um usuário
const usuarioAtualizando: UsuarioAtualizacao = {
    nome: "Gabriela"
}

atualizarUsuario(1, usuarioAtualizando);