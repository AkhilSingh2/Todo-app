import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state() {
	  return {
		todos: [
			{ id: 1, title: 'Collect packages', completed: false, marked:false },
			{ id: 2, title: 'Workout', completed: false, marked:false },
			{ id: 3, title: 'Read one chapter', completed: false, marked:false },
			{ id: 4, title: 'Buy socks', completed: true, marked:false }
		],
		loggedIn:false,
	}
	},
  
	mutations: {
	  addItem(state, payload) {
		const newItem = {
		  id: Date.now(),
		  title: payload.title,
		  completed:false,
		  marked: false,
		};
  
		state.todos.unshift(newItem);
		localStorage.setItem("todos", JSON.stringify(state.todos));

	  },
  
	  editItem(state, payload) {
		const index = state.todos.findIndex((item) => item.id == payload.id);
		state.todos[index].title = payload.title;
		
		localStorage.setItem("todos", JSON.stringify(state.todos));
		// router.push("/");
  
		// localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
		// if (
		//   state.selectedItems.length > 1 &&
		//   state.selectedItems.includes(payload.itemIdList[0])
		// ) {
		//   payload.itemIdList = [...state.selectedItems];
		//   state.selectedItems = [];
		// }
  
		// payload.itemIdList.map((itemId) => {
		//   const idx = state.todolist.findIndex((res) => res.id === itemId);
		//   state.todolist.splice(idx, 1);
		// });
		deleteItem: function(state, todoId) {
			let todoIndex = state.todos.indexOf(
				store.getters.thisTodo(todoId)
			);
			state.todos.splice(todoIndex, 1);
			delete state.todos[todoIndex].text;
			console.log(state.todos[todoIndex]);
		
  
		localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
  
	  toggleComplete(state, payload) {
		// let todoIndex = state.todos.indexOf(
		// 	store.getters.thisTodo(payload.id)
		// );
		let todos = [...state.todos];
		state.todos = todos.map(todo => {
			if(todo.id === payload.id){
				todo.completed = !todo.completed;
			}
			return todo;
		})
		// state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
		// this.$set(state.todos[todoIndex],"completed",!state.todos[todoIndex].completed)
		localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
	  getTodo(state,payload){
		let todos = state.todos.map(todo => {todo.id === payload.id});

		return todos.title;
	  },
	  deleteAll(state) {
		  state.todos = [];
		  localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
	  clearCompleted(state){
		  state.todos = state.todos.filter(todo => !todo.completed);
		  localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
	  clearMarked(state){
			state.todos = state.todos.filter(todo => !todo.marked );

			localStorage.setItem("todos", JSON.stringify(state.todos));
	  },
	  markAsComplete(state){
		  const marked_todos = state.todos.filter(todo => todo.marked );
		  var task;
		  for(task of state.todos){
			if (marked_todos.includes(task)){
				task.completed = !task.completed;
			}
		};
		  localStorage.setItem("todos", JSON.stringify(state.todos));

	  },
	  clearLocalStorage(state){
		  localStorage.clear();
		  location.reload();

	  },
	  settodolist(state,payload){
		  state.todos = payload

		localStorage.setItem("todos", JSON.stringify(state.todos));
		
	  },
	  

  
	//   toggleSelectedItem(state, payload) {
	// 	const idx = state.selectedItems.findIndex((id) => id === payload.itemId);
	// 	if (idx < 0) state.selectedItems.push(payload.itemId);
	// 	else state.selectedItems.splice(idx, 1);
	//   },
  
	  populateListFromStorage(state, dataList) {
		state.todos = dataList;
		console.log("Populating")
	  },
	  login(state){
			state.loggedIn = !state.loggedIn
	  },
	//   setUser(state, username){
    //     state.user = username
    // },
    // LogOut(state){
    //     state.user = null

    // },
	// auth_request(state){
	// 	state.status = 'loading'
	//   },
	//   auth_success(state, token, user){
	// 	state.status = 'success'
	// 	state.token = token
	// 	state.user = user
	//   },
	//   auth_error(state){
	// 	state.status = 'error'
	//   },
	//   logout(state){
	// 	state.status = ''
	// 	state.token = ''
	//   },
  
	  // updateLocalStorage() {
	  //   localStorage.setItem("todos", JSON.stringify(state.todolist));
	  // },
	},
  
	getters: {
	  todolist() {
		return store.state.todos;
	  },
	  thisTodo: state => todoId => {
		return state.todos.find(todo => todo.id === todoId);
	},
	doneTodos: state => {
		return state.todos.filter(todo => todo.completed);
	},
	activeTodos: state => {
		return state.todos.filter(todo => !todo.completed);
	},
	doneTodosCount: (state, getters) => {
		return getters.doneTodos.length;
	},
	activeTodosCount: (state, getters) => {
		return getters.activeTodos.length;
	},
	isLoggedIn:state => !!state.loggedIn,
	// isLoggedIn: state => !!state.token,
  	// authStatus: state => state.status,
	// isAuthenticated: state => !!state.user,    
    // StateUser: state => state.user,
	// },
	
	},
	actions: {
		incrementAsync({ commit }) {
			console.log('go');
			setTimeout(() => {
				commit('increment');
			}, 1000);
		},
		// async Register({dispatch}, form) {
		// 	await Axios.post("http://localhost:8080/Signup", form)
		// 	let UserForm = new FormData()
		// 	UserForm.append('username', form.username)
		// 	UserForm.append('password', form.password)
		// 	await dispatch('LogIn', UserForm)
		//   },
		//   async LogIn({commit}, User) {
		// 	await Axios.post("http://localhost:8080/login", User)
		// 	commit('setUser', User.get('username'))
		//   },
		//   async LogOut({commit}){
		// 	let user = null
		// 	commit('logout', user)
		//   }
		// login({commit}, user){
		// 	return new Promise((resolve, reject) => {
		// 	  commit('auth_request')
		// 	  axios({url: 'http://localhost:8080/login', data: user, method: 'POST' })
		// 	  .then(resp => {
		// 		const token = resp.data.token
		// 		const user = resp.data.user
		// 		localStorage.setItem('token', token)
		// 		axios.defaults.headers.common['Authorization'] = token
		// 		commit('auth_success', token, user)
		// 		resolve(resp)
		// 	  })
		// 	  .catch(err => {
		// 		commit('auth_error')
		// 		localStorage.removeItem('token')
		// 		reject(err)
		// 	  })
		// 	})
		// },
		// register({commit}, user){
		// 	return new Promise((resolve, reject) => {
		// 	  commit('auth_request')
		// 	  axios({url: 'http://localhost:8080/signup', data: user, method: 'POST' })
		// 	  .then(resp => {
		// 		const token = resp.data.token
		// 		const user = resp.data.user
		// 		localStorage.setItem('token', token)
		// 		axios.defaults.headers.common['Authorization'] = token
		// 		commit('auth_success', token, user)
		// 		resolve(resp)
		// 	  })
		// 	  .catch(err => {
		// 		commit('auth_error', err)
		// 		localStorage.removeItem('token')
		// 		reject(err)
		// 	  })
		// 	})
		//   },
		  logout({commit}){
			return new Promise((resolve, reject) => {
			  commit('logout')
			  localStorage.removeItem('token')
			  delete axios.defaults.headers.common['Authorization']
			  resolve()
			})
		  },
		  
	}

  });
  export default store;
  