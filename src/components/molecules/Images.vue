<template>
  <div class="wave">
    <!--<Parallax /> -->
    <img alt="logo-header" src="@/assets/img/Logo.png" class="logo-header"> 
  <!--  <Pasteis /> -->
  </div>
</template>

<script>
//import Parallax from '@/components/atoms/Parallax.vue'
//import Pasteis from '@/components/atoms/Pasteis.vue'


export default {
    name: 'Images',
    components: {
     //   Parallax,
       // Pasteis
    }
}
</script>

<style scoped>

    .wave {
      position: absolute;
      width: 100%;
      height: 50%;
      background: url('../../assets/img/wave.png') 0% 0% no-repeat padding-box;
      background-size: 100% 100%;
    }

    .logo-header {
      position: absolute;
      left: 27.5%;
      top: 11.5%;
      width: 40%;
      height: 50%;
    }
</style>