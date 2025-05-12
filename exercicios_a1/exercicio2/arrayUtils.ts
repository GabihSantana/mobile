// como entrada um tipo genérico de array 
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

// Genérico que representa qualquer objeto com chaves do tipo string, retornando um 'agupamento' e um array desse agrupamento
export const groupBy = <T extends Record<string, any>>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((acc: Record<string, T[]>, obj: T) => {
      const groupKey = String(obj[key]); 
      (acc[groupKey] = acc[groupKey] || []).push(obj); 
      return acc; 
    }, {});
};
  
// Genérico para receber qualquer tipo na array e um valor chave, retornando um number
export const sumBy = <T extends Record<string, any>>(arr: T[], key: keyof T): number => {
    return arr.reduce((total, obj) => {
      const value = obj[key]; 
      return total + (typeof value === 'number' ? value : 0); 
    }, 0);
};