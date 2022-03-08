<template>
    
      <div> <Gradient />
        <Images />    </div>
</template>

<script>
import Gradient from '@/components/atoms/Gradient.vue';
import Images from '@/components/molecules/Images.vue';

export default {
    name: 'Background',
    components: {
        Gradient,
        Images
    }
}
</script>

<style>
</style>