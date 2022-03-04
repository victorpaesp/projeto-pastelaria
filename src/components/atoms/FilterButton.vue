<template>
    <div class="filter-btn">
            <label for="all">
                <input type="radio" name="radio" value="all" id="all" checked="checked"
                @change="$emit('input', 'all')" />
                <span>Tudo</span>
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
        top: 180%;
        left: 70%;
        z-index: 1;
        width: 30%;
        height: 10%;
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