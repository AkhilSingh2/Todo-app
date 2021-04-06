<template>
    <div>
        <h3>Add or change task</h3>
        <h3>{{title}}</h3>
        <input type="text" v-model="editedTask" @keyup.enter="editTask(task)" placeholder="Waiting for input...">
        <button @click="editTask()"><router-link to="/">Submit & Return to App</router-link></button>
        
        
    </div>
</template>

<script>

export default {
    name: 'EditTask',
    props: ['tasks','id','title'],
    
    data (){
        return{
            editedTask: ''
        }
    },
    methods:{
        editTask(){
            const index = this.tasks.findIndex((el) => el.id == this.id);
            this.tasks[index] = {
                id: this.id,
                title: this.editedTask,
                completed: false
            }

            
            
        }
    }
}
</script>

<style >

</style>
