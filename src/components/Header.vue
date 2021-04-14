<template>
    <header>
        <button><router-link class="font" to="/">Todos</router-link></button>
        <button><router-link class="font" :to="{ name: 'AddTask'
             }">Add</router-link></button>
    </header>
</template>
<script>

</script>
<style scoped>
header{
    background: lightgreen;
    padding: 10px;
    display: flex;
}
h1{
    color: #222;
    text-align: center;
}
button {
  
  align-items: left;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 3px solid red;
  
}
</style>