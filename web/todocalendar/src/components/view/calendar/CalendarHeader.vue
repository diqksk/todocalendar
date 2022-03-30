<template>
  <div class="calendar-header">
    <h2 class="year-month">
      {{ currentDate.currentYear }}. {{ currentDate.currentMonth + 1 }}
    </h2>
    <div class="move">
      <button class="move-btn pre-btn">&lt;</button>
      <button class="move-btn cur-btn">Today</button>
      <button class="move-btn next-btn">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarHeader",
  data() {
    return {};
  },
  props: {
    currentDate: {
      type: Object,
      default() {
        return {
          currentDate: { currentYear: null, currentMonth: null },
        };
      },
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1em;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
}
</style>
