<template>
<transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Change Task!
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <input class="input" type="text" :value="task.title" @input="editedTask = $event.target.value" @keyup.enter="updateList">
       </section>

      <footer class="modal-footer">
        <slot name="footer">
          
        </slot>
        <button
          type="button"
          class="btn-green"
          @click="updateList"
        >
          Update
        </button>
      </footer>
    </div>
  </div>
</transition>
</template>
<script>
  export default {
    name: 'Modal',
    props:['task'],
    data(){
      return{
        editedTask: "", 
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
       updateList(){
            // const index = this.todolist.findIndex((el) => el.id == this.id);
            // this.editedTask = this.todolist[index].title;
            this.$store.commit("editItem",{
            id: this.task.id,
            title: this.editedTask,
            
          });
          this.$emit('close');
        }
    },
      
    
  }
</script>
<style scoped>
.input{
  box-sizing: border-box;
  text-align: center;
    font-size: 30px;
    border: none;
    border-radius: 0;
    background: transparent;
    border-bottom: 1px solid lightblue;
    padding:12px;
    margin: 1rem auto;
    
    width: 100%;
}
  .modal-backdrop {
    position: absolute;
     /* position: fixed; */
    /* top: 0;
    bottom: 0;
    left: 0;
    right: 0;  */
    left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 300px;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: royalblue;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: royalblue;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: royalblue;
    border: 1px solid royalblue;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease-out;
  }
</style>