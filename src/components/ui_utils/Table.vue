<script setup>
import ctl from "@netlify/classnames-template-literals";
import { convertNumberString } from "../../utils/reportUtils.js";
import { isNumeric } from "../../utils/reportUtils";
</script>
<template>
  <table :class="localStyles.table">
    <thead>
      <tr>
        <th
          v-for="(val, index) in tableHeader"
          :class="[localStyles.th, (index==0)?'rounded-tl-sm':'',(index+1===tableHeader.length)?'rounded-tr-sm !border-r-0':'']"
          :key="'th-' + index"
          v-html="val"
        >
        </th>
      </tr>
    </thead>
    <tbody :class="localStyles.tableBody">
      <tr v-for="(val, index) in tableData" :key="'tr-' + index">
        <td
          v-for="(tdVal, tdIndex) in val"
          :key="'td-' + tdIndex"
          :class="[localStyles.td, isNumeric(tdVal) ? 'text-center' : '', index+1===tableData.length?'font-bold':'', convertNumberString(tdVal)==0&&tdIndex==0?'text-white':'']"
          v-html="(val.length===tdIndex+1)?convertNumberString(tdVal)+'%':convertNumberString(tdVal)"
        >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: null,
    },
    tableHeader: {
      type: Array,
      default: [],
    },
  },

};
const localStyles = {
  table: ctl(`
  w-full
  border-[1px]
  border-[#9995ff]
  border-solid
  border-spacing-0
  border-separate
  text-slate-800
  bg-white
  text-xs`),
  th: ctl(`
    text-left
    sm:px-2
    border-r-[1px]
    border-white-200
    border-solid
    border-t-0
    border-l-0
    border-b-0
    bg-[#9995ff]
    text-white
    text-center
    sm:py-2
    sm:h-12
    `),
  tableBody: ctl(`
    border-[1px]
    border-gray-800
    border-solid
    `),
  td: ctl(`
    text-left
    border-[#9995ff]
    border-solid
    p-1
    sm:p-4
    border-[1px]
    `),
};
</script>
