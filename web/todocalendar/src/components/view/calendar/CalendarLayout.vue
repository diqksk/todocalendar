<template>
  <div id="calendar-main">
    <!-- nav -->
    <CalendarNav />

    <!-- body (canlendar) -->
    <CalendarMain />
  </div>
</template>

<script>
import CalendarNav from "./CalendarNav";
import CalendarMain from "./CalendarMain";

export default {
  name: "Calendar Layout",
  components: { CalendarNav, CalendarMain },
};
</script>

<style scoped>
#calendar-main {
  width: 100%;
  height: 100vh;
}
</style>
