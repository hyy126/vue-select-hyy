<template>
  <section class="selector-list-wrapper">
    <section class="title">{{listTitle}}</section>
    <BsScroll ref="BsScrollP">
      <section class="single-item-wrapper">
        <slot
          name="list"
          :curList="curList"
        >
          <section
            class="single-item"
            :class="{'active':activeValue===item.value}"
            v-for="item in curList"
            :key="item.code"
            @click="changeValue(item)"
          ><span>{{item.label}}</span>
            <i
              class="iconfont iconcheck"
              v-if="activeValue===item.value"
            ></i>
          </section>
        </slot>
      </section>
    </BsScroll>
  </section>
</template>
<script>
import BsScroll from "./BsScroll";

export default {
  name: "SelectList",
  props: {
    curList: {
      type: Array,
      default() {
        return [];
      }
    },
    listTitle: {
      type: String,
      default: ""
    },
    activeValue: {
      type: String,
      default: ""
    }
  },
  components: {
    BsScroll
  },
  data() {
    return {};
  },
  methods: {
    changeValue(item) {
      this.$emit("changeValue", item);
    },
    refresh() {
      this.$refs.BsScrollP.refresh();
    }
  },
  mounted() {}
};
</script>

<style  scoped>
.selector-list-wrapper {
  background: rgba(237, 237, 237, 0.2);
  height: 100%;
}
.selector-list-wrapper .title {
  color: #ccc;
  font-size: 0.8rem;
  height: 1.6rem;
  line-height: 1.6rem;
  padding-left: 1rem;
}
.selector-list-wrapper .bscroll {
  height: calc(100% - 1.6rem);
  overflow: hidden;
}
.selector-list-wrapper .bscroll .single-item-wrapper {
  min-height: 100.5%;
}
.selector-list-wrapper .bscroll .single-item-wrapper .single-item {
  padding-left: 2rem;
  height: 3rem;
  line-height: 3rem;
  display: flex;
}
.selector-list-wrapper .bscroll .single-item-wrapper .single-item.active {
  background: #fff;
  color: #ea4c00;
}
.selector-list-wrapper .bscroll .single-item-wrapper .single-item span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selector-list-wrapper .bscroll .single-item-wrapper .single-item .iconcheck {
  width: 4rem;
  padding-left: 1rem;
  font-size: 1.3rem;
}
</style>