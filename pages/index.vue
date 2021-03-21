<template>
  <div class="has-background-primary">
    <nav
      class="navbar header has-background-primary is-justify-content-flex-end is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <b-field position="is-right" type="is-primary">
        <b-autocomplete
          v-model="search"
          rounded
          placeholder="e.g. jQuery"
          icon="magnify"
          clearable
        />
      </b-field>
    </nav>
    <div class="container is-fullhd">
      <section class="section">
        <div class="columns is-justify-content-center">
          <list
            title="Pendiente"
            :list="todoList"
            @createItem="createTask(false)"
            @editItem="updateTodoTask"
            @removeItem="removeTodoTask"
            @itemClicked="moveToComplete"
            @added="toggleTodoTask"
          />
          <list
            title="Completado"
            :list="completedList"
            @createItem="createTask(true)"
            @editItem="updateCompletedTask"
            @removeItem="removeCompletedTask"
            @itemClicked="moveToTodo"
            @added="toggleCompletedTask"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import List from '~/components/List'

export default {
  name: 'HomePage',
  components: {
    List
  },
  computed: {
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.commit('updateSearch', value)
      }
    },
    todoList: {
      get () {
        return this.$store.getters.filteredTodoList
      },
      set (value) {
        this.$store.dispatch('updateTodoList', value)
      }
    },
    completedList: {
      get () {
        return this.$store.getters.filteredCompletedList
      },
      set (value) {
        this.$store.dispatch('updateCompletedList', value)
      }
    }
  },
  methods: {
    ...mapMutations(['moveToTodo', 'moveToComplete', 'toggleItemComplete']),
    ...mapActions(['createTask', 'updateTask', 'removeTask']),
    updateTodoTask (index) {
      this.updateTask({ list: 'todoList', index })
    },
    updateCompletedTask (index) {
      this.updateTask({ list: 'completedList', index })
    },
    removeTodoTask (index) {
      this.removeTask({ list: 'todoList', index })
    },
    removeCompletedTask (index) {
      this.removeTask({ list: 'completedList', index })
    },
    toggleTodoTask ($event) {
      if ($event !== undefined) {
        this.toggleItemComplete({ list: 'todoList', index: $event.newIndex })
      }
    },
    toggleCompletedTask ($event) {
      if ($event !== undefined) {
        this.toggleItemComplete({ list: 'completedList', index: $event.newIndex })
      }
    }
  }
}
</script>
<style lang="scss">
.header {
  padding: .75rem .5rem 0;

  .field {
    width: 30%;

    input {
      border-color: white;
    }
  }
}
</style>
