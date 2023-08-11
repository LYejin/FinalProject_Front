import React, { useContext } from 'react';
import TodoListItem from '../../../layout/todo/todoListItem/TodoListItem';
import './TodoList.scss';
import { List } from 'react-virtualized';
import TodoContext from '../../../../contexts/TodoContext';

const TodoList = () => {
  const { state } = useContext(TodoContext);
  const rowRenderer = ({ index, key, style }) => {
    const todo = state[index];
    return <TodoListItem todo={todo} key={key} style={style} />;
  };
  return (
    <List
      className="TodoList"
      width={512}
      height={513}
      rowCount={state.length}
      rowHeight={57} // 하나의 크기, border 포함
      rowRenderer={rowRenderer}
      //list={model.state.list} 이게 중요한 게 아니었당
      style={{ outline: 'none' }}
    />
  );
};

export default React.memo(TodoList);
