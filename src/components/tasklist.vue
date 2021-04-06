<template>
    <li :class="className" >
             <input type="checkbox" :value="task" v-model="marked">
             <p >{{task.title}}</p>
             
             <router-link  :to="{ name: 'EditTask', params: {
                 tasks:tasks,
                 id:task.id
             }}">Edit</router-link>
             
             <button @click.self="completeTask(task)">Done</button>
             
             <button @click="removeTask(index)">Remove</button>
         </li>

    
</template>
<script>


export default ({
    c

})
</script>
<style scoped>

</style>