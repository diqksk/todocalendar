<template>
  <div class="modal-wrapper">
    <div class="modal">
      <TodoHeader />
      <TodoContent />
      <div class="btn-box">
        <button class="btn" id="signup-cancle-btn" @click="closeItem">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./todo/TodoHeader";
import TodoContent from "./todo/TodoContent";

export default {
  name: "ItemModal",
  components: {
    TodoHeader,
    TodoContent,
  },
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
.btn-box {
  height: 5%;
  min-height: 1em;
}
.btn {
  display: block;
  width: 15%;
  height: 100%;
  margin: 0 auto;
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
