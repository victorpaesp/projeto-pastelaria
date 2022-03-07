<template>
    <button type="reset" class="clear-btn" @click="$emit('clearInputs')">LIMPAR</button>
</template>

<script>
export default {
    name: 'ClearButton',
}
</script>

<style>
    .clear-btn {
        position: absolute;
        top: 92.2%;
        left: 31.7%;
        width: 17%;
        height: 15.2%;
        max-height: 56.95px;
        background: #E43636 0% 0% no-repeat padding-box;
        color: #FFFFFF;
        border: 0;
        border-radius: 30px;
        opacity: 1;
        text-align: center;
        letter-spacing: 0;
        padding-top: 3px;
        font: normal normal 900 1.5rem/26px Roboto;
        cursor: pointer;
    }

    .clear-btn:hover {
        border: 2px solid transparent;
        outline-color: black;
        outline-offset: 15px;
    }
</style>