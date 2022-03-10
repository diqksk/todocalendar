<template>
  <div class="todo-box">
    <TodoInput />
    <TodoContainer />
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
