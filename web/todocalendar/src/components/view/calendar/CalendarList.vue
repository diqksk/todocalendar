<template>
  <article>
    <ul class="days">
      <li class="day">일</li>
      <li class="day">월</li>
      <li class="day">화</li>
      <li class="day">수</li>
      <li class="day">목</li>
      <li class="day">금</li>
      <li class="day">토</li>
    </ul>
    <ul class="dates">
      <li
        class="date"
        v-for="(date, datesIdx) in dates"
        :key="datesIdx"
        @click="displayItemModal"
      >
        <span
          :class="[
            datesIdx >= currentDatesIdx.firstDatesIdx &&
            datesIdx < currentDatesIdx.lastDatesIdx + 1
              ? 'this'
              : 'other',
          ]"
          ref="dateslist"
          >{{ date }}</span
        >
      </li>
    </ul>
    <ItemModal v-if="this.displayItem" @closeItem="closeItem" />
  </article>
</template>

<script>
import ItemModal from "./ItemModal";

export default {
  name: "CalendarList",
  components: { ItemModal },
  props: {
    dates: Array,
    currentDatesIdx: Object,
    currentDate: {
      type: Object,
      default() {
        return {
          currentDate: { currentYear: null, currentMonth: null },
        };
      },
    },
  },
  data() {
    return {
      displayItem: false,
      today: "",
    };
  },
  mounted() {
    this.todayClassAdd();
  },
  methods: {
    todayClassAdd() {
      const today = new Date();
      if (
        this.currentDate.currentYear === today.getFullYear() &&
        this.currentDate.currentMonth === today.getMonth()
      ) {
        const todayDateIdx = today.getDate();

        const datesArr = this.$refs.dateslist;
        const thisDates = datesArr.filter((date) => {
          return date.className === "this";
        });
        if (thisDates[todayDateIdx - 1].innerText == todayDateIdx)
          this.today = "today";
      }
    },
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
  padding-bottom: 7%;
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
