<template>
    <input type="text" class="input" v-bind="$attrs" @input="onInput" />
</template>

<script>
export default {
    name: 'Input',
    methods: {
        onInput(event) {
        this.$emit('input', event.target.value);
        }
    },
    inheritAttrs: false
}
</script>

<style>
    .input {
        border: 1px solid #E43636;
        border-radius: 10px;
        padding-left: 19.5px; 
        font: normal normal normal 13.5px/21px Roboto;
    }
</style>