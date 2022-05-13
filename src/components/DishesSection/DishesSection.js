import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./DishesSection.module.css";

import fetchDishes from "../../api/api";

import { addDishes } from "../../redux/actions";
import { getModalStatus } from "../../redux/selectors";
import DishesColumn from "../DishesColumn/DishesColumn";
import Modal from "../Modal/Modal";

function DishesSection({ addDishes, modalStatus }) {
  const [dishForDelete, setDishForDelete] = useState(null);

  useEffect(() => {
    const data = fetchDishes();
    const parsedData = JSON.parse(data);
    addDishes(parsedData);
  }, [addDishes]);

  function setDish(dish) {
    setDishForDelete(dish);
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <section className={style.section}>
          <DishesColumn
            title="обед"
            dishForDelete={dishForDelete}
            setDishForDelete={setDish}
          />
          <DishesColumn
            title="завтрак"
            dishForDelete={dishForDelete}
            setDishForDelete={setDish}
          />
        </section>
      </DndProvider>
      {modalStatus && <Modal />}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addDishes: (data) => dispatch(addDishes(data)),
});

const mapStateToProps = (store) => ({
  modalStatus: getModalStatus(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishesSection);
