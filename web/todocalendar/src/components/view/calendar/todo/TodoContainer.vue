<template>
  <div id="item-box">
    <ul id="todo-container">
      <template v-if="this.todoItems">
        <li v-for="(item, todoIndex) in todoItems" :key="todoIndex">
          <i
            class="material-icons like"
            style="color: salmon"
            @click="checkLike"
            >favorite_border</i
          >
          <span class="todo-item">{{ item }}</span>
          <span class="icon-right">
            <i
              class="material-icons done"
              style="color: #00c853"
              @click="doneTodo"
              >done</i
            >
            <span class="slash"> / </span>
            <i
              class="material-icons close"
              style="color: #d50000"
              @click="deleteTodo"
              :index="todoIndex"
              ref="delete"
              >close</i
            >
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoContainer",
  props: {
    todoItems: Array,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    checkLike(e) {
      const target = e.target;
      const text =
        target.innerText === "favorite_border" ? "favorite" : "favorite_border";
      target.innerText = text;
    },
    doneTodo(e) {
      e.preventDefault();
      const rightIcon = e.path[1];
      const todoPath = e.path[2];
      rightIcon.childNodes[0].style.display = "none";
      rightIcon.childNodes[1].style.display = "none";
      todoPath.childNodes[1].style.textDecoration = "line-through";
      todoPath.childNodes[1].style.color = "lightGray";
    },
    deleteTodo(e) {
      e.preventDefault();
      console.log(e);
      console.log(this.$refs.delete);
      const index = e.target.getAttribute("index");
      this.$emit("deleteItem", index);
    },
  },
};
</script>

<style scoped>
#item-box {
  width: 100%;
  height: 80%;
  overflow: auto;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  padding-bottom: 3%;
  border-bottom: 1px solid #e0e0e0;
}
.todo-item {
  font-size: 0.8em;
}
.material-icons {
  font-size: 0.8em;
  cursor: pointer;
  padding: 0.1em;
}
.icon-right {
  margin-right: 5%;
}
</style>
