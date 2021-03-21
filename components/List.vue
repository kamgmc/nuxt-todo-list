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
        class="draggable-container"
        :list="list"
        group="tasks"
        ghost-class="ghost"
        :animation="0"
        @change="$emit('added', $event.added)"
      >
        <transition-group type="transition" name="flip-list">
          <list-item
            v-for="(item, index) in list"
            :key="`${title}-${index}-${item.content}`"
            :item="item"
            @click="$emit('itemClicked', index)"
            @edit="$emit('editItem', index)"
            @remove="$emit('removeItem', index)"
          />
        </transition-group>
      </draggable>
      <div class="panel-block list-footer">
        <button class="button is-primary is-fullwidth" @click="$emit('createItem')">
          <b-icon icon="plus-thick"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ListItem from '~/components/ListItem'

export default {
  components: {
    ListItem,
    Draggable
  },
  props: {
    title: {
      required: true,
      default: '',
      type: String
    },
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      sorted: undefined
    }
  },
  computed: {
    isSorted () {
      return this.sorted !== undefined
        ? this.sorted
        : false
    },
    sortIcon () {
      return this.isSorted
        ? 'order-alphabetical-descending'
        : 'order-alphabetical-ascending'
    }
  },
  methods: {
    sortList () {
      if (this.isSorted) {
        this.list.sort((a, b) => a.content < b.content ? 1 : a.content > b.content ? -1 : 0)
      } else {
        this.list.sort((a, b) => a.content < b.content ? -1 : a.content > b.content ? 1 : 0)
      }
      this.sorted = !this.sorted
    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/main";

.flip-list-move {
  transition: transform 0.5s;
}

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
