import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  addDishes,
  changeCurrentColumnDishes,
  changeModalStatus,
} from "./actions";

const initState = {
  dishes: [],
  currentColumnDishes: [],
  dishForAdd: null,
  modalStatus: false,
};

const dishesReducer = createReducer(initState.dishes, {
  [addDishes]: (_, { payload }) => payload,
});

const currentColumnDishesReducer = createReducer(
  initState.currentColumnDishes,
  {
    [changeCurrentColumnDishes]: (_, { payload }) => payload,
  }
);

const modalStatusReducer = createReducer(initState.modalStatus, {
  [changeModalStatus]: (state) => !state,
});

const reducer = combineReducers({
  dishes: dishesReducer,
  currentColumnDishes: currentColumnDishesReducer,
  modalStatus: modalStatusReducer,
});

export default reducer;
