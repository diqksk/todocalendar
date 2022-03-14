<template>
  <ul id="todo-container">
    <template v-if="this.todoItems">
      <li v-for="(item, todoIndex) in this.todoItems" :key="todoIndex">
        <span>좋아요</span>{{ item }}<span>완료 / 삭제</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "TodoContainer",
  props: {
    todoItems: Array,
  },
};
</script>

<style scoped></style>
