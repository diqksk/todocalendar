<template>
  <div class="todo-box">
    <TodoInput @sendItem="sendItem" />
    <TodoContainer :todoItems="todoItems" />
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
      console.log(this.todoItems);
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
