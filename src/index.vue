<template>
  <section>
    <section
      class="selector-wrapper"
      ref="selector-wrapper"
      :style="{'height':wrapperHeight,'bottom':'-'+wrapperHeight}"
    >
      <section class="title">
        请选择
        <i
          class="iconfont iconcha"
          @click="changeshowDecline(false)"
        ></i>
      </section>
      <section
        class="TimePage"
        :style="dynamicTimeHeight()"
      >
        <TimePage
          :active.sync="curIndex"
          :timeDistance="timeDistance"
          :dataList="selectList"
          @indexChange="indexChange"
        ></TimePage>
      </section>
      <section
        class="List"
        :style="dynamicListHeight()"
      >
        <List
          :curList="curList"
          @changeValue="changeValue"
          :listTitle="listTitle"
          :activeValue="activeValue"
          ref="list"
        >
          <template #list={curList}>
            <slot
              name="list"
              :curList="curList"
              :activeValue="activeValue"
            />
          </template>
        </List>
      </section>
    </section>
    <section
      class="mask"
      v-show="showDecline"
      @click.self="changeshowDecline(false)"
    ></section>
  </section>
</template>
<script>
import TimePage from "./TimePage";
import List from "./List";

export default {
  name: "VueCasCadeSelect",
  props: {
    listTitle: {
      default: "请选择分类",
      type:String
    },
    wrapperHeight: {
      default: "70%",
      type: String
    },
    showDecline: Boolean,
    selectList: Array,
    dataList: Array,
    dataProps: {
      type: Object,
      default() {
        return {
          label: "label",
          value: "value",
          children: "children"
        };
      }
    }
  },
  data() {
    return {
      curIndex: 0,
      firstList: [],
      curList: [],
      timeDistance: 3
    };
  },
  computed: {
    activeValue() {
      return this.selectList[this.curIndex].value;
    },
    //最高显示层级
    maxShow() {
      let len = this.selectList.length - 1;
      for (; len >= 0; len--) {
        if (this.selectList[len].show) {
          break;
        }
      }
      return len;
    }
  },
  components: {
    TimePage,
    List
  },
  methods: {
    refresh() {
      if (this.$refs.list) {
        this.$refs.list.refresh();
      }
    },
    dynamicTimeHeight() {
      return {
        height: `${this.timeDistance * (this.maxShow + 1)}rem`
      };
    },
    dynamicListHeight() {
      this.refresh();
      const calcHeight = 3 + this.timeDistance * (this.maxShow + 1);
      const height = `height:calc(100% - ${calcHeight}rem);`;
      return height;
    },
    //数据回显
    dataDisplay(curIndex) {
      this.curIndex = curIndex;
      this.$nextTick(() => {
        this.curList = this.selectList[curIndex].list;
      });
    },
    //防止与列表 点击改变index 单独拎出来的方法
    indexChange(index) {
      if (index != this.curIndex) {
        this.curList = this.selectList[index].list;
        console.log(this.curList, index);
      }
    },
    //下方列表选择值
    changeValue(item) {
      this.selectList[this.curIndex].value = item.value;
      this.selectList[this.curIndex].label = item.label;

      if (item.children) {
        this.curIndex++;
        //this.$emit("getCurList", item.children);
        this.getCurList(item.children);
        const lastList = JSON.parse(JSON.stringify(this.curList));
        let curSelect = this.selectList[this.curIndex];
        curSelect.list = lastList || [];
        curSelect.show = true;
        curSelect.label = "";
        curSelect.value = "";
        resetPrev.call(this);
      } else {
        //截止选到的子集
        let endIndex = this.curIndex;
        resetPrev.call(this);
        let resObj = {
          data: [],
          _sourceData: JSON.parse(JSON.stringify(this.selectList))
        };
        for (let i = 0; i < endIndex + 1; i++) {
          resObj.data.push({
            label: this.selectList[i].label,
            value: this.selectList[i].value
          });
        }
        this.$emit("endSelect", resObj);
        this.changeshowDecline(false);
        this.reset();
      } //重置之前的 值
      function resetPrev() {
        let removeIndex = this.curIndex + 1;
        while (removeIndex < this.selectList.length) {
          {
            let obj = this.selectList[removeIndex];
            obj.show = false;
            obj.value = "";
            obj.list = [];
            obj.label = "";
            removeIndex++;
          }
        }
      }
    },
    //重置选中值
    reset() {
      this.selectList.forEach(obj => {
        obj.label = "";
        obj.value = "";
        obj.list = [];
        obj.show = false;
      });
      this.selectList[0].show = true;
      let firstList = JSON.parse(JSON.stringify(this.firstList));
      this.selectList[0].list = firstList;
      this.curIndex = 0;
      this.curList = firstList;
    },
    getCurList(array) {
      this.curList = [];
      const { label, value, children } = this.dataProps;
      array.forEach(obj => {
        this.curList.push({
          label: obj[label],
          value: obj[value],
          children: obj[children]
        });
      });
    },
    changeshowDecline(bol) {
      this.$emit("update:showDecline", bol);
    },
    initSelectList() {
      this.selectList.forEach((obj, index) => {
        let cur = this.selectList[index];
        if (index === 0) {
          this.$set(cur, "list", this.firstList);
          this.$set(cur, "show", true);
        } else {
          this.$set(cur, "show", false);
          this.$set(cur, "list", []);
        }
        this.$set(cur, "value", "");
        this.$set(cur, "label", "");
      });
    }
  },
  mounted() {},
  watch: {
    showDecline(val) {
      if (val) {
        this.$refs["selector-wrapper"].style.bottom = "0%";
      } else {
        this.$refs["selector-wrapper"].style.bottom = `-${this.wrapperHeight}`;
      }
    },
    dataList: {
      handler() {
        this.getCurList(this.dataList);
        this.firstList = JSON.parse(JSON.stringify(this.curList));
        if (!this.selectList[0].list) {
          this.initSelectList();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.selector-wrapper {
  position: fixed;
  left: 0;
  //bottom: -65%;
  z-index: 3;
  width: 100%;
  //height: 65%;
  background-color: #fff;
  transition: all 0.4s;
  display: flex;
  flex-wrap: wrap;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  section {
    width: 100%;
  }
  .title {
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    i {
      position: absolute;
      right: 0.5rem;
      font-size: 1.3rem;
    }
  }
  .TimePage {
    box-sizing: border-box;
    padding-top: 1rem;
    //height: 8rem;
    //height: auto;
  }
  .List {
    //height: calc(~"100% - 10rem");
    // position: absolute;
    // height: 100%;
    //flex: 1;
  }
}
.mask {
  .mask();
}
</style>