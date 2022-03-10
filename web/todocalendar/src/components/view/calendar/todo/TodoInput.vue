<template>
  <div id="input-box">
    <input type="text" id="todo-input" />
    <button>등록</button>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
};
</script>

<style scoped>
#input-box {
  width: 100%;
  display: flex;
}
#todo-input {
  width: 90%;
  outline: none;
  padding-left: 0.5em;
}
button {
  width: 10%;
}
</style>
