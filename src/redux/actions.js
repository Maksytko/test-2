import { createAction } from "@reduxjs/toolkit";

const addDishes = createAction("dishes/add");

const changeDishForAdd = createAction("dishForAdd/change");

const changeCurrentColumnForModal = createAction(
  "currentColumnForModal/change"
);

const changeModalStatus = createAction("modalStatus/change");

export {
  addDishes,
  changeDishForAdd,
  changeCurrentColumnForModal,
  changeModalStatus,
};
