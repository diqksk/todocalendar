<template>
  <main>
    <CalendarHeader />
    <CalendarList :calendarList="calendarList" />
  </main>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import CalendarList from "./CalendarList";

export default {
  name: "CalendarMain",
  components: { CalendarHeader, CalendarList },
  data() {
    return {
      calendarList: [
        { code: 11, data: { date: "1", count: 0 } },
        { code: 12, data: { date: "2", count: 3 } },
        { code: 13, data: { date: "3", count: 6 } },
        { code: 14, data: { date: "4", count: 2 } },
        { code: 15, data: { date: "5", count: 2 } },
      ],
    };
  },
};
</script>

<style scoped></style>
