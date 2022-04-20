<template>
  <div id="item-box">
    <ul id="todo-container">
      <template v-if="todoItems">
        <li v-for="(item, todoIndex) in todoItems" :key="todoIndex">
          <div class="todo" ref="todoItem">
            <i
              class="material-icons like"
              style="color: salmon"
              @click="checkLike"
              :index="todoIndex"
              >{{
                todoItems[todoIndex].like ? "favorite" : "favorite_border"
              }}</i
            >
            <span
              class="todo-item"
              :class="{ 'done-text-line': todoItems[todoIndex].done }"
              >{{ item.content }}</span
            >
            <span class="icon-right">
              <i
                class="material-icons done"
                :class="{ 'done-hide': todoItems[todoIndex].done }"
                style="color: #00c853"
                @click="doneTodo"
                :index="todoIndex"
                >done</i
              >
              <span
                class="slash"
                :class="{ 'done-hide': todoItems[todoIndex].done }"
              >
                /
              </span>
              <i
                class="material-icons edit"
                :class="{ 'done-hide': todoItems[todoIndex].done }"
                style="color: #757575"
                :index="todoIndex"
                @click="editActive"
                >edit</i
              >
              <span
                class="slash"
                :class="{ 'done-hide': todoItems[todoIndex].done }"
              >
                /
              </span>
              <i
                class="material-icons close"
                style="color: #d50000"
                @click="deleteTodo"
                :index="todoIndex"
                >close</i
              >
            </span>
          </div>
          <div
            class="edit-todo"
            :class="todoItems[todoIndex].edit ? 'edit-show' : 'edit-hide'"
          >
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
  props: { todoItems: Array },
  data() {
    return {
      edit: "",
    };
  },
  mounted() {},
  methods: {
    checkLike(e) {
      e.preventDefault();
      const index = e.target.getAttribute("index");
      this.$emit("sendLike", index);
    },
    doneTodo(e) {
      e.preventDefault();
      const index = e.target.getAttribute("index");
      this.$emit("sendStatusDone", index);
    },
    editTodo(e) {
      const input = e.target.value;
      if (input.trim() !== "") this.edit = input;
    },
    editAdd(e) {
      e.preventDefault();
      const index = e.target.getAttribute("index");
      if (this.edit.trim() !== "") {
        this.$emit("addEditTodo", this.edit, index);
        this.edit = "";
      } else {
        this.$emit("closeEditTodo", index);
        this.edit = this.edit.trim();
      }
    },
    editActive(e) {
      e.preventDefault();
      const index = e.target.getAttribute("index");
      this.$emit("sendEditTodo", index);
    },
    deleteTodo(e) {
      e.preventDefault();
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
  display: none;
}
.edit-input {
  font-size: 0.6em;
  width: 70%;
  letter-spacing: 0.1em;
  text-indent: 0.1em;
  text-align: center;
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

.done-text-line {
  text-decoration: line-through;
  color: lightGray;
}
.done-hide {
  display: none;
}

.edit-hide {
  display: none;
}
.edit-show {
  display: block;
}
</style>
