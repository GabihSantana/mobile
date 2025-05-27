// primeiro caractere é convertido para maiúscola e concatenando com o restante da string original
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);