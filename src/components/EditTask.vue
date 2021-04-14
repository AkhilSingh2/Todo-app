<template>
    <div>
        <h3>Add or change task</h3>
        <h3>{{title}}</h3>
        <input type="text" v-model="editedTask" @keyup.enter="updateList()" :placeholder="title">
        <button @click="updateList()"><router-link to="/">Submit & Return to App</router-link></button>
        
        
    </div>
</template>

<script>

export default {
    name: 'EditTask',
    props: ['id','title'],
    
    data (){
        return{
            editedTask: '',
            itemId: ''
        }
    },
    computed: {
    todolist() {
      return this.$store.getters.todolist;
    },
  },
    methods:{
        // editTask(){
        //     const index = this.tasks.findIndex((el) => el.id == this.id);
        //     this.tasks[index] = {
        //         id: this.id,
        //         title: this.editedTask,
        //         completed: false
        //     }

            
            
        // }
        updateList(){
            // const index = this.todolist.findIndex((el) => el.id == this.id);
            // this.editedTask = this.todolist[index].title;
            this.$store.commit("editItem",{
            id: this.id,
            title: this.editedTask,
          })
        }

    },
    mounted(){
      console.log(this.todolist)
    }
    // created(){
    //   if (this.id) {
    //   const index = this.todolist.findIndex((el) => el.id == this.id);
    //   this.title = this.todolist[index].title;
    //   }
    // }
}
</script>

<style scoped >
.new{
  width: 100%;
  font-size: 18px;
}
#new-todo{
  padding: 5px 10px;
  line-height: 1;
}
  #new-todo:focus{
    outline: none;
  }

.add-new-btn{
  padding: 6px 10px;
  border: 1px solid #dadadc;
  background-color: #efefef;
}
  .add-new-btn:hover{
    cursor: pointer;
}

</style>
