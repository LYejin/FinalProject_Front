import { TodoProvider } from '../../contexts/TodoContext';
import TodoTemplate from '../../components/layout/todo/todoTemplate/TodoTemplate';
import TodoInsert from '../../components/feature/todo/todoInsert/TodoInsert';
import TodoList from '../../components/feature/todo/todoList/TodoList';

function Todo() {
  return (
    <TodoProvider>
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default Todo;
