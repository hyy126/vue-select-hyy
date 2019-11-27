<template>
  <section class="bscroll" ref="bscroll">
    <slot></slot>
  </section>
</template>
<script>
import Bscroll from "better-scroll";

export default {
  name: "BsScroll",
  props: {},
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    initBScroll() {
      this.scroll = new Bscroll(this.$refs.bscroll, {
        click: true,
        tap: true
      });
    },
    refresh() {
      this.$nextTick(() => {
        this.scroll && this.scroll.refresh();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBScroll();
    });
  }
};
</script>

<style lang="less" scoped>
</style>