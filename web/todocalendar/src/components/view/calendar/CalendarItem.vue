<template>
  <li class="calendar-item">
    <h3>Day {{ calendar.data.date }}</h3>
    <p>Count {{ calendar.data.count }}</p>
  </li>
</template>

<script>
export default {
  name: "CalendarList",
  props: {
    calendar: {
      type: Object,
      default() {
        return {
          code: 0,
          data: { date: "1", count: 0 },
        };
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.calendar-item {
  padding: 10%;
  cursor: pointer;
  border: 1px solid silver;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
}
.calendar-item:hover {
  transform: scale(1.1);
}
.calendar-item h3 {
  font-size: 0.8em;
  margin-bottom: 10%;
}
.calendar-item p {
  font-size: 0.6em;
  text-align: center;
}
</style>
