<template>
    <div class="file">
        <input type="file" accept="image/*" class="file__input" @change="$emit('previewIMG')" />
        <p><i class="bi bi-image"></i> <br> Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta.</p>
    </div>
</template>

<script>
export default {
    name: 'InputFile'
}
</script>

<style>
    .file {
        height: 100%;
        border: 1px solid #E43636;
        border-radius: 10px;
        opacity: 1;
        font: normal normal normal 15.7px/21px Roboto;
        display: flex;
        align-items: center;
        color: #A03400;
    }

    .file p {
        text-align: center;
        line-height: 30px;
    }
  
    .file__input {
        opacity: 0;
        position: absolute;
        cursor: pointer;
        width: 1140px;
        height: 110px;
    }

    .bi.bi-image {
        font-size: 49px;
        color: #E43636;
    }
</style>