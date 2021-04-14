<template>
<div>
    <h3>Add or change a task</h3>
        <input type="text" v-model="newTask" @keyup.enter="updateList()" placeholder="Waiting for input...">
        <button @click="updateList()"><router-link to="/">Submit & Return to App</router-link> </button>
        
</div>
</template>
<script>


export default ({
    // props:['tasks'],
    data(){
        return{
            newTask: ''

        }
    },
    computed: {
        todolist() {
            return this.$store.getters.todolist;
        },
    },
   methods:{
    //    addTask(){
    //         if(this.newTask){
    //             this.tasks.push({
    //                 id: this.tasks.length,
    //                 title:this.newTask,
    //                 completed:false
    //             });
                
    //             this.newTask='';
    //         }
    //     }
    updateList(){
            // const index = this.todolist.findIndex((el) => el.id == this.id);
            // this.editedTask = this.todolist[index].title;
            this.$store.commit("addItem",{
            id: this.id,
            title: this.newTask,
            completed: false,
            marked: false
          })
        }
   }
})
</script>
<style scoped>

</style>