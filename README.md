![](https://portal.alphaedtech.org.br/images/edtech/logo-edtech.webp)

# Back-End

## Módulo 7 - JavaScript - Part 17

### Exercícios de classe 🏫

#### Questão 1
Crie uma página web para exibir a previsão do tempo de uma cidade. A página deve conter:

* Um ‘select’ para seleção de um estado brasileiro;
* Ao selecionar um estado, uma requisição à API de localidades do IBGE deve ser feita, e um segundo ‘select’ deve exibido com as cidades do estado selecionado;
* Ao selecionar uma cidade, devem ser mostradas ao usuário as previsões do tempo para os períodos manhã, tarde e noite do dia atual e dos próximos três dias (dados obtidos a partir de uma requisição à API de previsão do tempo do Instituto Nacional de Meteorologia), com as seguintes informações:
  - data;
  - dia da semana;
  - ícone que represente o tempo;
  - resumo da previsão;
  - temperatura mínima;
  - temperatura máxima.
* Cada requisição às APIs deve ser feita através de uma função que retorne uma ‘Promise’, que devolverá apenas os dados necessários para a mostrar das informações de previsão do tempo na página;
* Caso o retorno de qualquer consulta não retorne o status ‘200’, isto é, os dados não forem devidamente recebidos, a sua função deverá rejeitar (‘reject’) o retorno que deverá ser devidamente tratado exibindo uma mensagem de erro ao usuário.
* As funções async/await não devem ser utilizadas nessa questão.

#### Questão 2
Refaça a questão anterior e reescreva as chamadas à promises, utilizando as funções async/await.

###### tags: `módulo 7` `back-end` `JavaScript`
