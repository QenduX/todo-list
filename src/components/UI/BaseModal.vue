<script setup lang="ts">
interface IProps {
    isShow: boolean;
}

defineProps<IProps>();

const emit = defineEmits<{
    (e: 'update:isShow', value: boolean): void
}>()
</script>

<template>
    <div @click="emit('update:isShow', false)" class="modal" :class="isShow ? 'modal--active' : ''">
        <div @click.stop class="modal__wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: all 0.15s ease;
    user-select: none;
    pointer-events: none;

    &--active {
        opacity: 1;
        user-select: auto;
        pointer-events: all;
    }
}
</style>