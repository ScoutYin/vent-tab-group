<template>
  <div class="vent-tab-wrapper">
    <vent-tabbar v-model="activeIndex">
      <vent-tab-item>item 1</vent-tab-item>
      <vent-tab-item>item 2</vent-tab-item>
      <vent-tab-item>item 3</vent-tab-item>
      <vent-tab-item>item 4</vent-tab-item>
    </vent-tabbar>
    <vent-tab-view :value="activeIndex" @change="activeIndex = arguments[0]">
      <vent-tab-view-item class="view-item view-item-1">view 1</vent-tab-view-item>
      <vent-tab-view-item class="view-item view-item-2">view 2</vent-tab-view-item>
      <vent-tab-view-item class="view-item view-item-3">view 3</vent-tab-view-item>
      <vent-tab-view-item class="view-item view-item-4">view 4</vent-tab-view-item>
    </vent-tab-view>
  </div>
</template>

<script>
import VentTabbar from '@/components/tabbar/tabbar'
import VentTabItem from '@/components/tabbar/tab-item'
import VentTabView from '@/components/tab-view/view-container'
import VentTabViewItem from '@/components/tab-view/view-item'

export default {
  name: 'home',
  components: {
    VentTabbar,
    VentTabItem,
    VentTabView,
    VentTabViewItem
  },
  data () {
    return {
      activeIndex: 0,
      activeBarX: 0
    }
  }
}
</script>

<style lang="scss">
.view-item {
  height: 100%;
}
.view-item-1 {
  background-color: green;
}
.view-item-2 {
  background-color: red;
}
.view-item-3 {
  background-color: #111;
}
.view-item-4 {
  background-color: yellow;
}
</style>
