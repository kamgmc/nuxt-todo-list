<template>
  <div class="has-background-primary">
    <nav
      class="header is-flex has-background-primary is-justify-content-center is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <b-field position="is-right" type="is-primary">
        <b-autocomplete
          v-model="search"
          rounded
          placeholder="Buscar tarea..."
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
            group="tasks"
            list-name="todoList"
          />
          <list
            title="Completado"
            group="tasks"
            list-name="completedList"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>
<style lang="scss">
@import "assets/styles/main";
.header {
  padding: .75rem .5rem 0;

  .field {
    width: 30%;
    padding: 0 1rem;
    max-width: 760px;

    @include touch {
      width: 100%;
    }

    @include desktop-only {
      width: 45%;
    }

    input {
      border-color: white;
    }
  }
}
</style>
