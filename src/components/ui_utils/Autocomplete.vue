<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div
    v-if="filteredOptions && modal"
    class="absolute h-[10000px] w-[10000px] top-[-1000px] right-[-1000px]"
    @click="modal = false"
  ></div>
  <div class="relative">
    <input
      type="text"
      :class="localStyles.input + ' ' + classMod()"
      v-model="option"
      autocomplete="off"
      @input="filterOptions"
      @focus="modal = true"
      :placeholder="placeholderMsg"
    />
    <div>
      <img
        src="/v.svg"
        :class="[
          filteredOptions && modal ? 'sm:rotate-180' : '',
          localStyles.img,
        ]"
        draggable="false"
      />
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
  emits: ["update"],
  props: {
    placeholderMsg: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    validData: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      option: "",
      filteredOptions: [],
      modal: false,
      localValidData: false,
    };
  },
  methods: {
    filterOptions() {
      this.filteredOptions = this.options.filter((option) => {
        return option.toLowerCase().startsWith(this.option.toLowerCase());
      });
    },
    setOption(filteredOption) {
      this.option = filteredOption;
      this.modal = false;
    },
    classMod() {
      if (this.localValidData && this.option==="") return "!border-rose-300";
      return "";
    },
  },
  watch: {
    validData(newVal) {
      this.localValidData = newVal;
    },
    option(){
      this.$emit('update',this.option)
    }
  },
  mounted() {
    if (this.option.length == 0) this.filteredOptions = this.options;
    this.filterOptions();
  },
};
const localStyles = {
  input: ctl(`
        w-full
        custom-text-color
        placeholder-[#0B033C]
        border-b-2
        pb-3
        outline-0
        border-slate-200
        focus:border-indigo-300
        cursor-pointer
        pr-4
        placeholder-slate-400 
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
