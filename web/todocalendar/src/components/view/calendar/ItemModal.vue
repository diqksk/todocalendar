<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="todo-box">
        <!-- 투두 컴포넌트 만들어서 v-show 활용하여 해당 날짜에 맞는 투두리스트 보여주기 -->
        <input type="text" id="todo-input" />
        <button id="todo-btn">등록</button>
      </div>

      <button class="btn" id="signup-cancle-btn" @click="closeItem">
        닫기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemModal",
  props: {},
  methods: {
    closeItem(e) {
      e.preventDefault();
      this.$emit("closeItem");
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 30%;
  padding: 2%;
  height: 80%;
  background: #fff;
  border-radius: 0.5rem;
}
.todo-box {
  width: 80%;
  height: 70%;
  margin: 10% auto;
  text-align: center;
  border: 1px solid lightgray;
}
.btn {
  display: block;
  padding: 1% 3%;
  margin: 3% auto;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.5em;
  background: #1d976c;
  color: #fff;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
}
.btn:hover {
  background: #93f9b9;
  color: #131313;
}
</style>
