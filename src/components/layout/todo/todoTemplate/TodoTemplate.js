import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
      <h2>하이</h2>
    </div>
  );
};

export default TodoTemplate;
