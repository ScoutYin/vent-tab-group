<template>
  <div class="vent-tab-view-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      ref="viewBox">
    <div class="vent-tab-view"
        :style="viewStyle"
        ref="view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VentTabView',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isTouching: false,
      isMoving: false,
      startX: 0,
      endX: 0,
      currentX: 0,
      moveX: 0,
      viewsWidth: 0
    }
  },
  computed: {
    views () {
      return this.$refs.view
    },
    viewStyle () {
      return {
        width: `${this.viewsWidth}px`,
        transition: this.isTouching ? '' : (this.isMoving ? `transform 0.5s` : ''),
        transform: `translate3d(${this.currentX}px, 0, 0)`
      }
    },
    viewBoxWidth () {
      return this.$refs.viewBox ? this.$refs.viewBox.offsetWidth : 0
    },
    isLeftBoundry () {
      return this.currentX >= 0
    },
    isRightBoundry () {
      return this.currentX <= -this.viewsWidth + this.viewBoxWidth
    }
  },
  mounted () {
    this.viewsWidth = this.$children.length * this.viewBoxWidth
    this.views.addEventListener('transitionend', () => {
      this.isMoving = false
    })
  },
  methods: {
    handleTouchStart (e) {
      this.startX = this.moveX = e.touches[0].clientX
    },
    handleTouchMove (e) {
      if (this.isMoving) return
      const x = e.touches[0].clientX - this.startX
      if ((x < 0 && this.isRightBoundry) || (x > 0 && this.isLeftBoundry)) return
      this.isTouching = true
      this.currentX += x
      this.startX = e.touches[0].clientX
    },
    handleTouchEnd (e) {
      if (!this.isTouching) return
      this.isTouching = false
      this.isMoving = true
      let baseX = this.value * this.viewBoxWidth
      const x = this.currentX + baseX
      const changed = Math.abs(x) > this.viewBoxWidth / 2
      this.currentX = changed ? (x < 0 ? -baseX - this.viewBoxWidth : -baseX + this.viewBoxWidth) : -baseX
      changed && this.$emit('change', x < 0 ? this.value + 1 : this.value - 1)
    }
  },
  watch: {
    value (newVal) {
      if (this.isMoving) return
      this.currentX = -newVal * this.viewBoxWidth
    }
  }
}
</script>

<style lang="scss">
.vent-tab-view-container {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: calc(100vh - 44px);

  .vent-tab-view {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
}

</style>
