<template>
    <div class="division">
        <div class="division__left-line"></div>
        <div class="division__text-center"> Veja como será apresentado ao cliente </div>
        <div class="division__right-line"></div>
    </div>   
</template>

<script>
export default {
    name: 'Division'
}
</script>

<style>  
    .division {
        position: absolute;
        top: 852px;
    }

    .division__left-line,
    .division__right-line {
        position: absolute;
        width: 705px;
        border: 1px solid #E43636;
        opacity: 0.5;
    }

    .division__left-line {
        left: 0;
    }

    .division__right-line { 
        left: 1215px;
    }

    .division__text-center {
        position: absolute;
        top: -12px;
        left: 755px;
        width: 410px;
        text-align: center;
        font: italic normal bold 23.5px/29px Roboto;
        color: #A03400;
    }
</style>