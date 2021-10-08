import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { getTodoList, TodoTypes } from "../../store/TodoState";

interface PropTypes {
  cardId: number;
}

export default function TodoList({ cardId }: PropTypes) {
  const todoList = useRecoilValue(getTodoList);
  const [rows, setRows] = useState<TodoTypes[]>([]);

  useEffect(() => {
    const items = todoList.filter((item) => item.cardId === cardId);

    const empty: TodoTypes = {
      id: 0,
      cardId: cardId,
      contents: "",
      complete: false,
    };

    setRows([...items[0].todos, empty]);
  }, [cardId, todoList]);

  return (
    <TodoListWrap>
      {rows.map((todo: TodoTypes) => {
        const { id, contents, complete, cardId } = todo;
        return (
          <TodoItem
            key={id}
            id={id}
            cardId={cardId}
            contents={contents}
            complete={complete}
          />
        );
      })}
    </TodoListWrap>
  );
}

const TodoListWrap = styled.div`
  width: 100%;
  padding: 3px 20px;
  box-sizing: border-box;
  height: 150px;
  overflow-y: auto;
  margin-top: 5px;
`;
