<template>  
    <kinesis-container class="parallax-img">              
        <kinesis-element :strength="15" axis="y"> 
            <div>
                <img class="parallax-header" alt="parallax-header" src="@/assets/img/pastel-paralax.png">
            </div>
        </kinesis-element>      
    </kinesis-container>
</template>

<script>
export default {
    name: 'Parallax'
}
</script>

<style scoped>  

    .parallax-img {
        position: absolute;
        top: -350px;
        left: -350px;
        z-index: -1;
        height: 100vh;
        width: 100%;
    }

    @media (min-width: 1800px) {
        .parallax-img {
            display: block;
        }
    }

    @media (max-width: 1799px) {
        .parallax-img {
            display: none;
        }
    }
</style>
