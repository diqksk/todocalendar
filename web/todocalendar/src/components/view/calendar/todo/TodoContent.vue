<template>
  <div class="todo-box">
    <TodoInput @sendItem="sendItem" />
    <TodoContainer :todoItems="todoItems" @deleteItem="deleteItem" />
  </div>
</template>

<script>
import TodoInput from "./TodoInput";
import TodoContainer from "./TodoContainer";
export default {
  name: "Todo content",
  components: {
    TodoInput,
    TodoContainer,
  },
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    sendItem(input) {
      this.todoItems.unshift(input);
    },
    deleteItem(index) {
      this.todoItems.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.todo-box {
  width: 100%;
  height: 85%;
  padding: 5%;
  text-align: center;
}
</style>
