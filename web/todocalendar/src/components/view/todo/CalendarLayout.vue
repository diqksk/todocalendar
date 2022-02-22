<template>
  <div id="calendar-main">
    <h3>Calendar</h3>
    <nav>
      <button @click="this.$router.replace({ path: '/' })">로그아웃</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Calendar Layout",
};
</script>

<style></style>
