# vue-select

Vue 移动端 select 组件,适合长 label 级联选择,参考淘宝地址选择

## Demo

[http://122.51.194.65:8089/vueselect](http://122.51.194.65:8089/vueselect)

## Usage

```javasscript
npm install vue-select-hyy

import vueSelect from "vue-select-hyy"
Vue.use(vueSelect)
```

## Attributes

| 参数          | 说明         | 类型    | 可选值     | 默认值                                            | 必填 |
| :------------ | :----------: | ------: | ---------: | ------------------------------------------------: | ---: |
| listTitle     | 列表小标题   | String  | -          | 请选择分类                                        |
| wrapperHeight | 容器高度     | String  | 1%-100%    | 70%                                               |
| showDecline   | 显示隐藏     | Boolean | true/false | -                                                 | √    |
| selectList    | 列表数据集合 | Array   | -          | -                                                 | √    |
| dataList      | 选择值       | Array   | -          | 除placeholder外有默认值                           | √    |
| dataProps     | 键名对应值   | Array   | -          | {label:"label",value:"value",children:"children"} |      |


## Events
| 事件名称  | 说明                       | 回调参数             |
| :-------- | :------------------------: | -------------------: |
| endSelect | 没有下一层级选择完成的回调 | 该次选择值的数组集合 |

## Describe
关于使用的优化及动态数据请求后续更新