<template>

    <div class="vertical-center">
        <nav-bar />
        
        <router-view  :tasks="tasks"></router-view>
       

     </div>
 

</template>

<script>

import Header from "./components/Header.vue"
import Navbar from "./components/Navbar.vue"

export default {
  components:{
    "nav-bar": Navbar,
    "app-header": Header
  },
  data(){
    return {
      tasks : this.$store.state.todos
    }
  },

  mounted() {
    // localStorage.clear();
    if (localStorage.getItem("todos")) {
      const data = JSON.parse(localStorage.getItem("todos"));
      console.log("list from storage - ", data);
      this.$store.commit("populateListFromStorage", data);
      console.log(this.$store.getters.todolist);
      console.log("Populated")
    }
  },
   created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  }
  

  
}
</script>

<style >
body{ 
  background-color: lightblue;
}
.container-wrapper {
  width: 100%;
}

</style>
