<template>
    <TemplatePastelaria />
</template>

<script>
import './assets/styles/global.css';
import TemplatePastelaria from './components/TemplatePastelaria.vue'

export default {
    name: 'App',
    components: {
        TemplatePastelaria
    }
}
</script>

<style>
    body, html{
        height: 100%;  
    }
</style>