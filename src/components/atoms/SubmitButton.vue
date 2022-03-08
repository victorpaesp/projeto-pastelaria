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
        max-height: 56.95px;
        background: #FFCA00 0% 0% no-repeat padding-box;
        color: #A03400;
        border: 0;
        border-radius: 30px;
        text-align: center;
        letter-spacing: 0;
        padding-top: 3px;
        font: normal normal 900 1.5rem/26px Roboto;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .submit-btn:hover {
        border: 2px solid transparent;
        outline-color: black;
        outline-offset: 15px;
    }

    @media (max-width: 768px) {
        .submit-btn {
            top: 95%;
            height: 9%;            
            font-size: 1.5rem;
        }
    }

    @media (max-width: 425px) {
        .submit-btn {
            top: 95.5%;
            height: 7%;            
            font-size: 1.2rem;
        }
    }

    @media (max-width: 375px) {
        .submit-btn {
            top: 95.5%;
            height: 7%;            
            font-size: 1.2rem;
        }
    }

    @media (max-width: 320px) {
        .submit-btn {
            top: 95.5%;
            height: 7%;
            font-size: 1.2rem;
        }
    }
</style>