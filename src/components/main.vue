<template>
<div class="card">
    <status />
<div class=" container1" :class="{'blur-content': isModalVisible}">

         <div class="input-box-field">
             <input id="input-box" type="text" v-model="newTodoInput" @keyup.enter="addTodo" placeholder="What you wanna do today?">
              <i class="fa fa-arrow-right fa-2x submit-icon" @click="addTodo" aria-hidden="true"></i>
         </div>
         <!-- <ul class="todos-list"> -->


            <draggable class="list-group" tag="ul" v-model="todolist" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
 <transition-group type="transition" :name="'flip-list'">
         
         <li class="todo-item" v-for="task in todolist" :key="task.id">
             <input class="todo-content checkbox" :id="task.id" type="checkbox" :value="task" v-model="task.marked">
             <label :for="task.id">
             <p class="todo-content todo-item" :class="{ done: task.completed }">{{task.title}}</p>
             </label>
             <!-- <router-link class="todo-content todo-item"  :to="{ name: 'EditTask', params: {
                 id:task.id,
                 title:task.title
              }}">Edit</router-link> -->

               <div class="btns">

              <button
      type="button"
      class="btn todo-content btn-edit"
      @click="showModal(task)"
    >
      Edit
    </button>
    
           
             <!-- <button v-if="!task.completed" class="todo-content todo-item complete" @click.self="completeTask(task)">Done</button>
             <button v-if="task.completed" class="todo-content todo-item complete" @click.self="completeTask(task)">Undone</button> -->

             <i v-if="!task.completed" class="fas fa-clipboard-check fa-3x" @click.self="completeTask(task)"></i>
             <i v-if="task.completed" class="fas fa-times-circle fa-3x" @click.self="completeTask(task)"></i>

             
             <!-- <button class="todo-content del-todo todo-item" @click="removeTask(task)">Remove</button> -->
             <i class="fas fa-trash fa-3x" @click="removeTask(task)"></i>
            </div>
            
                </li>
    </transition-group>
             </draggable>
         <!-- </ul> -->
         <div class="action-buttons" v-if="tasks.length > 0">
             <button class="action-buttons-item"  @click.self="completeMarked()">Mark as Completed</button>
             <button class="action-buttons-item"  @click.self="clearMarked()">Clear Marked</button>
             <button class="action-buttons-item"  @click.self="clearCompleted()">Clear Completed</button>
             <button class="action-buttons-item"  @click="clearAll()">Clear All</button>
             <button class="action-buttons-item" @click="clearLocalStorage()">Clear Local Storage</button>
         </div>
         </div>
         <modal
      v-if="isModalVisible"
      @close="closeModal" :task="task"
    />
         
         
</div>
 
</template>

<script>
import EditTask from "./EditTask.vue"
import AddTask from"./AddTask.vue"
import draggable from "vuedraggable"
import status from "./status.vue"
import modal from "./Popup.vue"

export default {
    components:{
        "edit-task":EditTask,
        "add-task": AddTask,
        draggable,
        status,
        modal

    },
    props: ['tasks'],

    data(){
        return {
            newTodoInput: '',
            // marked: [],
            editable: true,
      isDragging: false,
      delayedDragging: false,
      isModalVisible: false,
      task:[]
            
        }
    },
    
    methods: {
        showModal(val) {
            console.log(val)
            this.task = val
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
        onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
        addTodo() {
      this.$store.commit("addItem",{
            title: this.newTodoInput,
          })
      this.newTodoInput = '';
      
    },
        removeTask(task) {
            if(!task.completed){
                if(confirm("You haven't completed this task yet! Are you sure you want to delete it?")){
                    this.$store.commit("deleteItem", task.id);
                }

            }
            else{
                this.$store.commit("deleteItem", task.id);
            }
            // this.tasks.splice(index, 1);
            // this.$emit("update-number", this.tasks);
           

        },
        completeTask(task) {
            console.log(task)
            this.$store.commit("toggleComplete", task)
        },
        clearAll() {
           this.$store.commit("deleteAll");
        },
        clearCompleted() {
            // this.tasks = this.tasks.filter(this.inProgress);
            // this.$emit("update-number", this.tasks);
            this.$store.commit("clearCompleted");
        },
    
        // inProgress(task) {
        //     return ! this.isCompleted(task);
        // },
        // isCompleted(task) {
        //     return task.completed;
        // },
        clearMarked(){
            // this.tasks = this.tasks.filter((el) => !this.marked.includes(el)) ;
            // this.$emit("update-number", this.tasks);
            this.$store.commit("clearMarked");
        },
        // completeMarked(){
        //     var task;
        //     for(task of this.tasks){
        //         if (this.marked.includes(task)){
        //             task.completed = !task.completed;

        //         }
        //     };
        //     this.$emit("update-number", this.tasks);
        // }
        completeMarked(){
            this.$store.commit("markAsComplete");
        },
        clearLocalStorage(){
            this.$store.commit("clearLocalStorage");
        }

    },
    computed: {
        dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
        todolist: {
    get() {
      return this.$store.getters.todolist;
    },

    set(val) {
      this.$store.commit('settodolist', val)
    }
  },
    // updated(){
    //     localStorage.setItem("todos", JSON.stringify(this.$store.state.todos));
    // },
    },
    watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
}

</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
    display: flex;
  min-height: 20px;
  max-height: 510px;
  padding-left: 0;
  overflow-x:scroll;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

#input-box{
    box-sizing: border-box;
    position: absolute;
    margin: 0 auto;
    
     width: 90%;
    top: 25px;
    left: 50px;
    font-size: 30px;
    border: none;
    border-radius: 0;
    background: transparent;
    border-bottom: 1px solid royalblue;
    padding:12px;  
}
#input-box:hover{
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.05);
}
li{
    display: flex;
    flex-direction: row;
    margin: 5px;
    /* padding: .5rem 1rem; */
    align-items: center;
    background-color: hsla(0,0%,100%,.1);
    /* text-align: left; */
    padding-left: 5px;
    width: 100%;
    justify-content: space-between;
}
.tasks__item__toggle--completed{
    text-decoration: line-through;
    background-color: chartreuse;
}
.container1{
  width: 90%;
  /* justify-content: space-around; */

  /* margin-top: 0px; */


  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  /* margin-top: 0px; */
  /* overflow: auto; */



 
}
.todos-list{
  list-style: none;
  text-align: left;
 
}
.todo-item{
  padding: 10px;
  cursor: pointer;
}
.todo-content{
  font-size: 20px;
  /* line-height: 1.5; */
  transition: font-weight .5s ease-in-out;
  transition: transform .2s;
}
  .todo-content:hover{
    font-weight: bold;
    -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}

.del-todo{
	color: #ed8060;
	/* font-size: 14px; */
	/* float: right; */
    
}
	.del-todo:hover{
		color: #f84510;
		font-weight: normal;
}

.done{
  text-decoration: line-through;
  color: #dadadc;
}
  .done:hover{
    font-weight: normal;
}
.btns {
  display: flex;
    flex-direction: row;
    flex-grow: 0.1;
    justify-content: space-between;
}
/* .xyz{
    flex-wrap:wrap;
} */
p{
    box-sizing: border-box;
    flex-grow: 2;
    
    text-align: left;
    
    flex-basis: 0;
}
.fas:hover{
    color: green;

}
.fa-trash {
    color: royalblue;

}
.fa-trash:hover{
    color: red;
    -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}

.blur-content{
  filter: blur(5px); 
}
.btn {
    /* margin-right: 10px; */
    background-color: wheat;


}
.action-buttons{
    position: absolute;
    width: 90%;
    justify-content:space-evenly;
    bottom: 0px;
    padding-bottom: 10px;
}
.submit-icon{
  position: absolute;
  right: 90px;
  top: 45px;
}
.submit-icon:hover{
  color: royalblue;
}
.checkbox:before{
  border: 1px solid blue;
}
.checkbox:hover{
  border: royalblue;
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
.action-buttons-item{
  border: royalblue;
}
.action-buttons-item:hover{
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}



</style>


        


