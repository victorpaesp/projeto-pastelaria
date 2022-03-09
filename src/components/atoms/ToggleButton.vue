<template>
    <label :class="{'active': itemStatus}" class="toggle-btn">
        <span v-if="!itemStatus" class="ativo"> 
            <div class="item-label">
                <i class="fa-solid fa-utensils"></i>
                Comida 
            </div>
        </span>
        <span v-else>
            <div class="item-label">
                <i class="fa-solid fa-utensils"></i>
                Comida
            </div>
        </span>

        <input type="checkbox" v-model="checkedValue">
        <span class="toggle-btn__switch"></span>

        <span v-if="itemStatus" class="ativo">
            <div class="item-label">
                <i class="fa-solid fa-whiskey-glass"></i>
                Bebida 
            </div>
        </span>
        <span v-else>
            <div class="item-label">
                <i class="fa-solid fa-whiskey-glass"></i>
                Bebida
            </div>
        </span>
    </label>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: 'primary'
        }, 
        defaultState: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentState: this.defaultState
        }
    },
    computed: {
        itemStatus() {
            return this.currentState;
        },
        checkedValue: {
            get() {
                return this.currentState;
            },
            set(newValue) {
                this.currentState = newValue;
                this.$emit('change', newValue);
            }
        }
    }
}
</script>

<style scoped>
    label {
        font-weight: 300;
        display: flex;
        text-align: center;
    }

    .toggle-btn {
        cursor: pointer;
    }
    .toggle-btn input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
    }
    .toggle-btn .toggle-btn__switch {
        display: block;
        height: 12px;
        border-radius:6px;
        width: 40px;
        background: #FFFFFF;
        box-shadow: inset 0 0 1px #FFFFFF;
        position: relative;
        margin-left: 10px;
        top: 4px;
    }
    .toggle-btn .toggle-btn__switch::after, 
    .toggle-btn .toggle-btn__switch::before {
        content: "";
        position: absolute;
        display: block;
        height: 150%;
        width: 45%;
        border-radius: 50%;
        left: 0;
        top: -3px;
        transform: translateX(0);
    }
    .toggle-btn .toggle-btn__switch::after {
        background: #E33535;
        box-shadow: 0 0 1px #FFFFFF;
    }
    .toggle-btn .toggle-btn__switch::before {
        background: #E33535;
        box-shadow: 0 0 0 3px #FFFFFF;
        opacity:0;
    }
    .active .toggle-btn__switch {
        background: #FFFFFF;
        box-shadow: inset 0 0 1px #FFFFFF;
    }
    .active .toggle-btn__switch::after {
        left: 23px;
        background: #E33535;
        box-shadow: 0 0 1px #E33535;
    }

    .ativo {
        font-weight: bold;
    }

    @media (max-width: 1440px){
        .toggle-btn__switch {
            margin-right: 10px;
        }
    }

    @media (max-width: 1024px){
        .active .toggle-btn__switch::after {
            height: 18px;
            width: 17px;
            left: 17px;
        }

        .toggle-btn .toggle-btn__switch::after {
            width: 15px;
            height: 17px;
        }        

        .toggle-btn .toggle-btn__switch {
            height: 10px;
            top: 10px;
        }
    }

    @media (max-width: 768px){
        .active .toggle-btn__switch::after {
            height: 18px;
            width: 17px;
            left: 14px;
        }

        .toggle-btn .toggle-btn__switch::after {
            width: 10px;
            height: 10px;
        }        

        .toggle-btn .toggle-btn__switch {
            height: 5px;
            top: 8px;
        }
    }

    @media (max-width: 425px){
        .active .toggle-btn__switch::after {
            height: 18px;
            width: 17px;
            left: 16px;
        }

        .toggle-btn .toggle-btn__switch::after {
            width: 10px;
            height: 10px;
        }        

        .toggle-btn .toggle-btn__switch {
            width: 25px;
            height: 5px;
            top: 0px;
        }
    }
</style>