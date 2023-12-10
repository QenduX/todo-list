<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import { type ITodo } from '@/interfaces';
import { useTodoStore } from '@/stores/todoStore';

interface IProps {
    items: ITodo[];
}

defineProps<IProps>()

const emit = defineEmits<{
    showModal: [show: boolean];
    stateForm: [edit: boolean];
}>()

const todoStore = useTodoStore();

const toggleReady = (item:ITodo) => {
    todoStore.toggleTodoReady(item);
}

const removeItem = (item:ITodo) => {
    todoStore.removeTodo(item);
}

const editItem = (item: ITodo) => {
    todoStore.setInputValue(item.description);
    todoStore.editedTodo = item.id;
    emit('showModal', true);
    emit('stateForm', true);
}
</script>

<template>
    <ul class="list" v-auto-animate>
        <TodoItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @toggle="toggleReady"
            @remove="removeItem"
            @edit="editItem"
        ></TodoItem>
    </ul>
</template>
<style scoped lang="scss">
.list {
    display: flex;
    flex-direction: column;
    padding: 0 115px;
}
</style>