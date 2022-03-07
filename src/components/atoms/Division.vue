<template>
    <div class="division row">
        <div class="division__left-line col-sm-4 align-self-center"></div>
        <div class="division__text-center col-sm-4"> Veja como será apresentado ao cliente </div>
        <div class="division__right-line col-sm-4 align-self-center"></div>
    </div>   
</template>

<script>
export default {
    name: 'Division'
}
</script>

<style>  
    .division {
        width: 100%;
        margin: 0;
        margin-bottom: 4%;
    }

    .division__left-line,
    .division__right-line {
        border: 1px solid #E43636;
        opacity: 0.5;
        width: 33%;
        margin: 0;
    }

    .division__left-line {
        left: 0;
    }

    .division__right-line {
        left: 0;
    }

    .division__text-center {
        text-align: center;
        font: italic normal bold 2.3rem/29px Roboto;
        color: #A03400;
    }
</style>