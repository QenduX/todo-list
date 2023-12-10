<script setup lang="ts">
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';
import { useTodoStore } from '@/stores/todoStore'

defineProps<{
    theme: string;
}>()

const todosStore = useTodoStore();
</script>
<template>
    <header class="header">
        <BaseInput 
            class="header__search" 
            :withIcon="true"
            placeholder="Search note..."
            v-model:value="todosStore.searchValue"
        >
        </BaseInput>
        <BaseSelect 
            class="header__select"
            :sortedValue="todosStore.sortedValue" 
            :options="todosStore.sortedOptions" 
            @update="todosStore.setSortedValue"
        >
        </BaseSelect>
        <BaseButton
            :icon="true"
            @click="$emit('switchTheme', theme)"
        >   
            <template v-slot:icon>
                <svg v-if="theme === 'day'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg  v-if="theme === 'night'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" stroke="#ffffff" stroke-width="1.5"/>
                <path d="M12 2V3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12 21V22" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M22 12L21 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M3 12L2 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M19.0708 4.92969L18.678 5.32252" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5.32178 18.6777L4.92894 19.0706" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M19.0708 19.0703L18.678 18.6775" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            </template>
        </BaseButton>
    </header>
</template>
<style scoped lang="scss">
.header {
    display: flex;
    gap: 16px;

    &__select {
        flex-shrink: 0;
    }
}
</style>