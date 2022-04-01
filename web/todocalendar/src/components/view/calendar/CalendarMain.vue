<template>
  <header class="calendar-header">
    <h2 class="year-month">{{ year }}. {{ month + 1 }}</h2>
    <div class="move">
      <button class="move-btn prev-btn" @click="movePrevMonth">&lt;</button>
      <button class="move-btn cur-btn" @click="moveCurMonth">Current</button>
      <button class="move-btn next-btn" @click="moveNextMonth">&gt;</button>
    </div>
  </header>

  <main>
    <article>
      <ul class="days">
        <li class="day" v-for="(day, dayIdx) in days" :key="dayIdx">
          {{ day }}
        </li>
      </ul>
      <ul class="dates" ref="todayclass">
        <li
          class="date"
          v-for="(item, itemIdx) in dates"
          :key="itemIdx"
          @click="displayItemModal"
        >
          <span
            :class="[
              itemIdx >= currentDatesIdx.firstDatesIdx &&
              itemIdx < currentDatesIdx.lastDatesIdx + 1
                ? 'this'
                : 'other',
            ]"
            >{{ item }}</span
          >
        </li>
      </ul>
      <ItemModal v-if="this.displayItem" @closeItem="closeItem" />
    </article>
  </main>
</template>

<script>
import ItemModal from "./ItemModal";

export default {
  name: "CalendarMain",
  components: { ItemModal },
  data() {
    return {
      days: ["일", "월", "화", "수", "목", "금", "토"],
      date: null,
      month: null,
      year: null,
      dates: [],
      currentDatesIdx: { firstDatesIdx: null, lastDatesIdx: null },
      currentDate: { currentYear: null, currentMonth: null },
      curDates: [],
      prevMonth: null,
      nextMonth: null,

      displayItem: false,
    };
  },
  mounted() {
    const date = new Date();
    this.date = date;
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    this.year = currentYear;
    this.month = currentMonth;

    this.renderDate(this.month, this.year);
  },
  methods: {
    movePrevMonth(e) {
      e.preventDefault();
      this.date.setMonth(this.date.getMonth() - 1);
      const prevMonth = this.date.getMonth();
      const prevYear = this.date.getFullYear();
      this.month = prevMonth;
      this.year = prevYear;
      this.renderDate(this.month, this.year);
    },
    moveCurMonth(e) {
      e.preventDefault();
      const curDate = new Date();
      this.date = curDate;
      const curMonth = this.date.getMonth();
      const curvYear = this.date.getFullYear();
      this.month = curMonth;
      this.year = curvYear;
      this.renderDate(this.month, this.year);
    },
    moveNextMonth(e) {
      e.preventDefault();
      this.date.setMonth(this.date.getMonth() + 1);
      const nextMonth = this.date.getMonth();
      const nextYear = this.date.getFullYear();
      this.month = nextMonth;
      this.year = nextYear;
      this.renderDate(this.month, this.year);
    },
    renderDate(month, year) {
      console.log(month);
      console.log(year);
      const prevLast = new Date(year, month, 0);
      const curLast = new Date(year, month + 1, 0);

      const prevLastDate = prevLast.getDate();
      const prevLastDay = prevLast.getDay();

      const curLastDate = curLast.getDate();
      const curLastDay = curLast.getDay();

      const prevDates = [];
      const curDates = [...Array(curLastDate + 1).keys()].slice(1); // 이번 달 배열화하기
      const nextDates = [];

      this.curDates = curDates;

      if (prevLastDay !== 6) {
        // 표시될 이전 달 날짜들
        for (let i = 0; i < prevLastDay + 1; i++)
          prevDates.unshift(prevLastDate - i);
      }
      for (let i = 1; i < 7 - curLastDay; i++) {
        // 표시될 다음 달 날짜들
        nextDates.push(i);
      }

      const dates = [...prevDates, ...curDates, ...nextDates];
      const curFirstDatesIndex = dates.indexOf(1); // 이번 달 1일의 인덱스 구하기
      const curLastDatesIndex = dates.lastIndexOf(curLastDate); // 이번 달 마지막 날짜 인덱스 구하기

      this.currentDatesIdx.firstDatesIdx = curFirstDatesIndex;
      this.currentDatesIdx.lastDatesIdx = curLastDatesIndex;

      this.dates = dates;

      // this.todayClassAdd();
    },
    // todayClassAdd() {
    //   const today = new Date();
    //   if (
    //     this.currentDate.currentYear === today.getFullYear() &&
    //     this.currentDate.currentMonth === today.getMonth()
    //   ) {
    //     const todayDateIdx = today.getDate();
    //     console.log(todayDateIdx);
    //     // if (this.dates[todayDateIdx - 1] == todayDateIdx)

    //     // const datesArr = this.$refs.itemlist;
    //     //   const thisDates = datesArr.filter((date) => {
    //     //     return date.className === "this";
    //     //   });
    //     //   if (thisDates[todayDateIdx - 1].innerText == todayDateIdx)
    //     //     this.today = "today";
    //   }
    // },
    displayItemModal(e) {
      e.preventDefault();
      this.displayItem = !this.displayItem;
    },
    closeItem() {
      this.displayItem = !this.displayItem;
    },
  },
};
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-around;
  margin: 2% auto;
  width: 80%;
}
.year-month {
  font-size: 1em;
}
.move {
  display: flex;
  border: 1px solid #333;
  border-radius: 5px;
}
.move-btn {
  width: 30px;
  height: 30px;
  line-height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.cur-btn {
  width: 80px;
  border-right: 1px solid #333;
  border-left: 1px solid #333;
}

main {
  width: 50%;
  margin: 0 auto;
}

.days {
  display: flex;
}
.day {
  width: calc(100% / 7);
  text-align: center;
  padding: 3%;
  font-size: 0.85em;
}
.dates {
  display: flex;
  flex-flow: row wrap;
  border-top: 1px solid #333;
  border-right: 1px solid #333;
}
.date {
  width: calc(100% / 7);
  padding: 2%;
  padding-bottom: 6%;
  font-size: 0.8em;
  text-align: right;
  border-bottom: 1px solid #333;
  border-left: 1px solid #333;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}
.date:hover {
  background: #e8f5e9;
}

.other {
  opacity: 0.3;
}

.day:nth-child(7n + 1),
.date:nth-child(7n + 1) {
  color: #d13e3e;
}

.day:nth-child(7n),
.date:nth-child(7n) {
  color: #396ee2;
}

.today {
  position: relative;
  color: #fff;
  z-index: 1;
}
.today:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #00c853;
}
</style>
