<template>
  <div class="vent-tab-item"
       @click="handleClick"
       :style="$parent.value === id ? activeStyle : ''">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VentTabItem',
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1,
      activeStyle: {
        color: this.$parent.activeColor
      }
    }
  },
  methods: {
    handleClick () {
      this.$parent.$emit('input', this.id)
    }
  }
}
</script>

<style lang="scss">
.vent-tab-item {
  padding: 10px;
  flex-shrink: 0;
  flex: 1;
}
</style>
