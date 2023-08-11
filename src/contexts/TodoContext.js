import TodoModel from '../model/TodoModel';
import { createContext } from 'react';

const TodoContext = createContext({
  state: { todos: [] },
  actions: {
    removeTodo: () => {},
    insertTodo: () => {},
    changeChecked: () => {},
  },
});

const TodoProvider = ({ children }) => {
  const model = TodoModel();

  const value = {
    state: model.todos,
    actions: model.actions,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const { Consumer: TodoConsumer } = TodoContext;

export { TodoProvider, TodoConsumer };

export default TodoContext;
