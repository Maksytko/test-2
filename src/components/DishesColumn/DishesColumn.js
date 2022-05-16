import { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";
import style from "./DishesColumn.module.css";

import {
  changeCurrentColumnForModal,
  changeModalStatus,
} from "../../redux/actions";
import { getDishForAdd } from "../../redux/selectors";
import DishItem from "../DishItem/DishItem";

function DishesColumn({ title, dishForDelete, setDishForDelete }) {
  const dispatch = useDispatch();
  const dishForAdd = useSelector((store) => getDishForAdd(store));
  const [dishes, setDishes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: "dish",
    drop: (item) => {
      if (item.from !== title) {
        setDishes((prevState) => [
          ...prevState,
          { title: item.title, id: item.id },
        ]);
        setDishForDelete(item);
      }
    },
    hover: (item) => setSelectedItem({ title: item.title, id: item.id }),
  }));

  useEffect(() => {
    if (dishForDelete?.from === title) {
      setDishes((prevState) => {
        return prevState.filter((dish) => dish.id !== dishForDelete.id);
      });
      setDishForDelete(null);
    }
  }, [dishForDelete, setDishForDelete, title]);

  useEffect(() => {
    if (dishForAdd?.to === title) {
      setDishes((prevState) => [
        ...prevState,
        { title: dishForAdd.title, id: uuidv4() },
      ]);
    }
  }, [dishForAdd, title]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setDishes((prevCards) => {
        if (prevCards.find((dish) => dish.id === selectedItem.id)) {
          return update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          });
        } else {
          return prevCards;
        }
      });
    },
    [selectedItem]
  );

  return (
    <div ref={drop} className={style.div}>
      <p className={style.title}>{title}</p>
      <button
        className={style.button}
        onClick={() => {
          dispatch(changeCurrentColumnForModal(title));
          dispatch(changeModalStatus());
        }}
      >
        Добавить блюдо
      </button>
      {dishes?.map((dish, i) => (
        <DishItem
          text={dish.title}
          id={dish.id}
          index={i}
          columnTitle={title}
          key={dish.id}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
}

export default DishesColumn;
