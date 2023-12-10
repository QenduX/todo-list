import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { type ITodo, type IOption, type TSearchValue, type TInputValue } from '@/interfaces';

const BASE_URL:string = 'https://36b8983d6cf156bf.mokky.dev';

export const useTodoStore = defineStore('todoStore', () => {
  const todosItems = reactive<ITodo[]>([
    // {id: 1, description: 'Note 1', isReady: false},
    // {id: 2, description: 'Note 2', isReady: false},
    // {id: 3, description: 'Note 3', isReady: false},
    // {id: 4, description: 'Note 4', isReady: false},
    // {id: 5, description: 'Note 5', isReady: false},
  ]);
  const isTodosLoading = ref<boolean>(false);
  const editedTodo = ref<number>(0);
  const searchValue = ref<TSearchValue>('');
  const inputValue = ref<TInputValue>('');
  const sortedValue = ref<IOption>({value: 'all', title: 'all'});
  const sortedOptions = reactive<IOption[]>([
    {value: 'all', title: 'all'},
    {value: 'complete', title: 'Complete'},
    {value: 'incomplete', title: 'Incomplete'},
  ])

  const getSortedTodos = computed(() => {
    return todosItems.filter(todo => {
      if (sortedValue.value.value === 'all') {
        return true
      }
      else {
        return (sortedValue.value.value.toLowerCase() == 'complete' && todo.isReady) || 
            (sortedValue.value.value.toLowerCase() == 'incomplete' && !todo.isReady)
      }
    })
  })

  const getSearchAndSortedTodos = computed(() => {
    return getSortedTodos.value.filter(todo => todo.description.toLowerCase().includes(searchValue.value.toLowerCase()))
  })

  const checkLoadingPost = computed (() => {
    return todosItems.length > 0 ? isTodosLoading.value = true : isTodosLoading.value = false;
  })

  function setSortedValue(value:IOption) {
    sortedValue.value = value;
  }

  function setInputValue(value: string) {
    inputValue.value = value
  }

  async function fetchTodos() {
    await fetch(BASE_URL + '/todos')
      .then(response => response.json())
      .then((json) => {
        if (json) {
          setTimeout(() => {
            todosItems.push(...json);
          }, 1000)
        }
      })
      .catch(error => console.log(error));
  }

  async function createTodo() {
    if (inputValue.value) {
      const newTodo:object = {description: inputValue.value, isReady: false};

      await fetch(BASE_URL + '/todos', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newTodo),
      })
        .then(response => response.json())
        .then(json => todosItems.push(json))
        .catch(error => console.log(error));
      
      inputValue.value = '';
    }
  }

  async function removeTodo(item: ITodo) {
    await fetch(`${BASE_URL}/todos/${item.id}`, {
      method: "DELETE"
    })
    todosItems.splice(todosItems.indexOf(item), 1);
  }

  async function toggleTodoReady(item: ITodo) {
    await fetch(`${BASE_URL}/todos/${item.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({isReady: !item.isReady}),
    })
      .then(response => response.json())
      .then(json => todosItems.splice(todosItems.findIndex(item => item.id === json.id), 1, json))
      .catch(error => console.log(error));
  }

  async function editTodo() {
    await fetch(`${BASE_URL}/todos/${editedTodo.value}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({description: inputValue.value}) 
    })
      .then(response => response.json())
      .then(json => todosItems.splice(todosItems.findIndex(item => item.id === json.id), 1, json))
      .catch(error => console.log(error));
    setInputValue('');
  }


  return {
    todosItems,
    editedTodo,
    inputValue,
    searchValue,
    sortedValue, 
    sortedOptions, 
    getSortedTodos,
    getSearchAndSortedTodos,
    checkLoadingPost,
    setSortedValue,
    setInputValue,
    fetchTodos, 
    createTodo,
    toggleTodoReady,
    removeTodo,
    editTodo
  }
})