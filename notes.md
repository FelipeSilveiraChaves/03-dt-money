- [Estilos variavel StyledComponents](#estilos-variavel-styledcomponents)
- [Formatando preços e datas](#formatando-preços-e-datas)
- [React Hook form sem ser com input nativo](#react-hook-form-sem-ser-com-input-nativo)
- [Radix](#radix)
  - [React Portal](#react-portal)
- [API](#api)
  - [Buscando dados na API](#buscando-dados-na-api)
  - [Axios](#axios)
    - [Configurando Axios](#configurando-axios)
    - [Utilizando o axios](#utilizando-o-axios)
- [Performace](#performace)
  - [memo](#memo)
    - [ALERTA SOBRE MEMO](#alerta-sobre-memo)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)

# Estilos variavel StyledComponents

```js
import styled, { css } from 'styled-components'


interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`

  background-color: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;


  ${(props) =>
    props.variant === 'green' &&
    css`
      background-color: ${props.theme['green-700']};
    `}
`
```

Tu importa o `CSS` do styled components, com isso tu pode acessar as propriedades do componente e fazer uma condicinal, e na condicional adicionar um `CSS` no componente


# Formatando preços e datas
Intl é uma biblioteca nativa do js que faz formatações, assim conseguimos formatar datas e preços para o Brasil
```tsx
export const dateFormatter = new Intl.DateTimeFormat('pt-br')

export const priceFormatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})
```
utilização:
Importa a variavel de formatação e usa o metodo format no valor que nao esta formatado

```jsx
<strong>{priceFormatter.format(summary.income)}</strong>

{dateFormatter.format(new Date(transaction.created_at))} // new Date pq na API vem como String

```

# React Hook form sem ser com input nativo 

Para usar react hook form com inputs que nao sao nativos do HTML é preciso usar o control, e o Controller;

```jsx
    <Controller
      control={control}
      name="type"
      render={({ field }) => (
        <TransactionType onValueChange={field.onChange} value={field.value}>
          <TransactionTypeButton value="income" variant="income">
            <ArrowCircleUp size={24} />
            Entrada
          </TransactionTypeButton>
          <TransactionTypeButton value="outcome" variant="outcome">
            <ArrowCircleDown size={24} />
            Saída
          </TransactionTypeButton>
        </TransactionType>
      )}
    />
```
ESTUDAR UM POUCO MELHOR NA HORA DE APLICAR. Mas controller é o que faz o react hook form entender, e o render é o que vai aparecer em tela para o controller

# Radix

Radix é uma biblioteca, em que ajuda a fazer coisas de forma acessivel que seriam muito complexas de fazer no html/js puro

```jsx
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoimg from '../../assets/Logo.svg'
import * as Dialog from '@radix-ui/react-dialog'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoimg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <Dialog.Portal></Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
```

## React Portal

```jsx
<Dialog.Portal></Dialog.Portal>
```
O Portal é uma forma de fazer com que elementos sejam renderizados em outro lugar da DOM de forma mais elegante, como no exemplo que demais ali em cima no [#Radix](#radix)

Assim o Dialog nao pertence a DOM do Header pois tem um Portal que faz com que ele tenha sua propia DOM


# API

## Buscando dados na API

Um metodo muito importando é o metodo assincrono fetch nativo do JS, em que tu faz uma requisição para API, ele recebe como argumento o primeiro argumento o endereço da API. Pode ser qualquer verbo HTTP, get, post, put, delete, etc. Mas para isso tem que passar como segundo argumento um objeto de configuração para especificar o método(se nao passar o obejto o metodo sera o get).


```js
 async function loadTransactions() {
    const res = await fetch('http://localhost:3000/transactions')
    const data = await res.json()
    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])
```

## Axios

Axios é basicamente o que sempre será usado, ou na maioria das vezes o que vai ser usado para requisição e quando se lida com API;

### Configurando Axios

cria uma pasta chamada lib, com o arquivo de configuração do axios

```tsx
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000', //toda requisição vai partir desse lugar.
})

```

### Utilizando o axios

essa objeto api é o objeto que será importado do arquivo do axios.

apenas crie uma response e chame a api, com o metodo desejado *(POST DELETE PUT ...etc)*


e o parms é passado como segundo argumento dentro de um objeto de forma muito mais simples do que o fetch nativo do JS
```ts
async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', { params: { q: query } })
    setTransactions(response.data)
  }
```

# Performace

Extensão muito importante para enteder de performace do react é a `react dev Tools`

## memo 
```jsx
Memo é um metodo do react que faz com que um componente React só renderize novamente se houver mudanças nas propriedades do componente.

/**

* Por que que um componente renderiza?
*- Hooks changed (mudou estado, contexto, reducer);
*- Props changed (mudou propriedades);
*- Parent rerendered (componente pai renderizou);

* Qual o fluxo de renderização?

* 1. 0 React recria o HTML da interface daquele componente
* 2. Compara a versão do HTML recriada com a versão anterior
* 3. SE mudou alguma coisa, ele reescreve o HTML na tela

* Memo:
* 0. Hooks changed, Props changed (deep comparison)
* 0.1: Comparar a versão anterior dos hooks e props
* 0.2: SE mudou algo, ele vai permitir a nova renderização
*/


function SearchFormComponent() {
  // CODE...
}

export const SearchForm = memo(SearchFormComponent)

```

### ALERTA SOBRE MEMO

 O fato é que aquela *deep comparison* mencionada no comentário na maioria das vezes ela é mais demorada do que a comparação de HTML pardrão que o react faz para os componentes renderizados, então o memo só é utilizada em componentes muitos massivos e densos, com isso na maioria das vezes **não** será usado

## useMemo

useMemo é literalmente a mesma coisa que o memo só para variavaveis, serve as mesmas regras 

```jsx

const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])
```


## useCallback

a useCallback é bem parecida com o memo, porém ela serve para funções e não componentes, tu usa a useCallback para que as funções não sejam geradas a cada renderização do componente.
Porém tem que tomar cuidado, pois se não colocar de forma correta o array de dependencias a função vai rodar dependendo da situação com informações antigas, ou informações incorretas

```jsx
  const createTransaction = useCallback(async (data: TransactionTypes) => {
    // code...
  }, [])
```