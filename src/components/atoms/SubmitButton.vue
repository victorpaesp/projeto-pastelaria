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
        top: 92.2%;
        left: 51.7%;
        width: 17%;        
        height: 15.2%;
        background: #FFCA00 0% 0% no-repeat padding-box;
        color: #A03400;
        border: 0;
        border-radius: 30px;
        text-align: center;
        letter-spacing: 0;
        padding-top: 3px;
        font: normal normal 900 18px/26px Roboto;
        cursor: pointer;
    }

    .submit-btn:hover {
        border: 2px solid transparent;
        outline-color: black;
        outline-offset: 15px;
    }
</style>