<template>
    <div class="container-fluid">
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
    .container-fluid {   
        position: relative;  
        max-width: 1921px;
        min-height: 100%;
        padding: 0;    
        background: transparent url('../assets/img/patterns/pattern-1.png') 0% 0% padding-box ; 
        z-index: 1;       
    }
</style>