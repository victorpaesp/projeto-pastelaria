<template>
    <div>
        <!-- Card principal -->
        <div class="form-card">
            <div class="form-header">
                <p class="text-header">Monte aqui o seu cardápio. O que está esperando?</p> 
                <p class="switch"><ToggleButton @change="triggerToggleEvent" /></p>
            </div>

            <!-- Formulário -->
            <form onsubmit="event.preventDefault();" id="form-pastel" ref="formpastel"> 
                <div class="start-row">
                    <Input id="titulo" name="titulo" v-model="titulo" placeholder="Título do pedido" />
                    <Input id="sabor"  name="sabor"  v-model="sabor"  placeholder="Sabor"/>
                    <Input id="preco"  name="preco"  v-model="preco" v-money="money" /> <div class="reais">R$</div>
                </div>
                <div class="middle-row">
                    <Textarea id="descricao" name="descricao" v-model="descricao" placeholder="Descrição" />
                </div>
                <div class="end-row">              
                    <div class="dropbox">
                        <input type="file" accept="image/*" class="input-file" @change="previewImage" />
                        <p><i class="bi bi-image"></i> <br> Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta.</p>
                    </div>

                    <!-- Carregamento da prévia de como ficará a imagem no card -->
                    <div v-if="imageData!=null">   
                      <br> 
                        <a href="#abrirModal">Prévia</a>       
                        <div class="modal" id="abrirModal"> 
                          <div>
                              <a href="#fechar" title="Fechar" class="fechar">x</a>         
                              <div class="item-modal">
                                  <div class="item-header">
                                      <p class="titulo-pedido">"{{ titulo }}"</p>
                                      <p class="preco-pedido">R$ {{ preco }}</p>
                                  </div>
                                  <div class="imagem-item"><img> </div>
                                  <p class="sabor-pedido">Sabor: {{ sabor }}<span class="pedido-res"></span></p>
                                  <p class="descricao-pedido">Descrição: {{ descricao }}<span class="pedido-res"></span></p>         
                                  <button class="upd" ><i class="bi bi-gear testeta"></i></button>
                                  <button class="del" >x</button>
                              </div>
                              <img class="preview" height="180" width="180" :src="imagem">
                              <br>
                          </div>
                        </div>  
                    </div> 
                </div>
                <ClearButton />
                <SubmitButton @sendForm="createItem" />

                <!-- Erros de campos obrigatórios -->
                <div class="warning" v-if="errors.length">                    
                    <div class="warning__errors"> <i class="bi bi-exclamation-triangle"></i> Os seguintes campos precisam ter valor:
                        <p v-for="error in errors" :key="error">{{ error }}</p> 
                    </div>
                </div>
            </form>
        </div>

        <FilterButton @input="readItem" v-model="filtro"/>

        <!-- Card de item adicionado -->
        <div class="card" v-for="comida of comidasData" :key="comida.id">
            <div class="item">
                <div class="item-header">
                      <p class="titulo-pedido">"{{ comida.titulo }}"</p>
                      <p class="preco-pedido">R$ {{ comida.preco }}</p>
                </div>
                <div>                  
                    <img class="imagem-item" height="100%" width="100%" :src="comida.imgItem"> 
                </div>
                <p class="sabor-pedido">Sabor: <span class="pedido-res">{{ comida.sabor }}</span></p>
                <p class="descricao-pedido">Descrição: <span class="pedido-res">{{ comida.descricao }}</span></p>         
                <button class="upd" @click="editItem(comida.id)"><i class="bi bi-pencil-square testeta"></i></button>

                <!-- Área de edição dos itens -->
                <div class="edit-card" v-if="editar">
                    <input type="text" class="titulo-update" v-model="comida.titulo">
                    <input type="text" class="preco-update" v-model="comida.preco" v-money="money">                
                    <input type="text" class="sabor-update" v-model="comida.sabor">            
                    <input type="text" class="descricao-update" v-model="comida.descricao">
                    <button class="save-btn" @click="saveEdit(comida)">Salvar</button>
                    <button class="cancel-btn" @click="cancelEdit(comida.id)">Cancelar</button>
                </div>
                
                <button class="del" @click="deleteItem(comida.id)">x</button>
            </div>
        </div>
    </div>
</template>

<script>
import ClearButton from '@/components/atoms/ClearButton.vue';
import SubmitButton from '@/components/atoms/SubmitButton.vue';
import Input from '@/components/atoms/Input.vue';
import Textarea from '@/components/atoms/Textarea.vue';
import FilterButton from '@/components/atoms/FilterButton.vue';
import ToggleButton from '@/components/atoms/ToggleButton.vue';
import firebase from "../../firebaseInit";
import {VMoney} from 'v-money'

//--------------- Dados firebase
const db = firebase.firestore();
const storage = firebase.storage();

export default {
    name: 'Formulario',
    data() {
        return {
            // Dados Filtro
            filtro: 'all',
            // Dados Toggle Button
            toggleActive: false,
            itemTipo: 'Comida',
            // Dados Form
            id: '',
            titulo: '',
            sabor: '',
            preco: '',
            descricao: '',
            imgItem: '',
            comidas: [],
            comidasData: [],   
            errors: [],       
            editar: false,
            // Dados do v-money Mask
            money: {
              decimal: ',',
              thousands: '.',
              precision: 2,
              masked: false 
            },
            // Dados img
            imageData: null,
            imagem: ''
        }
    },
    directives: {
      money: VMoney
    },
    components: {
        Input,
        Textarea,
        ClearButton,
        SubmitButton,
        ToggleButton,
        FilterButton
    },
    methods: {

//--------------- Métodos toggle button
        triggerToggleEvent(value) {
          this.toggleActive = value;
          if (value == true) {
            this.itemTipo = 'Bebida';
          } else {
            this.itemTipo = 'Comida';
          }
        },

//--------------- Métodos upload de imagem
        previewImage(event) {
            this.uploadValue = 0;
            this.imagem = null;
            this.imageData = event.target.files[0];
            this.onUpload()
        },
        onUpload() {
            this.imagem = null;
            const storageRef=storage.ref(`${this.imageData.name}`)
            .put(this.imageData);
            storageRef
            .on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, 
                error => {console.log(error.message)},
                    ()=>{this.uploadValue=100;
                            storageRef.snapshot.ref.getDownloadURL()
                            .then((url)=>{
                                this.imagem = url;
                                console.log(this.imagem);
                            });
                        }      
              );
          },

//--------------- Métodos CRUD
        createItem() {
            if (this.titulo && this.sabor && this.preco != '0,00') {
                db.collection("cardapio")
                .add({itemTipo: this.itemTipo, titulo: this.titulo, sabor: this.sabor, preco: this.preco, descricao: this.descricao, imgItem: this.imagem})
                .then(() => {
                    console.log("Item criado");
                    this.readItem();
                })
            }
            this.errors = [];

            if (!this.titulo) {
              this.errors.push('Título do pedido')
            }

            if (!this.sabor) {
              this.errors.push('Sabor')
            }

            if (this.preco == '0,00') {
              this.errors.push('Preço')
            }
        
            this.titulo = "";
            this.sabor = "";
            this.imageData = null;
            this.$refs.formpastel.reset();
        },
        editItem(id) {
            db.collection("cardapio")
              .doc(id)
              .update({
                editar: this.editar
              })
              this.editar = !this.editar;
        }, 
        cancelEdit(id) {
            db.collection("cardapio")
              .doc(id)
              .update({
                editar: !this.editar
              })
              this.editar = !this.editar              
              this.readItem();
        },
        saveEdit(item) {
          const id = item.id
            db.collection("cardapio")
              .doc(id)
              .update({
                titulo: item.titulo,
                sabor: item.sabor,
                preco: item.preco,
                descricao: item.descricao
              })
              .then(() => {
                console.log("Document successfully updated!");
                this.readItem();                
                this.editar = !this.editar  
              })
        },
        deleteItem(id) {
            this.$swal({
                title: 'Tem certeza?',
                text: 'Esta ação não poderá ser desfeita',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                confirmButtonColor: '#E43636',
                cancelButtonText: 'Cancelar',
                showCloseButton: true,
                showLoaderOnConfirm: true
              })
            .then((result) => {
                if(result.value) {
                  db.collection("cardapio")
                  .doc(id)
                  .delete()
                  .then(() => {
                      console.log("Item deletado");
                      this.readItem();
                  })
                } 
            })
        },
        readItem() {
            if (this.imagem == "") {
              this.imagem = 'https://firebasestorage.googleapis.com/v0/b/pastelaria-9dc69.appspot.com/o/no-img.png?alt=media&token=230134a7-2db0-43ee-a445-a129c683a0fd'
            }

            switch (this.filtro) {

                case "all": 
                    this.comidasData = [];
                    db.collection("cardapio")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                            });
                        console.log(doc.id, " => ", doc.data());
                        });
                    })
                    break;

                case "food":
                    this.comidasData = [];
                    db.collection("cardapio").where("itemTipo", "==", "Comida")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                            });
                            console.log(doc.id, " => ", doc.data());
                        });
                    })
                    break;

                case "drink":
                    this.comidasData = [];
                    db.collection("cardapio").where("itemTipo", "==", "Bebida")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                            });
                            console.log(doc.id, " => ", doc.data());
                        });
                    })
                    break;

                default:
                  console.log('Default');
            } 
        },
    },
    created() {
      this.readItem()
    },  
}
</script>

<style>

/*--------------- FORM --------------- */
    #form-pastel {
        position: absolute;
        width: 1140px;
        top: 73.5px;
        left: 20px;
        z-index: 2;
    }

    .start-row {
        display: grid;
        grid-template-columns: 460px 480px 160px;
        grid-column-gap: 20px;
        height: 40px;
    }

    .middle-row {
        width: 100%;
        padding-top: 20px;
    }

    .end-row {
        width: 100%;
        height: 125px;
        padding-top: 15px;
    }

    input::placeholder,
    textarea::placeholder {        
        color: #A03400;
        font: normal normal normal 15.5px/20px Roboto;
    }

    .form-card {
        position: relative;
        top: -203px;
        left: 0;
        width: 1180px;
        height: 392px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 20px;
    }

    .form-header {
        display: flex;
        position: absolute;
        width: 100%;    
        height: 93px;
        background: #FFCA00 0% 0% no-repeat padding-box;
        border-radius: 20px 20px 0px 0px;
    }

    .text-header {
        position: absolute;
        left: 60.5px;
        top: 25px;
        font: italic normal bold 22.5px/31px Roboto;
        letter-spacing: 0.5px;
        z-index: 2;
    }

    .switch {
        position: absolute;
        left: 983px;
        top: 27%;
        font: normal normal normal 17px/21px Roboto;
        letter-spacing: 0px;
        color: #A03400;
        z-index: 2;
    }

    .warning {
      position: absolute;
      top: 365px;
      left: 300px;
      border: 1px solid red;
      padding: 10px;
      border-radius: 10px;
    }

    .warning__errors {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 530px;
      color: red;
      font-weight: bold;
    }

    .warning__errors i {
      position: absolute;
      top: -1px;
      left: -40px;
      font-size: 30px;
      color: red;
    }

/*--------------- CARDS --------------- */
    .card {
        position: relative;
        top: 0;
        left: 0;
        height: 295px;            
    }

    .item {
        position: absolute;
        top: 0;
        left: 475px;
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
        left: 910px;
        font: italic normal bold 24px/37px Roboto;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }

    .sabor-pedido {
        position: absolute;
        top: 103px;
        left: 0;
        text-align: center;
        font: italic normal bold 23px/37px Roboto;
        letter-spacing: 1px;
        color: #A03400;
        opacity: 1;
        padding-left: 110px;
    }

    .pedido-res {
        font-weight: normal;
        font-style: normal;
    }

    .descricao-pedido {
        position: absolute;
        top: 155px;
        left: 0;
        text-align: center;
        font: italic normal bold 23px/37px Roboto;
        letter-spacing: 0px;
        color: #A03400;
        opacity: 1;
        padding-left: 110px;
    }

    .imagem-item {
        position: absolute;
        top: 50%;
        left: -110px;
        transform: translate(0%, -50%);
        width: 180px;
        height: 180px;
        background-color: #FFF;
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 10px;
        opacity: 1;
    }

    .del {
      position: absolute;
      top: 90%;
      left: 98%;
      border: 0;
      border-radius: 5px;
      background-color: #E43636;
      height: 35px;
      width: 35px;
      cursor: pointer;
      color: #fff;
      font-size: 20px;
    }

    .del:hover {     
      border: 1px solid;
      outline-color: black;
      outline-offset: 15px;
    }

    .upd {
      position: absolute;
      top: 90%;
      left: 94%;
      border: 0;
      border-radius: 5px;
      background-color: #a7a7a7;
      height: 35px;
      width: 35px;
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #preco {
      padding-left: 40px;
    }

    .reais {
      position: absolute;
      left: 1000px;
      top: 10px;
    }
    .testeta {
      color: #FFF;
    }

/*--------------- UPDATE CARDS --------------- */

    .titulo-update {
        position: absolute;
        top: 60px;
        left: 110px;
        width: 500px;
    }

    .preco-update {
        position: absolute;
        top: 60px;
        left: 900px;
        width: 170px;
    }

    .sabor-update {
        position: absolute;
        top: 135px;
        left: 110px;
        width: 500px;
    }

    .descricao-update {
        position: absolute;
        top: 190px;
        left: 110px;
        width: 500px;
    }

    .save-btn {
        position: absolute;
        top: 199px;
        left: 920px;
        width: 78px;
        height: 35px;
        background-color: #4CAF50;
        border: 0;
        color: white;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }

    .save-btn:hover {
        background-color: #3e8e41;
    }

    .cancel-btn {
        position: absolute;
        top: 199px;
        left: 1005px;
        width: 79px;
        height: 35px;
        z-index: 10;  
        background-color: #c9c9c9;
        border: 0;
        color: black;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }

    .cancel-btn:hover {
       background-color: #9d9d9d;
    }

    .edit-card input {
        border: 1px solid #E43636;
        border-radius: 6px;
        padding-left: 5px;
        font: normal normal normal 16px/18px Roboto;
    }

/*--------------- INPUT FILE --------------- */
    .dropbox {
        height: 100%;
        border: 1px solid #E43636;
        border-radius: 10px;
        opacity: 1;
        font: normal normal normal 15.7px/21px Roboto;
        display: flex;
        align-items: center;
        color: #A03400;
    }

    .dropbox p {
        text-align: center;
        line-height: 30px;
    }
  
    .input-file {
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

/*--------------- MODAL IMG --------------- */
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: rgba(0,0,0,0.8);
        z-index: 99999;
        opacity:0;
        -webkit-transition: opacity 400ms ease-in;
        -moz-transition: opacity 400ms ease-in;
        transition: opacity 400ms ease-in;
        pointer-events: none;
    }

    .modal:target {
        opacity: 1;
        pointer-events: auto;
    }

    .modal > div {
        width: 1300px;
        height: 300px;
        position: relative;
        margin: 15% auto;
        background: #fff;
    }

    .preview {
        border-radius: 10px;
        position: absolute;
        top: 61px;
        left: 50px;
    }

    .fechar {
        position: absolute;
        width: 30px;
        right: -15px;
        top: -20px;
        text-align: center;
        line-height: 30px;
        margin-top: 5px;
        background: #ff4545;
        border-radius: 50%;
        font-size: 16px;
        color: #8d0000;
    }

    .item-modal {
        position: absolute;
        top: 40px;
        left: 160px;
        width: 1070px;
        height: 221px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 20px;
        opacity: 1;
    }

</style>