<template>
  <div class="vent-tabbar">
    <slot></slot>
    <span class="active-bar" :style="activeBarStyle" ref="ventActiveBar"></span>
  </div>
</template>

<script>
export default {
  name: 'VentTabbar',
  props: {
    value: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      barPosX: 0,
      barSwitching: false
    }
  },
  computed: {
    activeBarStyle () {
      return {
        backgroundColor: this.activeColor,
        transform: `translate3d(${this.barPosX}px, 0, 0)`
      }
    }
  },
  mounted () {
    const barEle = this.$refs.ventActiveBar
    this.calcBarPosX()
    barEle.addEventListener('transitionend', () => {
      this.barSwitching = false
    })
  },
  methods: {
    calcBarPosX () {
      const barEle = this.$refs.ventActiveBar,
        itemEle = this.$children[this.value].$el,
        itemWidth = itemEle.offsetWidth,
        barWidth = barEle.offsetWidth
      this.barPosX = itemEle.offsetLeft + (itemWidth - barWidth) / 2
    }
  },
  watch: {
    value () {
      this.barSwitching = true
      this.calcBarPosX()
    },
    barSwitching (newVal) {
      const barEle = this.$refs.ventActiveBar
      barEle.style.transition = newVal ? `transform 0.3s` : ''
    }
  }
}
</script>

<style lang="scss">
.vent-tabbar {
  position: relative;
  overflow-x: auto;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  height: 44px;
  text-align: center;
  .active-bar {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 26px;
    height: 4px;
    border-radius: 2px;
  }
}
</style>
