<template>
  <div>
    <div class="todos-status">
        <div>
            <i class="fas fa-circle active-todos"></i>
      <span> Active: {{ activeTodosCount }} </span>
      </div>
      <div>
          <i class="fas fa-circle done-todos"></i>
      <span> Done: {{ doneTodosCount }} </span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Status",
  methods: {
    increment() {
      this.$store.dispatch("incrementAsync");
    }
  },
  computed: {
    ...mapGetters(["doneTodosCount", "activeTodosCount"])
  }
};
</script>

<style scoped>
.todos-status{
  display: flex;
  word-wrap: normal;
  flex-wrap: nowrap;
  justify-content: space-around;
}
span {
  font-size: 17px;
  padding: 20px 10px;
  
  appearance: none;
}
.active-todos{
    color:blue;
}
.done-todos{
    color:red;
}
</style>
