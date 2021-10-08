import React, {useEffect, useMemo} from "react";
import { CardTypes, todoState, TodoTypes, cardState } from "./../../store/TodoState";
import { useRecoilState } from "recoil";

export function useCardCtrl(cardId:number) {
  const [cards, setCards] = useRecoilState<CardTypes[]>(cardState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);

  const onAddCard = (): void => {
      const newCard : CardTypes = {
          cardId : cards[cards.length-1].cardId +1,
          filter: 'all'
      }
      setCards([...cards, newCard])
  };

  const onRemoveCard = (): void => {
    setTodos(todos.filter(todo => todo.cardId !== cardId));
    setCards(cards.filter(card => card.cardId !== cardId));
  }

  const onFilter = (code: string): void => {
    if (cardId > 0) {
      setCards(cards.map((card) => {
          return card.cardId !== cardId ? card : { ...card, filter: code };
        })
      );
    } else {
      setCards(cards.map((card) => ({ ...card, filter: code })));
    }
  };

  const getFilterValue = useMemo(():string => {
      const card = cards.find(card => card.cardId === cardId);
      return card ? card.filter:"all";
  }, [cardId, cards])

//   useEffect(() => {
//     console.log(cards);
//   }, [cards])

  return {
    onAddCard,
    onFilter,
    onRemoveCard,
    getFilterValue
  };
}
