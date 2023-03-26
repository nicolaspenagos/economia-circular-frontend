<template>
<div>
    <label v-if="label">
        {{label}}
    </label>
    <input :placeholder="placeHolder" :class="styles.input" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
</div>
</template>

<script setup>
import ctl from "@netlify/classnames-template-literals";
defineProps({
    placeHolder: {
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
    }
});
const styles = {
    input: ctl(`
        w-full
        cutom-text-color
        placeholder-[#0B033C]
        border-b-2
        pb-3
        outline-0
        border-slate-200
    `),
}
</script>
