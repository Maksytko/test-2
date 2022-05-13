import { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import {
  changeCurrentColumnForModal,
  changeModalStatus,
} from "../../redux/actions";
import { getDishForAdd } from "../../redux/selectors";
import DishItem from "../DishItem/DishItem";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

const style = {
  height: "500px",
  width: "1000px",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  backgroundColor: "blue",
  padding: "1rem",
};

function DishesColumn({
  title,
  dishForDelete,
  setDishForDelete,
  changeCurrentColumnForModal,
  dishForAdd,
  changeModalStatus,
}) {
  const [dishes, setDishes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: "dish",
    drop: (item) => {
      if (item.from !== title) {
        setDishes((prevState) => [...prevState, { ...item }]);
        setDishForDelete(item);
      }
    },
    hover: (item) => setSelectedItem(item),
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
              [hoverIndex, 0, selectedItem],
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
    <div ref={drop} style={{ ...style }}>
      <p>{title}</p>
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
      <button
        onClick={() => {
          changeCurrentColumnForModal(title);
          changeModalStatus();
        }}
      >
        Добавить блюдо
      </button>
    </div>
  );
}

const mapStateToProps = (store) => ({
  dishForAdd: getDishForAdd(store),
});

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: () => dispatch(changeModalStatus()),
  changeCurrentColumnForModal: (title) =>
    dispatch(changeCurrentColumnForModal(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishesColumn);
