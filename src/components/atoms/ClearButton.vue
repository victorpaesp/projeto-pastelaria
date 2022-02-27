<template>
    <button type="reset" class="clear-btn">LIMPAR</button>
</template>

<script>
export default {
    name: 'ClearButton',
}
</script>

<style>
    .clear-btn {
        position: absolute;
        top: 290px;
        left: 353px;
        width: 200px;
        height: 60px;
        background: #E43636 0% 0% no-repeat padding-box;
        color: #FFFFFF;
        border: 0;
        border-radius: 30px;
        opacity: 1;
        text-align: center;
        letter-spacing: 0;
        padding-top: 3px;
        font: normal normal 900 21px/26px Roboto;
        cursor: pointer;
    }

    .clear-btn:hover {
        border: 2px solid transparent;
        outline-color: black;
        outline-offset: 15px;
    }
</style>