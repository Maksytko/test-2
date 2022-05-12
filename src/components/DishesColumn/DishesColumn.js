import { useState } from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { changeModalStatus } from "../../redux/actions";

import DishItem from "../DishItem/DishItem";

const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  backgroundColor: "blue",
  padding: "1rem",
};

function DishesColumn({ title, changeModalStatus }) {
  const [dishes, setDishes] = useState([
    { title: "борщ" },
    { title: "гречневая каша" },
    { title: "пицца" },
  ]);
  const [{ item }, drop] = useDrop(() => ({
    accept: "dish",
    drop: (item) => {
      setDishes([...dishes, item]);
    },
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
  }));

  console.log(item);

  // function checkDishes(item) {
  //   if (item) {
  //     const result = dishes.find((dish) => dish.title === item.title);

  //     if (!result) {
  //       setDishes([...dishes, item]);
  //       return;
  //     }
  //     return;
  //   }
  // }

  return (
    <div ref={drop} style={{ ...style }}>
      <p>{title}</p>
      {dishes.map((dish) => (
        <DishItem text={dish.title} title={title} key={dish.title} />
      ))}
      <button onClick={changeModalStatus}></button>
    </div>
  );
}

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: () => dispatch(changeModalStatus()),
});

export default connect(null, mapDispatchToProps)(DishesColumn);
