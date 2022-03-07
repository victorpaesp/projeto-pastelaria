<template>
    <div class="filter-btn">
        <input type="radio" class="test" name="radio" value="all" id="all" checked="checked"
        @change="$emit('input', 'all')" />     
        <label for="all">
            <span>Tudo</span>
        </label>

        <input type="radio" name="radio" value="food" id="food" 
        @change="$emit('input', 'food')" />
        <label for="food">            
            <span>Comidas</span>
        </label>

        <input type="radio" name="radio" value="drink" id="drink"
        @change="$emit('input', 'drink')" />
        <label for="drink">
            <span>Bebidas</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'FilterButton',
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
    .filter-btn {
        width: 20%;
        height: 10%;
        border-radius: 8px;
        display: flex;
        background-color: #E43636;
        margin-bottom: 4%;
    }

    .filter-btn input[type="radio"]:checked + label {
        background-color: #9a2a2a;
    }

    label {
        cursor: pointer;
        color: #fff;        
        padding: 2.5% 3%;
        margin: 1%;
        border-radius: 8px;
        z-index: 5;
        width: 100%;
        text-align: center;
    }

    label span {
        color: #FFF;
        font-size: 1.5rem;
    }

    input {
        display: none;
    }

    label:hover {
        background-color: #9a2a2a;
    }
</style>