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
      <li v-for="(date, datesIdx) in dates" :key="datesIdx"></li>
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
  },
  data() {
    return {
      displayItem: false,
      date: null,
    };
  },
  methods: {
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
  border: 1px solid gray;
}
.day {
  width: calc(100% / 7);
  text-align: center;
  padding: 3%;
  font-size: 0.85em;
  border: 1px solid blue;
}
.dates {
  display: flex;
  flex-flow: row wrap;
  border-top: 1px solid #333;
  border-right: 1px solid #333;
}
</style>
