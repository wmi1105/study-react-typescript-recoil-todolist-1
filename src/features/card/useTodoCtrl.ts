import React, {useEffect} from "react";
import { TodoTypes, todoState } from "./../../store/TodoState";
import { useRecoilState } from "recoil";

export function useTodoCtrl() {
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);

  const onAddTodo = (cardId : number, todoId : number, contents : string) : string => {
    const find = todos.find(todo => todo.id === todoId)
    if(find){
        //수정
        setTodos(todos.map(todo => todo.id !== todoId ? todo : {...todo, contents }));
        return contents;
    }else{
        const newTodo: TodoTypes = {
            id : todos[todos.length-1].id + 1,
            cardId : cardId,
            contents : contents,
            complete : false
        }

        setTodos([...todos, newTodo]);
        return "";
    }
  }

  //완료 체크 토글
  const onToggleComplete = (todoId : number) : void=> {
    setTodos(
      todos.map((todo) =>
        todo.id !== todoId ? todo : { ...todo, complete: !todo.complete }
      )
    );
  };

  //todo 삭제
  const onRemoveTodo = (todoId : number) : void => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

//   useEffect(() => {
//     console.log(todos);
//   }, [todos])

  return {
    onAddTodo,
    onToggleComplete,
    onRemoveTodo
  };
}
