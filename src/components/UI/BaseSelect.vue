<script setup lang="ts">
import { ref } from "vue";
import { type IOption } from '@/interfaces';

defineProps<{
  options:IOption[];
  sortedValue:IOption;
}>()

const isShowOptions = ref(false);

function onToggleOptions() {
  isShowOptions.value = !isShowOptions.value;
}

function hideOptions() {
  isShowOptions.value = false;
}

const emit = defineEmits<{
  update: [value: IOption]
}>()
</script>

<template>
  <div class="select" v-click-outside="{toggle: hideOptions}">
    <button class="select__btn" :class="isShowOptions ? 'select__btn--active' : ''" @click="onToggleOptions">
      <span class="select__btn-text">{{sortedValue.title}}</span>
      <svg class="select__btn-icon" :class="isShowOptions ? 'select__btn-icon--active' : ''" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 8 5" fill="none">
        <path d="M4 4L1 1" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 1L4 4" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <ul class="select__list" :class="isShowOptions? 'select__list--active' : ''">
      <li 
        class="select__item" 
        v-for="option in options" 
        :key="option.value"
        @click="emit('update', option), hideOptions()"
      >
        {{option.title}}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;
  z-index: 1;

  &__btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--white);
    background: var(--purple);
    min-width: 100px;
    height: 38px;
    padding: 10px;
    border: 2px solid var(--purple);
    border-radius: 5px;
    box-shadow: 0 0 4px 0 var(--purple);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--purple-dark);
      border: 2px solid var(--purple-dark);
      box-shadow: unset;
    }

    &--active {
      background: var(--purple-dark);
      border: 2px solid var(--purple);
    }

    &-text {
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &-icon {
      margin-left: 8px;
      transition: all 0.2s ease;

      &--active {
        transform: rotate(180deg);
      }
    }
  }

  &__list {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(0, 100%);
    display: flex;
    flex-direction: column;
    background: var(--white);
    width: 100%;
    padding: 4px 0;
    border-radius: 5px;
    border: 1px solid var(--purple);
    opacity: 0;
    transition: all 0.2s ease;
    user-select: none;
    pointer-events: none;

    &--active {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__item {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    color: var(--purple, #6C63FF);
    padding: 5px;
    cursor: pointer;
    
    &:hover {
      background: rgba(108, 99, 255, 0.20);
    }
  }
}
</style>