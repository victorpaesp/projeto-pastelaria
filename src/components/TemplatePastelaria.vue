<template>
    <div class="container-fluid">
        <div class="app">
            <Background />
            
        </div>
        <div class="app2">
            <Formulario />
        <h1>Teste</h1>  
        <br>
        <br>  
        </div>  
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
        max-width: 1666px;
        padding: 0;    
        background: transparent url('../assets/img/patterns/pattern-1.png') 0% 0% padding-box ;
        
    }
    .app {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        
    }
    .app2 {
        width: 100%;
        height: 100%;
    }

</style>