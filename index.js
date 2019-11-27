/**
 * use reference demo
 * @summary vue select for long label like taobao address
 * @author Hyy
 *
 * Created at     : 2019-11-27 12:47:00
 * Last modified  : 2019-11-27 14:55:30
 */

let VueCasCadeSelect = require("./src/index.vue");
VueCasCadeSelect = VueCasCadeSelect.default || VueCasCadeSelect;

if (typeof window !== "undefined") {
  window.VueCasCadeSelect = VueCasCadeSelect;
}

const select = {
  VueCasCadeSelect: VueCasCadeSelect,
  install: function(Vue) {
    Vue.component(VueCasCadeSelect.name, VueCasCadeSelect);
  }
};

loadIconCss();
function loadIconCss() {
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.href = "//at.alicdn.com/t/font_1516223_7p4oh77g1xu.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  head.appendChild(link);
}

module.exports = select;
