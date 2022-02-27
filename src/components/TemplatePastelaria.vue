<template>
    <div class="app">
        <Background />
        <Formulario />    
    </div>
</template>

<script>
import Background from '@/components/organisms/Background.vue';
import Formulario from '@/components/molecules/Formulario.vue';

export default {
    name: 'TemplatePastelaria',
    components: {
        Background,
        Formulario
  }
}
</script>

<style>
    .app {
        position: relative;
        top: 0px;
        left: 8px;
        width: 1920px;
        background: transparent url('../assets/img/patterns/pattern-1.png') 0% 0% padding-box;
    }
</style>