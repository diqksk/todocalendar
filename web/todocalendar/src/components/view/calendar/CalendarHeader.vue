<template>
  <header>
    <h3>{{ month }}</h3>
  </header>
</template>

<script>
export default {
  name: "CalendarHeader",
  data() {
    return {
      month: "3월",
    };
  },
};
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  margin: 5% auto;
}
</style>
