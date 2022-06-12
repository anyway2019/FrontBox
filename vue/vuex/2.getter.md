# Getter

getter本质就是基于state加工后的结果集，类似于后端DTO的概念，在已有数据集的基础上根据不同组件的需要抽象成公共的部分形成getter，增强业务逻辑代码的复用性，同时减少代码量，方便后续逻辑整体调整（只需修改getter部分的逻辑即可）。
## getter的定义方式：
```js 
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    //第一参数 state
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    },
    //第二个参数 getters 
    doneTodosCount (state, getters) {
        return getters.doneTodos.length
    },
    //组件传参
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
  }
})
```
## getter的使用方式：
- 通过属性访问,具备缓存效果。
- 通过方法访问,不具备缓存效果。
```js
const counter = {
    computed:{
        doneTodos(){
            return this.$store.getters.doneTodos();
        }
    }
}

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
## 利用mapGetters函数简化使用:
```js
const counter = {
    computed:{
        doneTodos(){
            return this.$store.getters.doneTodos();
        },
        ...mapGetters({
            'doneTodos',
            AliasDoneTodos:'doneTodos' //将getter重新命名为AliasDoneTodos
        })
    }
}
```