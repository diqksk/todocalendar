<template>
  <div id="input-box">
    <input
      type="text"
      id="todo-input"
      @input="writeItem"
      @keypress="addItemKeyPress"
      v-model="input"
      ref="input"
    />
    <button @click="addItem">등록</button>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
  data() {
    return {
      input: "",
      // createDate: null,
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    writeItem(e) {
      const input = e.target.value;
      if (input.trim() !== "") {
        this.input = input;
      }
    },
    addItem(e) {
      e.preventDefault();
      // const getCreateDate = new Date(+new Date() + 3240 * 10000)
      //   .toISOString()
      //   .split("T")[0]
      //   .replace(/-/g, "");
      // this.createDate = getCreateDate;

      if (this.input.trim() !== "") {
        this.$emit("sendItem", this.input);
        this.input = "";
      } else {
        this.input = this.input.trim();
      }
      this.$refs.input.focus();
    },
    addItemKeyPress(e) {
      if (e.keyCode === 13) {
        if (this.input.trim() !== "") {
          this.$emit("sendItem", this.input);
          this.input = "";
        } else {
          this.input = this.input.trim();
        }
        this.$refs.input.focus();
      }
    },
  },
};
</script>

<style scoped>
#input-box {
  width: 100%;
  height: 1.2em;
  min-height: 1.2em;
  display: flex;
  margin-bottom: 10%;
}
#todo-input {
  width: 80%;
  margin-right: 5%;
  outline: none;
  padding-left: 0.5em;
}
button {
  width: 15%;
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
button:hover {
  background: #93f9b9;
  color: #666;
}
</style>
