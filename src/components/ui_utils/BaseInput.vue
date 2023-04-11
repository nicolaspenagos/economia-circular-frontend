<template>
<div>
    <label v-if="label">
        {{label}}
    </label>
    <input :placeholder="placeholder" :class="styles.input + ' ' +classMod" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
</div>
</template>

<script setup>
import ctl from "@netlify/classnames-template-literals";
defineProps({
    placeholder: {
        type: String,
        default: ""
    },
    label: {
        type: [String, Boolean],
        default: false
    },
    modelValue: {
        type: String,
        default: ""
    },
    classMod:{
        type:String,
        default:""
    }
});
const styles = {
    input: ctl(`
        w-full
        custom-text-color
        placeholder-slate-400
        border-b-2
        pb-3
        outline-0
        border-slate-200
        focus:border-indigo-300
    `),
}
</script>

