<template>
  <div class="todo-box">
    <TodoInput @sendItem="sendItem" />
    <TodoContainer
      @sendLike="sendLike"
      @deleteItem="deleteItem"
      @addEditTodo="addEditTodo"
      @sendEditTodo="sendEditTodo"
      @sendStatusDone="sendStatusDone"
      @closeEditTodo="closeEditTodo"
      :todoItems="todoItems"
    />
  </div>
</template>

<script>
import userDataMixin from "@/mixins/userDataMixin";
import TodoInput from "./TodoInput";
import TodoContainer from "./TodoContainer";
export default {
  name: "Todo content",
  mixins: [userDataMixin],
  components: {
    TodoInput,
    TodoContainer,
  },
  props: {
    getTodo: Object,
    clickDateFormat: String,
  },
  data() {
    return {
      getTodoArray: null,
      todoContent: null,
      planNum: null,
      createTodo: { id: 1, title: "", content: "", date: "YYYYMMDD" },
      createTodoRes: {
        code: null,
        data: {
          planId: null,
          title: null,
          content: null,
          date: null,
          createAt: null,
          like: false,
          done: false,
          edit: false,
        },
        err: null,
      },
      getItems: [],
      todoItems: [],

      deleteTodo: { id: null, planId: null },
      clickDate: null,

      edit: "",
      editTodo: {
        id: null,
        planId: null,
        title: null,
        content: null,
        date: null,
        like: false,
        done: false,
        edit: false,
      },
    };
  },
  mounted() {
    this.clickDate = this.clickDateFormat;
    this.getTodoContent();
  },
  methods: {
    getTodoContent() {
      // 유저의 클릭 날짜 todo 데이터 불러오기
      this.getTodoArray = this.getTodo.data;
      const arr = [];
      this.getTodoArray.forEach((item) => {
        arr.unshift(item);
      });
      this.getItems = arr;

      const prevItems = [...this.getItems];
      prevItems.forEach((item) => {
        const { content, like, done, edit } = item;
        const format = {
          content: content,
          like: like,
          done: done,
          edit: edit,
        };
        this.todoItems.unshift(format);
      });
    },
    async sendItem(resInput) {
      const itemFormat = {
        content: resInput,
        like: false,
        done: false,
        edit: false,
      };

      this.todoItems.unshift(itemFormat);

      this.createTodo.id = this.$route.query.id;
      this.createTodo.title = resInput;
      this.createTodo.content = resInput;
      this.createTodo.date = this.clickDate;
      // const create = await this.fetchData("post", "/board", this.createTodo); // todo 작성하고 데이터 서버에 보내기
      // console.log(create);
      const create = {
        code: 1,
        data: {
          planId: 1,
          title: "",
          content: "",
          date: "YYYYMMDD",
          createAt: "YYYYMMDD hh:mm:ss",
          like: false,
          done: false,
          edit: false,
        },
        err: "error",
      };
      this.createTodoRes = create;
    },
    sendLike(index) {
      this.todoItems[index].like = !this.todoItems[index].like;
    },
    sendStatusDone(index) {
      this.todoItems[index].done = !this.todoItems[index].done;
    },
    sendEditTodo(index) {
      this.todoItems[index].edit = !this.todoItems[index].edit;
    },
    async addEditTodo(edit, index) {
      this.edit = edit;
      this.todoItems[index].content = edit;
      this.editTodo.id = this.$route.query.id;
      this.editTodo.planId = this.createTodoRes.planId;
      this.editTodo.title = this.createTodo.title;
      this.editTodo.content = this.createTodo.content;
      this.editTodo.date = this.createTodo.date;
      this.todoItems[index].like = false;
      this.todoItems[index].done = false;
      this.todoItems[index].edit = false;
      // const edit = await this.fetchData("post", "/board", this.editTodo); // todo 편집
      // console.log(edit);
    },
    closeEditTodo(index) {
      this.todoItems[index].edit = false;
    },
    async deleteItem(index) {
      this.todoItems.splice(index, 1);
      this.deleteTodo.id = this.$route.query.id;
      this.deleteTodo.planId = this.createTodoRes.planId;
      // const delete = await this.fetchData("delete", "/board", this.deleteTodo); // todo 삭제
      // console.log(delete);
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
