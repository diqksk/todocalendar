<template>
  <main>
    <CalendarHeader :currentDate="currentDate" />
    <CalendarList :dates="dates" />
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
      date: null,
      dates: [],
      currentDate: { currentYear: null, currentMonth: null },
    };
  },
  mounted() {
    this.renderDate();
  },
  methods: {
    renderDate() {
      const date = new Date();
      this.date = date;

      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth();
      this.currentDate.currentYear = currentYear;
      this.currentDate.currentMonth = currentMonth; // 현재 날짜 표시하기

      const prevLast = new Date(currentYear, currentMonth, 0);
      const curLast = new Date(currentYear, currentMonth + 1, 0);

      const prevLastDate = prevLast.getDate();
      const prevLastDay = prevLast.getDay();

      const curLastDate = curLast.getDate();
      const curLastDay = curLast.getDay();

      const prevDates = [];
      const curDates = [...Array(curLastDate + 1).keys()].slice(1);
      const nextDates = [];

      if (prevLastDay !== 6) {
        for (let i = 0; i < prevLastDay + 1; i++)
          prevDates.unshift(prevLastDate - i);
      }
      for (let i = 1; i < 7 - curLastDay; i++) {
        nextDates.push(i);
      }

      const dates = [...prevDates, ...curDates, ...nextDates];
      const curFirstDatesIndex = dates.indexOf(1);
      const curLastDatesIndex = () => {
        if (dates.indexOf(curLastDate) > dates.indexOf(prevLastDate)) {
          return dates.indexOf(curLastDate);
        } else {
          return dates.indexOf(curLastDate);
        }
      };

      dates.forEach((date, i) => {
        const condition =
          i >= curFirstDatesIndex && i < curLastDatesIndex() + 1
            ? "this"
            : "other";
        dates[
          i
        ] = `<li class="date"><span class=${condition}>${date}</span></li>`;
      });
      this.dates = dates;
      console.log(curFirstDatesIndex);
      console.log(curLastDatesIndex());
    },
  },
};
</script>

<style scoped>
main {
  width: 50%;
  margin: 0 auto;
}
</style>
