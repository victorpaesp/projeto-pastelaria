<template>
        <div class="principal">
            <div class="item">
                <div class="item-header">
                    <p class="titulo-pedido">{{ titulo }}</p>
                    <p class="preco-pedido">{{ preco }}</p>
                </div>
                <div class="imagem-item"></div>
                <p class="sabor-pedido">Sabor: {{ sabor }}</p>
                <p class="descricao-pedido">Descrição: {{ descricao }}</p>
            </div>
        </div>
</template>

<script>

export default {
    name: 'Card',
    props: {
        titulo: String,
        preco: Number,
        sabor: String,
        descricao: String
    }

    
    /*  addItem(e){

          if (this.titulo != null && this.sabor != null && this.preco != null) {
                const res = axios.post(baseURL, { 
                                  id: this.id,
                                  titulo: this.titulo,
                                  sabor: this.sabor,
                                  preco: this.preco,
                                  descricao: this.descricao,
                                  imagem: this.imagem
                              })
      
                this.itens = [...this.itens, res.data];
              }

              this.errors = [];

              if (this.titulo == null || this.titulo == '') {
                this.errors.push('Coloque um título do pedido');
                 e.preventDefault();
              }
              if (this.sabor == null || this.sabor == '') {
                this.errors.push('Coloque o sabor');
                 e.preventDefault();
              }
              if (this.preco == null || this.preco == '') {
                this.errors.push('Coloque o preço');
                 e.preventDefault();
              }
        },
        deleteItem(id) {
            this.$swal({
              title: 'Tem certeza?',
              text: 'Esta ação não poderá ser desfeita',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Cancelar',
              showCloseButton: true,
              showLoaderOnConfirm: true
            }).then((result) => {
              if(result.value) {
                axios.delete(`http://localhost:3000/itens/${id}`);
          } 
        })
        },*/

}
</script>

<style>
    .principal {
        position: relative;
        top: 270px;
        left: 60px;
        height: 270px;      
    }

    .item {
        position: absolute;
        top: 0;
        left: 420px;
        width: 1070px;
        height: 221px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 20px;
        opacity: 1;
    }

    .item-header {
        display: flex;
        width: 100%;
        height: 80px;
        background: #E43636 0% 0% no-repeat padding-box;
        border-radius: 20px 20px 0px 0px;
        opacity: 1;
    }

    .titulo-pedido {
        position: absolute;
        top: 20px;
        font: italic normal bold 30px/37px Roboto;
        letter-spacing: 0px;
        color: #FFCA00;
        opacity: 1;
        padding-left: 110px;
    }

    .preco-pedido {
        position: absolute;
        top: 20px;
        left: 950px;
        font: italic normal bold 30px/37px Roboto;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }

    .sabor-pedido {
        position: absolute;
        top: 99px;
        left: 0;
        text-align: center;
        font: italic normal bold 30px/37px Roboto;
        letter-spacing: 0px;
        color: #A03400;
        opacity: 1;
        padding-left: 110px;
    }

    .descricao-pedido {
        position: absolute;
        top: 150px;
        left: 0;
        text-align: center;
        font: italic normal bold 30px/37px Roboto;
        letter-spacing: 0px;
        color: #A03400;
        opacity: 1;
        padding-left: 110px;
    }

    .imagem-item {
        position: absolute;
        top: -25px;
        left: -155px;
        width: 100%;
        height: 120%;
        background: transparent url('./pastel-img.png') 0% 0% no-repeat padding-box;
        opacity: 1;
    }
</style>