<script setup lang="ts">
interface IProps {
    color?: 'primary' | 'secondary';
    size?: 'm' | 'l';
    disabled?: boolean;
    icon?: boolean;
}

const props = defineProps<IProps>();
const { 
    color = 'primary', 
    size = 'm', 
    icon = false
} = props;

const classes = ['btn', `btn__color-${color}`, `btn__size-${size}`, `${icon ? 'btn__icon' : ''}`];
</script>
<template>
    <button 
        class="btn"
        :class="classes"
        :disabled="disabled"
    >
        <slot></slot>
        <slot name="icon">
        </slot> 
    </button>
</template>
<style scoped lang="scss">
.btn {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
        pointer-events: none;
        opacity: 0.7;
    }

    &__color {
        &-primary {
            color: var(--text-white);
            background: var(--purple);
            border: 1px solid var(--purple);

            
            &:hover {
                background: var(--purple-dark);
                border: 1px solid var(--purple-dark);
                box-shadow: 0 0 18px -6px var(--purple);
            }
        }

        &-secondary {
            color: var(--purple);
            background: var(--bg-white);
            border: 1px solid var(--purple);

            &:hover {
                color: var(--purple-dark);
                background: var(--bg-white);
                border: 1px solid var(--purple-dark);
                box-shadow: 0 0 18px -6px var(--purple);
            }
        }
    }

    &__size {
        &-m {
            height: 38px;
            padding: 10px 22px;
        }

        &-l {
            height: 50px;
            padding: 10px 22px;
        }
    }

    &__icon {
        padding: 6px;
    }
}
</style>