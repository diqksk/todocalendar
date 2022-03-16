<template>
  <div id="item-box">
    <ul id="todo-container">
      <template v-if="this.todoItems">
        <li v-for="(item, todoIndex) in this.todoItems" :key="todoIndex">
          <i
            class="material-icons like"
            style="color: salmon"
            @click="checkLike"
            >favorite_border</i
          >
          <span class="todo-item">{{ item }}</span>
          <span class="icon-right">
            <i class="material-icons done" style="color: #00c853">done</i>
            <span class="slash"> / </span>
            <i class="material-icons close" style="color: #d50000">close</i>
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
  methods: {
    checkLike(e) {
      const target = e.target;
      if (target.innerText === "favorite_border") {
        target.innerText = "favorite";
      } else {
        target.innerText = "favorite_border";
      }
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
