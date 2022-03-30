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
  display: flex;
  margin-bottom: 10%;
}
#todo-input {
  width: 90%;
  outline: none;
  padding-left: 0.5em;
}
button {
  width: 10%;
}
</style>
