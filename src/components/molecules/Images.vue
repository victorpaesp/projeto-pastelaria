<template>
  <div>
    <Wave />
    <Parallax />
    <Logo />
    <Pasteis />
  </div>
</template>

<script>
import Wave from '@/components/atoms/Wave.vue'
import Logo from '@/components/atoms/Logo.vue'
import Parallax from '@/components/atoms/Parallax.vue'
import Pasteis from '@/components/atoms/Pasteis.vue'


export default {
    name: 'Images',
    components: {
        Wave,
        Logo,
        Parallax,
        Pasteis
    }
}
</script>

<style>

</style>