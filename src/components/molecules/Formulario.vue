<template>
    <div class="mainteste">

        <!-- Card -->
        <div class="form-card">

            <!-- Card Header -->
            <div class="row d-flex flex-wrap-reverse">
                <div class="col-sm-9 text-header mb-2">                        
                    Monte aqui o seu cardápio. O que está esperando?                
                </div>
                <div class="col-sm-3 align-self-end" style="text-align: end;">
                    <ToggleButton @change="triggerToggleEvent" />                
                </div>
            </div>


            <!-- Card Form -->
            <form class="testef" onsubmit="event.preventDefault();" ref="formpastel">                

                <div class="row">
                    <div class="col-xl-5 mt-2">
                        <div class="form-group">
                            <Input id="titulo" class="form-control" name="titulo" v-model="titulo" placeholder="Título do pedido" />
                        </div>
                    </div>
                    <div class="col-xl-5 mt-2">        
                        <div class="form-group">
                            <Input id="sabor"  class="form-control" name="sabor"  v-model="sabor"  placeholder="Sabor"/>
                        </div>
                    </div>
                    <div class="col-xl mt-2">
                        <div class="form-group">
                            <Input id="preco"  class="form-control" name="preco" v-model="preco" v-money="money" />
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col">
                        <div class="form-group">
                            <Textarea id="descricao" name="descricao" class="form-control" v-model="descricao" placeholder="Descrição" />
                        </div>
                    </div>                    
                </div>

                <div class="row mt-4">
                    <div class="col">
                        <div class="form-group dropbox" v-if="imageData==null"> 
                            <input type="file" accept="image/*" class="input-file form-control" @change="onUpload" />
                            <p><i class="bi bi-image"></i> <br> Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta.</p>
                        </div> 
                        <div class="form-group dropbox" v-else>                                       
                            <input type="file" accept="image/*" class="input-file form-control" @change="onUpload" />                 
                            <p> <img class="" width="180" height="180" :src="imagem">    <br> <br>             
                            Clique para localizar outra imagem.</p>
                        </div>
                    </div>
                </div>
                <ClearButton @clearInputs="clearForm"/>
                <SubmitButton @sendForm="createItem" />

                
                
            </form>
        </div>


        <!-- Erros de campos obrigatórios -->
        <div class="warning" v-if="errors.length">   Os seguintes campos precisam ter valor:                 
            <div class="warning__errors"> 
                <div class="" v-for="error in errors" :key="error">{{ error }}</div> 
            </div>
        </div>


        <Division />


        <FilterButton @input="readItem" v-model="filtro"/>


        <!-- Card de item adicionado -->
                <div class="no-item" v-if="!comidasData.length">
                    <i class="bi bi-search"></i>
                    <h3>Nenhum item cadastrado</h3>
                </div>

                <div class="card" v-for="comida in comidasData" :key="comida.id">
                    <div class="item">
                        <div class="item-header row d-flex">
                            <p class="titulo-pedido col-sm-9">"{{ comida.titulo }}"</p>
                            <p class="preco-pedido col-sm-3 ">{{ comida.preco }}</p>
                        </div>
                        <div>                  
                            <img class="imagem-item" height="100%" width="100%" :src="comida.imgItem"> 
                        </div>
                        <div class="sabor-pedido row d-flex">
                            <p>Sabor: <span class="pedido-res">{{ comida.sabor }}</span></p>
                        </div>
                        <div class="descricao-pedido row d-flex">
                            <p>Descrição: <span class="pedido-res">{{ comida.descricao }}</span></p>  
                        </div>       
                        <button class="upd" @click="editItem(comida.id)"><i class="bi bi-pencil-square upd-btn"></i></button>

                        <!-- Área de edição dos itens -->
                        <div class="edit-card" v-if="comida.editar == true">
                            <input type="text" class="titulo-update" v-model="comida.titulo">
                            <input type="text" class="preco-update" v-model="comida.preco" v-money="money">                
                            <input type="text" class="sabor-update" v-model="comida.sabor">            
                            <input type="text" class="descricao-update" v-model="comida.descricao">
                            <!-- <div class="dropbox-update">
                                <input type="file" accept="image/*" class="input-update" @change="onUpload" />
                            </div> -->
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
import Division from '@/components/atoms/Division.vue';
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
            comidas: [],
            comidasData: [],   
            errors: [],       
            editar: false,
            // Dados do v-money Mask
            money: {
              decimal: ',',
              thousands: '.',
              prefix: 'R$ ',
              precision: 2,
              masked: false 
            },
            // Dados img
            imageData: null,
            imgItem: '',
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
        FilterButton,
        Division
    },
    methods: {


//--------------- Método de limpeza do formulário        
        clearForm() {
            this.titulo = "",
            this.sabor = "",
            this.preco = "R$ 0,00",
            this.descricao = "",
            this.imageData = null,
            this.imgData = "",

            this.imagem = "", 
            console.log(this.imagem);
            
            console.log(this.imgData);
            
            console.log(this.imageData);
        },

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
        onUpload(e) {
            this.imagem = null;            
            this.imageData = e.target.files[0];
            const storageRef = storage.ref(`${this.imageData.name}`)
            .put(this.imageData);
            storageRef
            .on(`state_changed`, snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, 
                error => {console.log(error.message)},
                    () => {this.uploadValue=100;
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
            if (this.titulo && this.sabor && this.preco != 'R$ 0,00') {
                db.collection("cardapio")
                .add({itemTipo: this.itemTipo, titulo: this.titulo, sabor: this.sabor, preco: this.preco, descricao: this.descricao, imgItem: this.imagem, editar: this.editar})
                .then(() => {
                    this.$swal({
                        icon: 'success',
                        title: 'Item criado!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    console.log("Item criado");
                    this.readItem();
                    this.titulo = "",
                    this.sabor = "",
                    this.imgItem = null,
                    this.imageData = null,
                    this.imagem = '',
                    this.$refs.formpastel.reset();
                    
                })
            }
            this.errors = [];

            if (!this.titulo) {
              this.errors.push('Título do pedido')
            }

            if (!this.sabor) {
              this.errors.push('Sabor')
            }

            if (this.preco == 'R$ 0,00') {
              this.errors.push('Preço')
            }
        
        },
        editItem(id) {
            db.collection("cardapio")
              .doc(id)
              .update({
                editar: true
              })        
              this.readItem()
        }, 
        cancelEdit(id) {
            db.collection("cardapio")
              .doc(id)
              .update({
                editar: false
              })
              this.readItem()
        },
        saveEdit(item) {
            const id = item.id
            db.collection("cardapio")
              .doc(id)
              .update({
                titulo: item.titulo,
                sabor: item.sabor,
                preco: item.preco,
                descricao: item.descricao,
                editar: false
                //imgItem: this.imagem
              })
              .then(() => {        
                this.editar = false 
                this.readItem();        
              })
              
            this.titulo = "";
            this.sabor = "";
            this.imageData = null;
            this.$refs.formpastel.reset();
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
                      this.$swal({
                        icon: 'success',
                        title: 'Item deletado!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                      this.readItem();
                  })
                } 
            })
        },
        readItem() {
            if (this.imagem == "" || this.imgItem == "") {
              this.imagem = 'https://firebasestorage.googleapis.com/v0/b/pastelaria-9dc69.appspot.com/o/no-img.png?alt=media&token=230134a7-2db0-43ee-a445-a129c683a0fd'
            }

            switch (this.filtro) {

                case "all": 
                    this.comidasData = [];
                    db.collection("cardapio")
                    .onSnapshot((querySnapshot) => {
                        this.comidasData = [];
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                                editar: doc.data().editar
                            });
                        console.log(doc.id, " => ", doc.data());
                        });
                    })
                    break;

                case "food":
                    this.comidasData = [];
                    db.collection("cardapio").where("itemTipo", "==", "Comida")
                    .onSnapshot((querySnapshot) => {
                        this.comidasData = [];
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                                editar: doc.data().editar
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
                        this.comidasData = [];
                        querySnapshot.forEach((doc) => {
                            this.comidasData.push({
                                id: doc.id,
                                titulo: doc.data().titulo,
                                sabor: doc.data().sabor,
                                preco: doc.data().preco,
                                descricao: doc.data().descricao,                        
                                imgItem: doc.data().imgItem,
                                itemTipo: doc.data().itemTipo,
                                editar: doc.data().editar
                            });
                            console.log(doc.id, " => ", doc.data());
                        });
                    })
                    break;

                default:
                  console.log('Default');
            } 
        }
    },
    created() {
      this.readItem();
    }
}
</script>

<style>

/*--------------- FORM --------------- */
    .mainteste {
        /* position: relative; */
        left: 0;
        top: 32%;
        width: 100%;
        height: 100%;
    }

    .form-card {
        position: relative; 
        width: 62%;
        min-height: 36%;
        background: linear-gradient(to bottom, #FFCA00 0, #FFCA00 23.8%, #FFF 0, #FFF 75%);
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 20px;
        padding: 1.5% 20px 20px 20px;
        z-index: 1;
        margin-bottom: 3.5%;
    }

    input::placeholder,
    textarea::placeholder {        
        color: #A03400 !important;
        font: normal normal normal 1.4rem/20px Roboto;
    }    

    /* Classe do formulário */
    .testef { 
        padding-top: 0.6%;
        padding-bottom: 2%;
    }

    .text-header {
        padding-left: 4%;
        font: italic normal bold 2rem/2.3rem Roboto;  
    }

    .warning {
        /* position: absolute; */
        top: 110%;
        left: 50%;
        width: 20%;
        border: 1px solid red;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        color: #E43636;
        background-color: white;
        font-weight: bold;        
        margin-bottom: 3.6%;
    }

    /* .warning__errors {
    } */

/*--------------- CARDS --------------- */
    .card {
         /* position: relative;
        top: 800px;
        left: 0;   */
        width: 61.5%;
        height: 31.5%;  
        border: 0;           
        background: transparent radial-gradient(closest-side at 50% 50%, #FFFFFF 0%, #FFFFFF 67%, #FFFFFF00 100%) 0% 0% no-repeat padding-box;
        
    }

    .no-item {
        /* position: absolute; */        
        width: 100%;
        text-align: center;
        color: #cdcdcd;
        padding-bottom: 2%;
        background: transparent radial-gradient(closest-side at 50% 50%, #FFFFFF 0%, #FFFFFF 67%, #FFFFFF00 100%) 0% 0% no-repeat padding-box;
    }

    .no-item i {
        font-size: 5rem;
    }

    .item {
        position: relative;
        left: 11%;
        width: 89%;
        height: 75.5%;        
        background: linear-gradient(to bottom, #E43636 0, #E43636 36%, #FFF 0, #FFF 75%);
        box-shadow: 0px 0px 30px #740B0B45;
        border-radius: 20px;
        opacity: 1;
        margin: 0;
        margin-bottom: 5%;
    }

    .titulo-pedido {
        /* position: absolute; */
        top: 9%;
        font: italic normal bold 3rem/4rem Roboto;
        letter-spacing: 0px;
        color: #FFCA00;
        padding-left: 9%;
        margin-top: 2%;
        margin-bottom: 4.5%;  
        }

    .preco-pedido {
        /* position: absolute; */
        top: 9%;
        left: 86%;
        font: italic normal bold 2.2rem/4rem Roboto;
        letter-spacing: 0px;
        color: #FFFFFF;        
        margin-top: 2%;
        margin-bottom: 4.5%;  
    }

    .sabor-pedido {
        /* position: absolute; */
        top: 103px;
        left: 0;
        font: italic normal bold 2.2rem/4rem Roboto;
        letter-spacing: 1px;
        color: #A03400;
        opacity: 1;
        padding-left: 9%;
    }

    .pedido-res {
        font-weight: normal;
        font-style: normal;
    }

    .descricao-pedido {
        /* position: absolute; */
        top: 155px;
        left: 0;
        font: italic normal bold 2.2rem/4rem Roboto;
        letter-spacing: 0px;
        color: #A03400;
        opacity: 1;
        padding-left: 9%;
        margin-bottom: 1.5%;
    }

    .imagem-item {
        position: absolute;
        top: 50%;
        left: -12.3%;
        transform: translate(0%, -50%);
        width: 20.1%;
        height: auto;
        width: 17.1%;
        height: 79.8%;
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
        height: 15.2%;
        width: 3.3%;
        cursor: pointer;
        color: #fff;
        font-size: 1.5rem;
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
        height: 15.2%;
        width: 3.3%;
        cursor: pointer;
        color: #fff;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upd:hover {
        border: 1px solid;
        outline-color: black;
        outline-offset: 15px;
    }

    #preco {
        color: #A03400 !important;
    }

    .upd-btn {
      color: #FFF;
    }

/*--------------- UPDATE CARDS --------------- */
    .titulo-update {
        position: absolute;
        top: 27%;
        left: 9%;
        width: 30%;
    }

    .preco-update {
        position: absolute;
        top: 27%;
        right: 0;
        width: 20;
    }

    .sabor-update {
        position: absolute;
        top: 63%;
        left: 9%;
        width: 50%;
    }

    .descricao-update {
        position: absolute;
        top: 87%;
        left: 9%;
        width: 50%;
    }

    .input-update {
        opacity: 0;
        position: absolute;
        cursor: pointer;
        width: 180px;
        height: 180px;
    }

    .dropbox-update {   
        position: absolute;
        left: -110px;
        top: 21px;
        cursor: pointer;  
        width: 180px;
        height: 180px;   
        border: 1px solid #E43636;
        border-radius: 10px;
        opacity: 1;
        font: normal normal normal 15.7px/21px Roboto;
        display: flex;
        align-items: center;
        color: #A03400;
    }

    .save-btn {
        position: absolute;
        top: 90%;
        right: 10%;
        width: 11%;
        height: 15.5%;
        background-color: #4CAF50;
        border: 0;
        color: white;
        text-align: center;
        font-size: 1.6rem;
        cursor: pointer;
        border-radius: 5px;
    }

    .save-btn:hover {
        background-color: #3e8e41;
    }

    .cancel-btn {
        position: absolute;
        top: 90%;
        right: -2%;
        width: 11%;
        height: 15.5%;
        z-index: 10;  
        background-color: #c9c9c9;
        border: 0;
        color: black;
        text-align: center;
        font-size: 1.6rem;
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
        position: relative;
        height: 100%;
        border: 1px solid #E43636;
        border-radius: 10px;
        opacity: 1;
        font: normal normal normal 1.4rem/21px Roboto;
        display: flex;
        align-items: center;
        color: #A03400;
    }

    .dropbox p {
        text-align: center;
        line-height: 25px;
        display: block;
        margin-top: 2%;
    }

    .dropbox img {
        border: 0;
        border-radius: 10px;
        background-color: #FFF;
    }
  
    .input-file {
        opacity: 0;
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .bi.bi-image {
        font-size: 5rem;
        color: #E43636;
    }
</style>