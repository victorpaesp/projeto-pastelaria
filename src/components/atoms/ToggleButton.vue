<template>
    <label :class="{'active': itemComida}" class="toggle-btn">
        <span v-if="!itemComida" class="ativo">Comida</span>
        <span v-else>Comida</span>

        <input type="checkbox" v-model="checkedValue">
        <span class="toggle-btn__switch"></span>

        <span v-if="itemComida" class="ativo">Bebida</span>
        <span v-else>Bebida</span>
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
        itemComida() {
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
    .toggle-btn {
        vertical-align: middle;
        user-select: none;
        cursor: pointer;
    }
    .toggle-btn input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
    }
    .toggle-btn .toggle-btn__switch {
        display:inline-block;
        height:12px;
        border-radius:6px;
        width:40px;
        background: #FFFFFF;
        box-shadow: inset 0 0 1px #FFFFFF;
        position:relative;
        margin-left: 10px;
        transition: all .25s;
    }
    .toggle-btn .toggle-btn__switch::after, 
    .toggle-btn .toggle-btn__switch::before {
        content: "";
        position: absolute;
        display: block;
        height: 18px;
        width: 18px;
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
    .active .toggle-btn__switch::after,
    .active .toggle-btn__switch::before{
        transform:translateX(40px - 18px);
    }
    .active .toggle-btn__switch::after {
        left: 23px;
        background: #E33535;
        box-shadow: 0 0 1px #E33535;
    }
    .toggle-btn__switch {
        margin-right: 10px;
    }

    .ativo {
        font-weight: 900;
    }
</style>