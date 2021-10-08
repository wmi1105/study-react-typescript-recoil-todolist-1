import { atom, selector, selectorFamily } from "recoil";
import { dateFormat } from "../util/util";

export const filterOptions = [
  { code: "all", text: "전체" },
  { code: "complete", text: "완료" },
  { code: "uncomplete", text: "비완료" },
];

export interface TodoTypes {
  id: number;
  cardId: number;
  contents: string;
  complete: boolean;
}

export interface CardTypes {
  cardId: number;
  filter: string;
  // todos: TodoTypes[];
}

export const todoState = atom<TodoTypes[]>({
  key: "todos",
  default: [
    {
      id: 1,
      cardId: 1,
      contents: "해야할 일",
      complete: true,
    },
    {
      id: 2,
      cardId: 1,
      contents: "해야할 일2",
      complete: false,
    },
    {
      id: 3,
      cardId: 2,
      contents: "해야할 일23",
      complete: false,
    },
  ],
});

export const cardState = atom<CardTypes[]>({
  key: "cards",
  default: [
    {
      cardId: 1,
      filter: "all",
    },
    {
      cardId: 2,
      filter: "all",
    },
  ],
});

export const getTodoList = selector({
  key: "getTodoList",
  get: ({ get }) => {
    const cards = get(cardState); //cardType
    const todos = get(todoState); //todoType

    return cards.map((card) => {
      const cardId = card.cardId;
      const rows = todos.filter((todo) => todo.cardId === cardId);
      return { cardId, todos: arrayFilter(card.filter, rows)};
    });
  },
});

// export const getNextCardNumber = selector({
//   key: "getTodoList",
//   get: ({ get }) => {
//     const cards = get(cardState);
//     return Math.max(...cards.map(card => card.index)) +1
//   }
// })

// export const getUnfilteredList = selector({
//   key: 'getUnfilteredList',
//   get: ({get}) => {
//     const cards = get(cardState)
//     return cards.mapp....
//   }
// })

function arrayFilter(filter: string, rows: TodoTypes[]){
  if (filter === "complete") return rows.filter((todo) => todo.complete);
  else if (filter === "uncomplete") return rows.filter((todo) => !todo.complete);
  else return rows;
}

export const toggleComplete = selectorFamily<TodoTypes[], number>({
  key: "toggleComplete",
  get:
    () =>
    ({ get }) => {
      return get(todoState);
    },
  set:
    (id) =>
    ({ set }) => {
      set(todoState, (prevState) =>
        prevState.map((todo: TodoTypes) =>
          todo.id !== id ? todo : { ...todo, complete: !todo.complete }
        )
      );
    },
});

export const addTodo = selector<TodoTypes[]>({
  key: "addTodo",
  get: ({ get }) => {
    return get(todoState);
  },
  set: ({ set }, contents) => {
    set(todoState, contents);
  },
});
