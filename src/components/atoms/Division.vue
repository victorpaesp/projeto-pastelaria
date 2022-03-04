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
        top: 150%;
        width: 100%;
        height: 10%;
    }

    .division__left-line,
    .division__right-line {
        position: absolute;
        border: 1px solid #E43636;
        opacity: 0.5;
        width: 50%;
    }

    .division__left-line {
    }

    .division__right-line {
    }

    .division__text-center {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        font: italic normal bold 23.5px/29px Roboto;
        color: #A03400;
    }
</style>