<template>
  <div class="vent-tab-view-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      ref="ventTabView">
    <slot></slot>
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
      activeIndex: 0,
      isTouching: false,
      isMoving: false,
      startX: 0,
      endX: 0,
      currentX: 0,
      moveX: 0,
      viewWidth: 0,
      transitionValue: `transform 3s`
    }
  },
  computed: {
    prevItem () {
      const prevIndex = this.activeIndex - 1
      return prevIndex >= 0 ? this.$children[prevIndex].$el : false
    },
    nextItem () {
      const nextIndex = this.activeIndex + 1
      return nextIndex <= this.$children.length - 1 ? this.$children[nextIndex].$el : false
    },
    curItem () {
      return this.$children[this.activeIndex].$el
    }
  },
  mounted () {
    this.viewWidth = this.$el.offsetWidth
  },
  methods: {
    handleTouchStart (e) {
      this.startX = this.moveX = e.touches[0].clientX
    },
    handleTouchMove (e) {
      if (this.isMoving) return
      const x = e.touches[0].clientX - this.startX
      if ((x < 0 && !this.nextItem) || (x > 0 && !this.prevItem)) return
      this.isTouching = true
      this.currentX += x
      this.startX = e.touches[0].clientX
    },
    handleTouchEnd (e) {
      if (!this.isTouching) return
      this.isTouching = false
      this.isMoving = true
      if (this.currentX > 0) {
        if (this.currentX >= this.viewWidth / 2) {
          this.currentX = this.viewWidth
          this.$emit('change', this.value - 1)
        } else {
          this.currentX = 0
        }
      }
      if (this.currentX < 0) {
        if (this.currentX <= -this.viewWidth / 2) {
          this.currentX = -this.viewWidth
          this.$emit('change', this.value + 1)
        } else {
          this.currentX = 0
        }
      }
    },
    move (el, x) {
      el.style.transform = `translate3d(${x}px, 0, 0)`
    }
  },
  watch: {
    isTouching (newVal) {
      this.curItem.style.transition = newVal ? '' : this.transitionValue
      if (this.prevItem) {
        this.prevItem.style.transition = newVal ? '' : this.transitionValue
      }
      if (this.nextItem) {
        this.nextItem.style.transition = newVal ? '' : this.transitionValue
      }
    },
    currentX (newX, oldX) {
      this.move(this.curItem, newX)
      if (this.prevItem) {
        if (newX > oldX) {
          this.move(this.prevItem, -this.viewWidth + newX)
        } else {
          this.move(this.prevItem, -this.viewWidth)
        }
      }
      if (this.nextItem) {
        if (newX < oldX) {
          this.move(this.nextItem, this.viewWidth + newX)
        } else {
          this.move(this.nextItem, this.viewWidth)
        }
      }
    },
    value (newVal) {
      this.$children.forEach((item, index) => {
        let x
        if (index === newVal) {
          x = 0
        } else {
          x = index > this.activeIndex ? this.viewWidth : -this.viewWidth
        }
        item.$el.style.transition = this.isMoving ? this.transitionValue : 'transform 0s'
        this.move(item.$el, x)
      })
      this.$nextTick(() => {
        this.activeIndex = newVal
      })
      this.isMoving = false
    }
  }
}
</script>

<style lang="scss">
.vent-tab-view-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: calc(100vh - 44px);
}

</style>
