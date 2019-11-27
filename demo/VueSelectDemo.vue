<template>
  <section class="personType-wrapper">
    <section
      class="single-persontype"
      v-for="(item,index) in resList"
      :key="'persontype-'+index"
    >
      <span @click="dataDisplay(item,index)">{{item.data[item.data.length-1].label}}</span>
      <i
        class="iconfont iconcha"
        @click="deleteType(index)"
      ></i>
    </section>
    <div
      class="add-btn"
      @click="showSelector"
    >添加</div>
    <VueCasCadeSelect
      :showDecline.sync="showDecline"
      :select-list="selectList"
      :data-props="dataProps"
      :data-list="dataList"
      @endSelect="endSelect"
      ref="vuecascade-select"
    >
      <!-- custom style -->
      <!-- <template #list={curList,activeValue}>
        <ul>
          <li
            v-for="item in curList"
            :class="{'active':activeValue===item.value}"
            :key="item.name"
            @click="changeValue(item)"
          >{{item.surplus}} - {{item.value}} - {{item.label}}</li>
        </ul>
      </template> -->
    </VueCasCadeSelect>
  </section>
</template>

<script>
export default {
  name: "VueSelectDemo",
  data() {
    return {
      resList: [],
      dataDisplayId: null,
      showDecline: false,
      dataProps: {
        label: "name",
        value: "code",
        children: "son"
      },
      dataList: [
        {
          name: "类别0类别0类别0类别0类别0类别0类别0类别0类别0类别0类别0",
          code: "0",
          surplus: "其它自定义参数",
          son: [
            {
              name: "类别0-0",
              code: "0-0",
              son: [{ name: "类别0-0-0", code: "0-0-0" }]
            },
            {
              name: "类别0-1",
              code: "0-1",
              son: [
                { name: "类别0-1-0", code: "0-1-0" },
                { name: "类别0-1-1", code: "0-1-1" }
              ]
            },
            {
              name: "类别0-2",
              code: "0-2"
            }
          ]
        },
        {
          name: "类别1",
          code: "1",
          son: [
            {
              name: "类别1-0",
              code: "1-0",
              son: [{ name: "类别1-0-0", code: "1-0-0" }]
            },
            {
              name: "类别1-1",
              code: "1-1",
              son: [
                { name: "类别1-1-0", code: "1-1-0" },
                { name: "类别1-1-1", code: "1-1-1" }
              ]
            },
            {
              name: "类别1-2",
              code: "1-2"
            }
          ]
        },
        {
          name: "类别2",
          code: "2"
        }
      ],
      selectList: [
        {
          placeholder: "请选择一级分类"
        },
        {
          placeholder: "请选择二级分类"
        },
        {
          placeholder: "请选择三级分类"
        }
      ]
    };
  },
  methods: {
    changeValue(item) {
      this.$refs["vuecascade-select"].changeValue(item);
    },
    //数据回显
    dataDisplay(data, index) {
      this.dataDisplayId = index;
      this.showDecline = true;
      this.selectList = JSON.parse(JSON.stringify(data._sourceData));
      const curIndex = data.data.length - 1;
      this.$refs["vuecascade-select"].dataDisplay(curIndex);
    },
    deleteType(index) {
      this.resList.splice(index, 1);
    },
    endSelect(resObj) {
      //回显替换数据
      if (this.dataDisplayId || this.dataDisplayId === 0) {
        this.resList.splice(this.dataDisplayId, 1, resObj);
        this.dataDisplayId = null;
      } else {
        //新增
        this.resList.push(resObj);
      }
    },
    showSelector() {
      this.showDecline = true;
      if (this.dataDisplayId || this.dataDisplayId === 0) {
        this.dataDisplayId = null;
        this.$refs["vuecascade-select"].reset();
      }
    }
    // async getDataList() {
    //   let { data, code } = await this.$axios.catchPost("/warnlist/getAllLabel");
    //   this.dataList = data || [];
    // }
  },
  mounted() {
    //this.getDataList();
  }
};
</script>

<style  scoped>
.personType-wrapper {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  padding: 10% 1rem;
}
.personType-wrapper li {
  padding-left: 2rem;
  height: 3rem;
  line-height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.personType-wrapper li.active {
  background: #fff;
  color: #ea4c00;
}
.personType-wrapper .single-persontype {
  box-sizing: border-box;
  max-width: 100%;
  position: relative;
  height: 1.6rem;
  line-height: 1.6rem;
  padding: 0 0.5rem 0 1rem;
  border-radius: 0.8rem;
  background: #a8b4c4;
  color: #fff;
  margin-right: 1rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.personType-wrapper .single-persontype span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.personType-wrapper .single-persontype i {
  text-align: center;
  width: 2rem;
  display: inline-block;
}
.personType-wrapper .add-btn {
  height: 1.6rem;
  line-height: 1.6rem;
  padding: 0 2rem;
  color: #fff;
  background: #3b48ee;
  border-radius: 0.2rem;
}
</style>