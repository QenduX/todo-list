<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue';
import TodoList from '@/components/TodoList.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import EmptyIcon from '@/components/UI/EmptyIcon.vue';
import TodoForm from '@/components/TodoForm.vue';
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todoStore';

const isShowModal = ref<boolean>(false);
const stateForm = ref<boolean>(false);
const appTheme = ref<string>('day');
const todoStore = useTodoStore();

const onShowModal = (value: boolean) => {
  isShowModal.value = value;
}

const onToggleStateForm = (value: boolean) => {
  stateForm.value = value;
}

const switchTheme = (value:string) => {
  if (value === 'day') {
    appTheme.value = 'night';
    document.body.setAttribute('dark', 'true');
  }
  else {
    appTheme.value = 'day';
    document.body.removeAttribute('dark');
  }
}

onMounted(() => {
    todoStore.fetchTodos();
}) 
</script>

<template>
  <div class="" style="height: 100%; width: 1px;"></div>
  <div class="wrapper">
    <div class="top">
      <h1 class="title">TODO LIST</h1>
    </div>
    <TodoHeader class="header" :theme="appTheme" @switchTheme="switchTheme"></TodoHeader>
    <TodoList 
      v-if="todoStore.checkLoadingPost"
      :items="todoStore.getSearchAndSortedTodos"
      class="list"
      @showModal="onShowModal"
      @stateForm="onToggleStateForm"
    >
    </TodoList>
    <div v-else class="empty">
      <EmptyIcon></EmptyIcon>
      <p class="empty__text">Empty...</p>
    </div>
  </div>
  <BaseButton 
    class="btn__modal"
    :icon="true"
    size="l"
    @click="onShowModal(true)"
  >
    <template v-slot:icon>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </template>
  </BaseButton>
  <BaseModal v-model:isShow="isShowModal">
    <TodoForm 
      @close="onShowModal"
      v-model:stateForm="stateForm"
    >
    </TodoForm>
  </BaseModal>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.top {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.title {
  color: var(--text-black);
  font-size: 26px;
  font-weight: 700;
}

.header {
  margin-top: 18px;
}

.list {
  margin-top: 30px;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;

  &__text {
    font-size: 20px;
    font-weight: 400;
    text-transform: capitalize;
    color: var(--text-black);
    margin-top: 20px;
  }
}

.btn__modal {
  --shift: calc(100vw/2 - 750px/2);
  position: fixed;
  z-index: 2;
  right: var(--shift);
  bottom: 32px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 0 18px var(--purple);
}
</style>
