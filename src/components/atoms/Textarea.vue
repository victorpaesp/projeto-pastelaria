<template>
    <textarea class="item-description" rows="3" @input="onInput"></textarea>
</template>

<script>
export default {
    name: 'Textarea',
    methods: {
        onInput(event) {
        this.$emit('input', event.target.value);
        }
    }
}
</script>

<style>
  .item-description {
      width: 100%;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      border: 1px solid #E43636;
      border-radius: 10px;
      padding-left: 19.5px;  
      font: normal normal normal 13.5px/18px Roboto;
      padding-top: 10px;
      padding-bottom: 6px;
      resize: none;
}
</style>