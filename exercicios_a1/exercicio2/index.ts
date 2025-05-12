import { unique, groupBy, sumBy } from './arrayUtils';

// Unique
console.log("Unique:");
console.log(unique([4,3,1,3,2,4])); // aqui deve retornar 4,3,1,2 -> valores unicos dessa array
console.log(unique(['azul', 'rosa', 'verde', 'rosa'])); // ['azul', 'rosa', 'verde']

// GroupBy
console.log("GroupBy:");

// dado chave e valor em um dicionário, identifico a chave que acontecerá o agrupamento, no caso 'cor'
console.log(groupBy([ {nome: 'Ana', cor: 'Rosa'}, {time: 'Pedro', cor: 'Azul'}, {nome: 'Bia', cor: 'Rosa'} ],'cor'));

// Teste
const animal = [
    {nome: 'Duke', pet: 'Cachorro'},
    {nome: 'Nemo', pet: 'Peixe'},
    {nome: 'Dory', pet: 'Peixe'}
]

// agrupamento pelo tipo de pet:
console.log(groupBy(animal, 'pet'));

// Sumby

console.log('\nSumBy');

const pizzas = [
    {sabor: 'Frango', preço: 40 },
    {sabor: 'Calabresa', preço: 30},
    {sabor: 'Peperoni', preço: 40}
] 

console.log('Valor das pizzas: ' + sumBy(pizzas, 'preço'));

const vendas = [
    { item: 'A', valor: 5 },
    { item: 'B', valor: 5 },
    { item: 'C', valor: 8 },
  ];
console.log('Total de vendas: ' + sumBy(vendas, 'valor'));