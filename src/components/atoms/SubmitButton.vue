<template>
    <button type="submit" class="submit-btn" @click="$emit('sendForm')">CADASTRAR</button>
</template>

<script>
export default {
    name: 'SubmitButton',
}
</script>

<style>
    .submit-btn {
        position: absolute;
        top: 290px;
        left: 588px;
        width: 200px;
        height: 60px;
        background: #FFCA00 0% 0% no-repeat padding-box;
        color: #A03400;
        border: 0;
        border-radius: 30px;
        opacity: 1;
        text-align: center;
        letter-spacing: 0;
        padding-top: 3px;
        font: normal normal 900 21px/26px Roboto;
        cursor: pointer;
    }

    .submit-btn:hover {
        border: 2px solid transparent;
        outline-color: black;
        outline-offset: 15px;
    }
</style>