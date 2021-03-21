import { DialogProgrammatic as Dialog, ToastProgrammatic as Toast } from 'buefy'

export const state = () => {
  return {
    search: '',
    todoList: [
      {
        completed: false,
        content: 'Comprar una nueva laptop'
      },
      {
        completed: false,
        content: 'Subir un nuevo video a Youtube'
      },
      {
        completed: false,
        content: 'Llamar al mecanico'
      },
      {
        completed: false,
        content: 'Reparar el telefono'
      }
    ],
    completedList: [
      {
        completed: true,
        content: 'Estudiar fisica'
      },
      {
        completed: true,
        content: 'Cita con el doctor'
      }
    ]
  }
}

export const getters = {
  filteredTodoList (state) {
    return state.todoList.filter((option) => {
      return option.content
        .toString()
        .toLowerCase()
        .includes(state.search.toLowerCase())
    })
  },
  filteredCompletedList (state) {
    return state.completedList.filter((option) => {
      return option.content
        .toString()
        .toLowerCase()
        .includes(state.search.toLowerCase())
    })
  }
}

export const mutations = {
  //  Create
  createItem (state, { list, item }) {
    state[list].push(item)
    Toast.open('Tarea creada')
  },
  //  Update
  updateItem (state, { list, index, content }) {
    state[list][index].content = content
    Toast.open('Tarea actualizada')
  },
  toggleItemComplete (state, { list, index }) {
    state[list][index].completed = !state[list][index].completed
  },
  updateList (state, { list, value }) {
    state[list] = value
  },
  updateSearch (state, value) {
    state.search = value
  },
  //  Remove
  removeItem (state, { list, index }) {
    state[list].splice(index, 1)
    Toast.open('Tarea eliminada')
  },
  //  Move
  moveToComplete (state, index) {
    const item = state.todoList[index]
    item.completed = true
    state.todoList.splice(index, 1)
    state.completedList.push(item)
  },
  moveToTodo (state, index) {
    const item = state.completedList[index]
    item.completed = false
    state.completedList.splice(index, 1)
    state.todoList.push(item)
  }
}

export const actions = {
  //  Create
  createTask ({ commit }, completed) {
    const list = completed ? 'completedList' : 'todoList'
    Dialog.prompt({
      message: 'Nueva tarea',
      inputAttrs: {
        placeholder: 'e.g. Llamar a RRHH'
      },
      confirmText: 'Agregar',
      cancelText: 'Cancelar',
      trapFocus: true,
      onConfirm: content => commit('createItem', {
        list,
        item: { content, completed }
      })
    })
  },
  //  Update
  updateTask ({ state, commit }, { list, index }) {
    Dialog.prompt({
      message: 'Editar tarea',
      inputAttrs: {
        value: state[list][index].content
      },
      confirmText: 'Guardar',
      cancelText: 'Cancelar',
      trapFocus: true,
      onConfirm: content => commit('updateItem', { list, index, content })
    })
  },
  //  Remove
  removeTask ({ state, commit }, { list, index }) {
    Dialog.confirm({
      title: 'Eliminar tarea',
      message: `<p>¿Desea eliminar la tarea?</p><p>${state[list][index].content}</p>`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      hasIcon: true,
      onConfirm: () => commit('removeItem', { list, index })
    })
  },
  updateTodoList ({ commit }, value) {
    commit('updateList', { list: 'todoList', value })
  },
  updateCompletedList ({ commit }, value) {
    commit('updateList', { list: 'completedList', value })
  }
}
