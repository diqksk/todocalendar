<template>
  <article>
    <ul class="calendar-list">
      <CalendarItem
        v-for="calendar in calendarList"
        :key="calendar.code"
        :calendar="calendar"
        @click="displayItemModal"
      />
    </ul>
    <ItemModal v-if="this.displayItem" @closeItem="closeItem" />
  </article>
</template>

<script>
import CalendarItem from "./CalendarItem";
import ItemModal from "./ItemModal";

export default {
  name: "CalendarList",
  components: { CalendarItem, ItemModal },
  props: {
    calendarList: Array,
  },
  data() {
    return {
      calendar: {},
      displayItem: false,
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
.calendar-list {
  width: 100%;
  margin: 2% auto;
  padding: 2% 20%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 1em;
}
</style>
