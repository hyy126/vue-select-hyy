<template>
  <section class="selector-timepage-wrapper">
    <section
      class="timepage-single"
      :key="item.value+'-'+index"
      v-for="(item,index) in dataList"
      :style="{height:item.show ? timeDistance+'rem' : 0}"
    >
      <div
        class="circle"
        :class="{'active':active===index}"
        v-show="item.show"
      ></div>
      <div
        class="leftLine"
        v-show="showLeftLine(index)"
      ></div>
      <div
        class="name"
        :class="{'active':active===index}"
        @click="toSomeSelect(index)"
        v-show="item.show"
      >{{item.label||item.placeholder}}</div>
    </section>
  </section>
</template>
<script>
export default {
  name: "SelectTimePage",
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    active: {
      type: Number,
      default: 0
    },
    timeDistance: Number
  },
  data() {
    return {};
  },
  methods: {
    showLeftLine(index) {
      const length = this.dataList.length;
      if (index > length - 2) {
        return false;
      }
      const obj = this.dataList[index + 1];
      if (obj.value || obj.show) {
        return true;
      }
    },
    toSomeSelect(index) {
      this.$emit("indexChange", index);
      this.$emit("update:active", index);
    }
  },
  mounted() {}
};
</script>

<style  scoped>
.selector-timepage-wrapper {
  padding-left: 1rem;
}
.selector-timepage-wrapper .timepage-single {
  position: relative;
}
.selector-timepage-wrapper .timepage-single div {
  position: absolute;
}
.selector-timepage-wrapper .timepage-single .name {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  top: -0.6rem;
  height: 1.2rem;
  line-height: 1.2rem;
  left: 2rem;
}
.selector-timepage-wrapper .timepage-single .name.active {
  color: #ea4c00;
}
.selector-timepage-wrapper .timepage-single .leftLine {
  width: 0.1rem;
  background: #ea4c00;
  height: 100%;
  left: -0.05rem;
}
.selector-timepage-wrapper .timepage-single .circle {
  z-index: 2;
  border-radius: 50%;
  left: -0.25rem;
  top: -0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background: #ea4c00;
  border: 1px solid #ea4c00;
  box-sizing: border-box;
}
.selector-timepage-wrapper .timepage-single .circle.active {
  background: #fff;
}
</style>