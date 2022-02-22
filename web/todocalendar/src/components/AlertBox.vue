<template>
  <div class="modal-wrapper">
    <div class="modal">
      <p>{{ alertText }}</p>
      <button class="btn" id="cancle-btn" @click="closeAlert">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertBox",
  props: {
    alertText: { type: String, default: "" },
  },
  data() {
    return {
      display: true,
    };
  },
  methods: {
    closeAlert(e) {
      e.preventDefault();
      this.display = !this.display;
      this.$emit("closeAlert", this.display);
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 20vw;
  text-align: center;
  background: #fff;
  border-radius: 0.5rem;
}
.modal p {
  margin: 15% auto;
  font-size: 0.8em;
}

.btn {
  display: block;
  padding: 3%;
  width: 100%;
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
#cancle-btn {
  padding: 2%;
  width: 20%;
  margin-bottom: 8%;
}
</style>
