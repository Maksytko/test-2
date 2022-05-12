import { createAction } from "@reduxjs/toolkit";

const addDishes = createAction("dishes/add");

const changeCurrentColumnDishes = createAction("currentCulomnDishes/change");

const changeModalStatus = createAction("modalStatus/change");

export { addDishes, changeCurrentColumnDishes, changeModalStatus };
