<script setup lang="ts">
import BaseButtonVue from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import { useTodoStore } from '@/stores/todoStore';
interface IProps {
    stateForm: boolean
}

defineProps<IProps>()

const emit = defineEmits<{
    (e: 'close', value: boolean): void;
    (e: 'update:stateForm', value: boolean): void;
}>()

const todoStore = useTodoStore();

function onSubmit(value: string, stateForm:boolean) {
    if (value) {
        stateForm ? todoStore.editTodo() : todoStore.createTodo();
        emit('close', false);
        emit('update:stateForm', false);
    }
}

function onClose(stateForm:boolean) {
    stateForm ? todoStore.inputValue = '' : todoStore.inputValue;
    emit('close', false);
    emit('update:stateForm', false);
}
</script>

<template>
    <form @submit.prevent class="form">
        <p class="form__title" v-text="stateForm ? 'Edit Note' : 'New Note'"></p>
        <BaseInput 
            class="form__input"
            placeholder="Input your note..."
            v-model:value="todoStore.inputValue"
        >
        </BaseInput>
        <div class="form__btns">
            <BaseButtonVue color="secondary" @click="onClose(stateForm)">Cancel</BaseButtonVue>
            <BaseButtonVue @click="onSubmit(todoStore.inputValue, stateForm)" :disabled="todoStore.inputValue ? false : true">Apply</BaseButtonVue>
        </div>
    </form>
</template>


<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    background: var(--bg-white);
    width: 500px;
    height: 290px;
    padding: 18px 30px;
    border-radius: 16px;

    &__title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-black);
        width: 100%;
        text-align: center;
    }

    &__input {
        margin-top: 25px;
    }

    &__btns {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
    }
}
</style>