<template>
  <div class="">
      <Parallax />   
      <img alt="logo-header" src="@/assets/img/wave.png" class="wave"> 
      <img alt="logo-header" src="@/assets/img/Logo.png" class="logo-header">  
      <img alt="pasteis-header" src="@/assets/img/pasteis-img.png" class="pasteis-header d-none d-xxl-block"> 
  </div>
</template>

<script>
import Parallax from '@/components/atoms/Parallax.vue'


export default {
    name: 'Images',
    components: {
        Parallax,
    }
}
</script>

<style scoped>
    .wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    }

    .logo-header {
        /* position: absolute; */
        left: 27.2%;
        top: 11.05%;
        width: 38.4%;
        height: 48.27%;
        display: block;
        padding-top: 3.25%;
        margin-bottom: 1.1%;
        margin-left: 27.7%;
        margin-right: auto;
    }
    
    .pasteis-header {
        position: absolute;
        top: 12.5%;
        left: 62%;
        width: 20%;
    }
</style>