<template>
  <div id="item-box">
    <ul id="todo-container">
      <template v-if="this.todoItems">
        <li v-for="(item, todoIndex) in todoItems" :key="todoIndex">
          <div class="todo">
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
                class="material-icons edit"
                style="color: #757575"
                :index="todoIndex"
                @click="editActive"
                ref="edit"
                >edit</i
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
          </div>
          <div class="edit-todo" style="display: none">
            <input
              type="text"
              class="edit-input"
              @input="editTodo"
              @keydown.enter="editAdd"
              v-model="edit"
              :index="todoIndex"
            />
            <button class="edit-add" @click="editAdd" :index="todoIndex">
              수정
            </button>
          </div>
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
    return {
      edit: "",
    };
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
      rightIcon.childNodes[2].style.display = "none";
      rightIcon.childNodes[3].style.display = "none";
      todoPath.childNodes[1].style.textDecoration = "line-through";
      todoPath.childNodes[1].style.color = "lightGray";
    },
    deleteTodo(e) {
      e.preventDefault();
      const index = e.target.getAttribute("index");
      this.$emit("deleteItem", index);
    },
    editTodo(e) {
      const input = e.target.value;
      if (input.trim() !== "") this.edit = input;
    },
    editAdd(e) {
      e.preventDefault();
      const $editTodo = e.path[2].childNodes[1];
      const index = e.target.getAttribute("index");
      if (this.edit.trim() !== "") {
        this.$emit("sendEditTodo", this.edit, index);
        this.edit = "";
        if ($editTodo.style.display === "none") {
          $editTodo.style.display = "block";
        } else {
          $editTodo.style.display = "none";
        }
      } else {
        this.edit = this.edit.trim();
      }
    },
    editActive(e) {
      e.preventDefault();
      const $editTodo = e.path[3].childNodes[1];
      if ($editTodo.style.display === "none") {
        $editTodo.style.display = "block";
        $editTodo.childNodes[0].focus();
      } else {
        $editTodo.style.display = "none";
        this.edit = "";
      }
    },
  },
};
</script>

<style scoped>
#item-box {
  width: 100%;
  height: 80%;
  overflow-y: auto;
}
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  padding-bottom: 3%;
  border-bottom: 1px solid #e0e0e0;
}
.edit-todo {
  margin-bottom: 5%;
  padding-bottom: 3%;
  /* display: none; */
}
.edit-input {
  font-size: 0.6em;
  width: 70%;
  letter-spacing: 0.1em;
  margin-right: 5%;
  padding: 0 1em 3%;
  border: none;
  outline: none;
  border-bottom: 1px solid #aaa;
}
.edit-add {
  width: 15%;
  padding: 1%;
  background: #1d976c;
  border: none;
  border-radius: 0.2rem;
  color: #fff;
  font-size: 0.5em;
  cursor: pointer;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
}
.edit-add:hover {
  background: #93f9b9;
  color: #666;
}
.todo-item {
  font-size: 0.8em;
  padding: 0 1em;
}
.material-icons {
  font-size: 0.8em;
  cursor: pointer;
  padding: 0.1em;
}
.icon-right {
  min-width: 5em;
  margin-right: 5%;
}
</style>
