import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state() {
        return {
		count: 0,
		todos: [
			{ id: 1, title: 'Collect packages', completed: false },
			{ id: 2, title: 'Workout', completed: false },
			{ id: 3, title: 'Read one chapter', completed: false },
			{ id: 4, title: 'Buy socks', completed: true }
		]
    }},
	mutations: {
		increment: state => state.count++,
		decrement: state => state.count--,
		missionCompleted: function(state, todoId) {
			let todo = store.getters.thisTodo(todoId);
			todo.completed = !todo.completed;
		},
		addTodo: function(state, todoText) {
			state.todos.push({
				id: state.todos.slice(-1)[0].id + 1,
				title: todoText,
				completed: false
			});
			console.log(state.todos);
		},
		deleteTodo: function(state, todoId) {
			let todoIndex = state.todos.indexOf(
				store.getters.thisTodo(todoId)
			);
			state.todos.splice(todoIndex, 1);
			delete state.todos[todoIndex].title;
			console.log(state.todos[todoIndex]);
		}
	},
	getters: {
		thisTodo: state => todoId => {
			return state.todos.find(todo => todo.id === todoId);
		},
		completedTodos: state => {
			return state.todos.filter(todo => todo.completed);
		},
		completedTodosCount: (state, getters) => {
			return getters.completedTodos.length;
		},
		activeTodos: state => {
			return state.todos.filter(todo => !todo.completed);
		},
		activeTodosCount: (state, getters) => {
			return getters.activeTodos.length;
		}
	},
	actions: {
		incrementAsync({ commit }) {
			console.log('go');
			setTimeout(() => {
				commit('increment');
			}, 1000);
		}
	}
});
