<script setup lang="ts">
import { type ITodo } from '@/interfaces';

defineProps<{
    item: ITodo;
}>()

const emit = defineEmits<{
    toggle: [item: ITodo];
    remove: [item: ITodo];
    edit: [item: ITodo];
}>()
</script>

<template>
    <li class="item">
        <span 
            class="item__checkbox" 
            :class="item.isReady ? 'item__checkbox--active' : ''"
            @click="emit('toggle', item)"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M12.3333 1L4.99996 8.33333L1.66663 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        <p 
            class="item__text"
            :class="item.isReady ? 'item__text--active' : ''" 
        >
            {{ item.description }}
        </p>
        <div class="item__block">
            <svg @click="emit('edit', item)" class="item__edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg @click="emit('remove', item)" class="item__remove" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
                <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
                <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
            </svg>
        </div>
    </li>
</template>


<style scoped lang="scss">

.item {
    display: flex;
    align-items: flex-start;
    padding: 17px 0;
    border-top: 1px solid var(--border);

    &:first-child {
        border-top: none;
    }

    &:hover {
        .item__block {
            opacity: 1;
        }
    }

    &__checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 26px;
        height: 26px;
        margin-right: 16px;
        border-radius: 2px;
        border: 1px solid var(--border);
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;

        svg {
            opacity: 0;
            transition: all 0.3s ease;
        }

        &:hover {
            border: 1px solid var(--purple-dark);
        } 

        &--active {
            background: var(--purple);

            svg {
                opacity: 1;
            }

            &:hover {
                background: var(--purple-dark);
            }
        }
    }

    &__text {
        align-self: center;
        color: var(--black);
        width: 100%;

        &--active {
            text-decoration: line-through;
            opacity: 0.5;
        }
    }

    &__block {
        flex-shrink: 0;
        display: grid;
        align-content: center;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-left: 10px;
        opacity: 0;
        user-select: none;
        transition: all 0.2s ease;
    }

    &__edit {
        cursor: pointer;

        path {
            transition: all 0.2s ease;
        }

        &:hover {
            path {
                stroke: var(--purple);
            }
        }
    }

    &__remove {
        cursor: pointer;

        path {
            transition: all 0.2s ease;
        }

        &:hover {
            path {
                stroke: var(--red);
            }
        }
    }
}
</style>