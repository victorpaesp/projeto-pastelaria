<template>
    <div class="background-shadow"></div>
</template>

<script>

export default {
    name: 'Background'
}
</script>

<style>
    .background-shadow {
        position: absolute;
        width: 1920px;
        min-height: 100%;
        background: transparent radial-gradient(closest-side at 50% 50%, #FFFFFF 0%, #FFFFFF 67%, #FFFFFF00 100%) 0% 0% no-repeat padding-box;
    }
</style>
