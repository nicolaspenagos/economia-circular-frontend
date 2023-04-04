<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div
    v-if="filteredOptions && modal"
    class="absolute h-[10000px] w-[10000px] top-[-1000px] right-[-1000px]"
    @click="this.modal = false"
  ></div>
  <div class="relative">
    <input
      type="text"
      :class="localStyles.input"
      v-model="option"
      autocomplete="off"
      @input="filterOptions"
      @focus="modal = true"
      :placeholder="placeholderMsg"
    />
    <div>
      <img src="v.png" :class="[filteredOptions && modal?'sm:rotate-180':'', localStyles.img]" />
    </div>
  </div>

  <div v-if="filteredOptions && modal" class="z-20">
    <ul :class="localStyles.ul">
      <li
        v-for="(filteredOption, index) in filteredOptions"
        :key="index"
        :class="localStyles.li"
        @click="setOption(filteredOption)"
      >
        {{ filteredOption }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    placeholderMsg: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      option: "",
      filteredOptions: [],
      modal: false,
    };
  },
  methods: {
    filterOptions() {
      this.filteredOptions = this.options.filter((option) => {
        return option.toLowerCase().startsWith(this.option.toLowerCase());
      });
    },
    setOption(filteredOption) {
      console.log(filteredOption);
      this.option = filteredOption;
      this.modal = false;
    },
  },
  mounted() {
    if (this.option.length == 0) this.filteredOptions = this.options;
    this.filterOptions();
  },
  watch: {},
};
const localStyles = {
  input: ctl(`
        w-full
        cutom-text-color
        placeholder-[#0B033C]
        border-b-2
        pb-3
        outline-0
        border-slate-200
        focus:border-indigo-300
        cursor-pointer
        pr-4

        
    `),
  ul: ctl(`
        w-full 
        text-slate-500 
        text-xs 
        shadow-lg 
        absolute 
        bg-white
        max-h-52
        overflow-y-scroll
        rounded-b-lg
        
    `),
  li: ctl(`
        cursor-pointer 
        px-4 
        py-1 
        hover:bg-gray-100
        hover:text-[#0B033C]
        h-16
        text-sm
        flex
        items-center

    `),
  img: ctl(`
    right-0
    top-[-30px]
    absolute
    h-[10px]
    ease-out 
    duration-300
    `),
};
</script>
