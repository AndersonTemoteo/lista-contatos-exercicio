import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contatos from '../../models/Contatos'

type ContatosState = {
  itens: Contatos[]
}

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      telefone: '11988885555'
    },
    {
      id: 2,
      nome: 'Beltrano',
      email: 'beltrano@gmail.com',
      telefone: '11988884444'
    },
    {
      id: 3,
      nome: 'Cicrano',
      email: 'cicrano@gmail.com',
      telefone: '11988883333'
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contatos) => contatos.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contatos>) => {
      const indexDoContato = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contatos, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe um contato com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]
        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
