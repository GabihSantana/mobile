// export -> permite importar em outro script.

// unique([1,2,2]) → [1,2]
// Cria um array do tipo Set (que não permite valores repetidos)
export const unique = arr => [...new Set(arr)];
    
// groupBy([{tipo:'A'},{tipo:'B'}],'tipo') → {A:[…], B:[…]}
export const groupBy = (arr, key) => // 2 parâmetros: 1 array e a chave
  // reduce acumula os objetos agrupados em um novo objeto
  arr.reduce((acc, obj) => {
    (acc[obj[key]] = acc[obj[key]] || []).push(obj);
    return acc;
  }, {});

// sumBy([{valor:10},{valor:5}], 'valor') → 15
export const sumBy = (arr, key) =>
  // reduce para somar os valores da chave em cada objeto
  arr.reduce((total, obj) => total + (obj[key] ?? 0), 0);