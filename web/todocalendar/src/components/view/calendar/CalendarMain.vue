<template>
  <header class="calendar-header">
    <h2 class="year-month">{{ year }}. {{ month + 1 }}</h2>
    <div class="move">
      <button class="move-btn prev-btn" @click="movePrevMonth">&lt;</button>
      <button class="move-btn cur-btn" @click="moveCurMonth">Current</button>
      <button class="move-btn next-btn" @click="moveNextMonth">&gt;</button>
    </div>
  </header>

  <section>
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
              {
                today:
                  itemIdx === currentDatesIdx.curDateIdx &&
                  year === todayYear &&
                  month === todayMonth,
              },
            ]"
            ref="dateItem"
            >{{ item }}</span
          >
          <div
            class="count"
            v-if="
              itemIdx >= currentDatesIdx.firstDatesIdx &&
              itemIdx < currentDatesIdx.lastDatesIdx + 1
            "
          >
            <i class="material-icons event" style="color: #666">event</i>
            <!-- <span>{{ getCalendarData[item - 1].count }}</span> -->
          </div>
        </li>
      </ul>
      <component
        :is="todoModal"
        v-if="this.displayItem"
        @closeItem="closeItem"
        :getTodo="getTodo"
        :clickDateFormat="clickDateFormat"
      ></component>
    </article>
  </section>
</template>

<script>
import ItemModal from "./ItemModal";
import userDataMixin from "@/mixins/userDataMixin";

export default {
  name: "CalendarMain",
  components: { ItemModal },
  mixins: [userDataMixin],
  data() {
    return {
      todoModal: "ItemModal",

      days: ["일", "월", "화", "수", "목", "금", "토"],
      date: null,
      month: null,
      year: null,
      dates: [],
      currentDatesIdx: {
        firstDatesIdx: null,
        lastDatesIdx: null,
        curDateIdx: null,
      },
      currentDate: { currentYear: null, currentMonth: null },
      curDates: [],
      prevMonth: null,
      nextMonth: null,
      today: "today",
      todayYear: null,
      todayMonth: null,

      getCalendarData: null,
      clickDateFormat: null,

      getTodo: null,

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

      this.todayClassAdd();
      this.linkUserData(this.year, this.month);
    },
    todayClassAdd() {
      const today = new Date();
      const curYear = today.getFullYear();
      const curMonth = today.getMonth();
      this.todayYear = curYear;
      this.todayMonth = curMonth;
      if (this.year === curYear && this.month === curMonth) {
        const todayDate = today.getDate();
        const curDateIdx = this.dates.indexOf(todayDate);
        this.currentDatesIdx.curDateIdx = curDateIdx;
      }
    },
    async linkUserData(year, month) {
      // 유저의 calendar 띄우기
      year = String(year);
      month = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      const formatYearMonth = year + month;

      const propsUserData = this.$route.query;
      propsUserData.date = formatYearMonth;
      const getData = await this.fetchData("get", "/board", propsUserData);
      this.getCalendarData = getData.data;
    },
    async displayItemModal(e) {
      // 선택된 날짜의 Todo list modal 띄우기
      e.preventDefault();
      const year = String(this.year);
      const month = this.month + 1 < 10 ? "0" + (this.month + 1) : this.month;
      const targetSpan = e.currentTarget.children[0];
      if (targetSpan.classList.contains("this")) {
        const date =
          targetSpan.innerText.length < 2
            ? "0" + targetSpan.innerText
            : targetSpan.innerText;
        const format = year + month + date;
        this.clickDateFormat = format;

        // const getTodo = await this.fetchData(
        //   "get",
        //   `/board/${format}`,
        //   this.$route.query.id
        // );

        const res = {
          code: 1,
          data: [
            {
              id: 1,
              title: 1,
              content: "공부하기",
              createAt: "20220410 10:00:01",
              like: false,
              done: false,
              edit: false,
            },
            {
              id: 1,
              title: 2,
              content: "운동하기",
              createAt: "20220410 15:38:02",
              like: false,
              done: false,
              edit: false,
            },
            {
              id: 1,
              title: 3,
              content: "씻기",
              createAt: "20220410 17:02:51",
              like: false,
              done: false,
              edit: false,
            },
            {
              id: 1,
              title: 4,
              content: "밥먹기",
              createAt: "20220410 18:21:05",
              like: false,
              done: false,
              edit: false,
            },
            {
              id: 1,
              title: 5,
              content: "잠자기",
              createAt: "20220410 23:11:03",
              like: false,
              done: false,
              edit: false,
            },
          ],
          err: "error",
        };
        this.getTodo = res;

        this.displayItem = !this.displayItem;
      } else {
        return;
      }
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

section {
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
  padding-top: 1%;
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
  padding-bottom: 0;
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

.count {
  font-size: 0.8em;
  color: #333;
  padding: 20% 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.event {
  font-size: 1em;
  padding: 0 0.5em;
}
</style>
