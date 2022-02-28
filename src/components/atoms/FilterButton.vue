<template>
    <div class="filter-btn">
            <label for="all">
                <input type="radio" name="radio" value="all" id="all" checked="checked"
                @change="$emit('input', 'all')" />
                <span>Mostrar tudo</span>
            </label>
            <label for="food">
                <input type="radio" name="radio" value="food" id="food" 
                @change="$emit('input', 'food')" />
                <span>Comidas</span>
            </label>
            <label for="drink">
                <input type="radio" name="radio" value="drink" id="drink"
                @change="$emit('input', 'drink')" />
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
        position: absolute;
        top: 860px;
        left: 1190px;
        z-index: 1;
        width: 350px;
        margin: 20px auto;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        background-color: #E43636;
    }

    label {
        cursor: pointer;
        color: #fff;        
        padding: 15px 20px;
        border-radius: 8px;
    }

    label span {
        color: #FFF;
    }

    label input:checked + span {
        font-weight: 900;
        font-size: 18px;
    }

    input {
        display: none;
    }

    label:hover {
        background-color: #9a2a2a;
    }
</style>