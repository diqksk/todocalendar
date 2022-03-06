<template>
  <nav>
    <button id="mypage">마이페이지</button>
    <button id="logout" @click="this.$router.replace({ path: '/' })">
      로그아웃
    </button>
  </nav>
</template>

<script>
export default {
  name: "CalendarNav",
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1%;
  background: linear-gradient(45deg, #11998e, #38ef7d);
}
button {
  display: block;
  padding: 0.5%;
  margin: 0.5%;
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
button:hover {
  background: #93f9b9;
  color: #131313;
}
</style>
