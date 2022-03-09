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
        font: normal normal 900 1.5rem Roboto;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .clear-btn:hover {
        border: 2px solid transparent;
    }

    @media (max-width: 1024px) {
        .clear-btn {
            top: 94.5%;
            height: 11%;            
            font-size: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        .clear-btn {
            top: 95%;
            height: 9%;            
            font-size: 1.5rem;
        }
    }

    @media (max-width: 425px) {
        .clear-btn {
            top: 95.5%;
            height: 7%;            
            font-size: 1.2rem;
        }
    }

    @media (max-width: 375px) {
        .clear-btn {
            top: 95.5%;
            height: 7%;            
            font-size: 1.2rem;
        }
    }

    @media (max-width: 320px) {
        .clear-btn {
            top: 95.5%;
            height: 7%;            
            font-size: 1.5rem;
        }
    }
</style>