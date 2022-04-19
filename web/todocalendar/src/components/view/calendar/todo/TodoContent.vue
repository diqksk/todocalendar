<template>
  <div class="todo-box">
    <TodoInput @sendItem="sendItem" />
    <TodoContainer
      :todoItems="todoItems"
      @deleteItem="deleteItem"
      @sendEditTodo="sendEditTodo"
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
      todoItems: [],
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
        },
        err: null,
      },

      deleteTodo: { id: null, planId: null },
      clickDate: null,

      edit: "",
      editTodo: {
        id: null,
        planId: null,
        title: null,
        content: null,
        date: null,
      },
    };
  },
  mounted() {
    this.clickDate = this.clickDateFormat;
    this.getTodoContent();
  },
  methods: {
    async sendItem(input) {
      this.todoItems.unshift(input);
      this.createTodo.id = this.$route.query.id;
      this.createTodo.title = input;
      this.createTodo.content = input;
      this.createTodo.date = this.clickDate;
      console.log(this.createTodo);
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
        },
        err: "error",
      };
      this.createTodoRes = create;
      console.log(this.createTodoRes);
    },
    async deleteItem(index) {
      console.log(index);
      this.todoItems.splice(index, 1);
      this.deleteTodo.id = this.$route.query.id;
      this.deleteTodo.planId = this.createTodoRes.planId;
      // const delete = await this.fetchData("delete", "/board", this.deleteTodo); // todo 삭제
      // console.log(delete);
    },
    getTodoContent() {
      // 유저의 클릭 날짜 todo 데이터 불러오기
      this.getTodoArray = this.getTodo.data;
      const arr = [];
      const filterItem = this.getTodoArray.forEach((item) => {
        arr.unshift(item.content);
      });
      filterItem;
      this.todoItems = arr;
    },
    async sendEditTodo(edit, index) {
      this.edit = edit;
      this.todoItems[index] = edit;
      this.editTodo.id = this.$route.query.id;
      this.editTodo.planId = this.createTodoRes.planId;
      this.editTodo.title = this.createTodo.title;
      this.editTodo.content = this.createTodo.content;
      this.editTodo.date = this.createTodo.date;
      // const edit = await this.fetchData("post", "/board", this.editTodo); // todo 편집
      // console.log(edit);
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
