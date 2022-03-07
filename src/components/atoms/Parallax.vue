<template>  
    <kinesis-container class="parallax-img d-none d-xxl-block">              
        <kinesis-element :strength="12"> 
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
        top: 0%;
        left: 0;
        z-index: 1;
        height: 100vh;
        width: 100%;
    }    

</style>
