<template>
  <div class="vent-tab-view-item"
      :class="{'vent-tab-view-item-cur': id === $parent.value}"
      >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VentTabViewItem',
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  }
}
</script>

<style lang="scss">
.vent-tab-view-item {
  width: 100vw;
  flex-shrink: 0;
}
</style>
