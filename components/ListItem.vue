<template>
  <div class="panel-block is-block px-1 py-3 item">
    <div class="checkbox-holder">
      <b-checkbox size="is-small" :value="item.completed" @input="$emit('click')"/>
    </div>
    <p class="item-content" :class="{'completed' : item.completed}">
      {{ item.content }}
    </p>
    <div class="item-options">
      <b-tooltip
        size="is-small"
        label="Editar"
      >
        <b-icon
          icon="pencil"
          size="is-small"
          class="has-text-primary"
          @click.native="$emit('edit')"
        />
      </b-tooltip>
      <b-tooltip
        label="Eliminar"
        size="is-small"
        type="is-danger"
      >
        <b-icon
          icon="close"
          size="is-small"
          class="has-text-danger"
          @click.native="$emit('remove')"
        />
      </b-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      checkbox: this.item.completed
    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/main";
.item {
  position: relative;
  padding: 0;
  margin: .75rem 1rem;
  border: 1px solid #ededed;
  border-radius: 6px;
  background-color: $white;
  cursor: grab;

  .checkbox-holder {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -.625rem;
    padding-left: .5rem;
  }

  &-content {
    margin-left: 2rem;
    margin-right: .5rem;

    &.completed {
      color: #A0A0A0;
      text-decoration: line-through;
    }
  }

  &-options {
    position: absolute;
    opacity: 0;
    right: .5rem;
    top: 0;
    transition: 250ms all ease-in-out;

    .icon {
      cursor: pointer;
    }
  }

  &:hover {
    .item-options {
      opacity: 1;
    }
  }
}
</style>
