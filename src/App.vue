<template>
<div class="container-wrapper">
    <app-header></app-header>
        <div id="card">
        <router-view @update-number= "update" :tasks="tasks"></router-view>

     </div>
 </div>

</template>

<script>

import Main from "./components/main.vue"
import Header from "./components/Header.vue"
import EditTask from "./components/EditTask.vue"
import AddTask from "./components/AddTask.vue"

export default {
  components:{
    "main-app": Main,
    "app-header": Header,
    "edit-task": EditTask,
    "add-task": AddTask
  },
  data(){
    return {
      tasks : this.$store.state.todos
    }
  },
  methods:{
   update(tasks) {
      this.tasks = tasks;
   }
  },
  watch: {
    tasks: {
      handler() {
        console.log('Todos changed!');
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      deep: true,
  }
},
mounted() {
  console.log('App mounted!');
  if (localStorage.getItem('tasks')) this.tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(this.$store.state.todos);
}

  
}
</script>

<style >
body{ 
  background-color: lightblue;
}
#card{
    display:flex;
    flex-direction: column;
    background-color: white;
    box-sizing: border-box;
    height: 700px;
    margin: 1rem auto;
    position: relative;
    border: .0625rem solid rgba(0,0,0,.05);
    border-radius: .25rem;
    max-width: 720px;
    
}
#card {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: auto;
}
</style>
