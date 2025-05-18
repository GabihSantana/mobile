// 🔧 Exercício 5 – Tipagem em componentes e props
// Objetivo: Simular props de componentes com TypeScript.

// Criando uma interface de Botao
interface PropsBotao {
    titulo: string;
    // ? -> opcional, na função é atribuído o valor padrão como true
    ativo?: boolean;
}

// Implementando a função renderizarBotao
const renderizarBotao = ({titulo, ativo = true}: PropsBotao): string => {
    return ativo ? `[ ${titulo}, ${ativo} ]` : `[ ${titulo}, ${ativo} ]`;
}

// Testando a função renderizarBotao
const botao1 = renderizarBotao({titulo: "Botão 1"});
const botao2 = renderizarBotao({titulo: "Botão 2", ativo: false});
console.log(botao1); // [ Botao 1, true ]
console.log(botao2); // [ Botao 2, false ]