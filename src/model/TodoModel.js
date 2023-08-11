import { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getAccessToken } from '../cookie/Cookie';
import { authAxiosInstance } from '../axios/axiosInstance';

const reducerTodo = (todos, action) => {
  switch (action.type) {
    case 'ALL_LIST_TODO':
      return action.todos;
    case 'ADD_TODO':
      return todos.concat(action.todo);
    case 'REMOVE_TODO':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_CHECKED':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
};

function TodoModel() {
  const [todos, dispatch] = useReducer(reducerTodo, []);
  const accesstoken = getAccessToken();
  console.log(accesstoken);
  useEffect(() => {
    todoList();
  }, []);

  const todoList = () => {
    authAxiosInstance('api/v1/todoList').then((response) => {
      console.log(response);
      dispatch({
        type: 'ALL_LIST_TODO',
        todos: response.data,
      });
    });
  };

  // const insertTodo = useCallback((value) =>
  //   authAxiosInstance(
  //     'api/v1/insert',
  //     {
  //       checked: false,
  //       title: value,
  //     },
  //     {
  //       headers: { Authorization: accesstoken },
  //     },
  //   ).then((response) => {
  //     console.log(response);
  //   }),
  // );

  const insertTodo = useCallback((value) => {
    axios
      .post(
        'api/v1/insert',
        {
          checked: false,
          title: value,
        },
        {
          headers: { Authorization: accesstoken },
        },
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: 'ADD_TODO',
          todo: {
            id: response.data,
            checked: false,
            title: value,
          },
        });
      });
  }, []);

  const removeTodo = useCallback((id) => {
    axios
      .put(
        'api/v1/delete',
        {
          id: id,
        },
        {
          headers: { 'Content-type': 'application/json' },
        },
      )
      .then((response) => {
        if (parseInt(response.data) === 1) {
          dispatch({
            type: 'REMOVE_TODO',
            id: id,
          });
        }
      });
  }, []);

  const changeChecked = useCallback((id, checked) => {
    axios
      .put(
        'api/v1/update',
        {
          id: id,
          checked_yn: checked ? 'N' : 'Y',
        },
        {
          headers: { 'Content-type': 'application/json' },
        },
      )
      .then((response) => {
        if (parseInt(response.data) === 1) {
          dispatch({
            type: 'TOGGLE_CHECKED',
            id: id,
          });
        }
      });
  }, []);

  return { todos, actions: { removeTodo, insertTodo, changeChecked } };
}

export default TodoModel;
