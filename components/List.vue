<template>
  <div class="column list">
    <div class="panel has-background-white">
      <div class="panel-heading s-size-4 has-background-white has-text-primary list-header">
        {{ title }}
        <div class="sorting">
          <b-tooltip label="Ordenar" size="is-small">
            <b-icon :icon="sortIcon" @click.native="sortList"/>
          </b-tooltip>
        </div>
      </div>
      <draggable
        v-model="list"
        class="draggable-container"
        ghost-class="ghost"
        :disabled="disabled || searching"
        :group="group"
        :animation="0"
        @change="toggleTask"
      >
        <list-item
          v-for="(item, index) in list"
          :key="`${title}-${index}-${item.content}`"
          :item="item"
          :disabled="disabled || searching"
          @click="moveTask(index)"
          @update="updateTask({list:listName, index})"
          @remove="removeTask({list:listName, index})"
        />
      </draggable>
      <div class="panel-block list-footer">
        <button class="button is-primary is-fullwidth" @click="createTask(listName)">
          <b-icon icon="plus-thick"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ListItem from '~/components/ListItem'

export default {
  components: {
    ListItem,
    Draggable
  },
  props: {
    title: {
      required: true,
      type: String
    },
    group: {
      required: true,
      type: String
    },
    listName: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasBeenSorted: undefined
    }
  },
  computed: {
    isSorted () {
      return this.hasBeenSorted !== undefined ? this.hasBeenSorted : false
    },
    sortIcon () {
      return this.isSorted ? 'order-alphabetical-descending' : 'order-alphabetical-ascending'
    },
    list: {
      get () {
        const getters = this.$store.getters
        return this.listName === 'completedList' ? getters.filteredCompletedList : getters.filteredTodoList
      },
      set (value) {
        this.$store.commit('updateList', { list: this.listName, value })
      }
    },
    ...mapGetters(['searching'])
  },
  methods: {
    sortList () {
      this.$store.commit('sortList', { list: this.listName, isSorted: this.isSorted })
      this.hasBeenSorted = !this.hasBeenSorted
    },
    toggleTask ($event) {
      if ($event.added) {
        this.toggleItemComplete({ list: this.listName, index: $event.added.newIndex })
      }
    },
    moveTask (index) {
      this.listName === 'completedList' ? this.moveToTodo(index) : this.moveToComplete(index)
    },
    ...mapMutations(['moveToComplete', 'moveToTodo', 'toggleItemComplete']),
    ...mapActions(['createTask', 'updateTask', 'removeTask'])
  }
}
</script>

<style lang="scss">
@import "assets/styles/main";

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  cursor: grabbing;
}

.draggable-container {
  min-height: 20px;
}

.list {
  &-header {
    position: relative;
    padding-bottom: .5rem;

    .sorting {
      position: absolute;
      right: 1rem;
      top: 50%;
      margin-top: -9px;
      cursor: pointer;
    }
  }

  &-footer {
    padding: .5rem 1rem 1rem;
  }

  @include tablet {
    max-width: 400px;
  }
}
</style>
