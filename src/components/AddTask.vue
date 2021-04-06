<template>
<div>
    <h3>Add or change a task</h3>
        <input type="text" v-model="newTask" @keyup.enter="addTask()" placeholder="Waiting for input...">
        <button @click="addTask()"><router-link to="/">Submit & Return to App</router-link> </button>
        
</div>
</template>
<script>


export default ({
    props:['tasks'],
    data(){
        return{
            newTask: ''

        }
    },
   methods:{
       addTask(){
            if(this.newTask){
                this.tasks.push({
                    id: this.tasks.length,
                    title:this.newTask,
                    completed:false
                });
                
                this.newTask='';
            }
        }
   }
})
</script>
<style scoped>

</style>