import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  addDishes,
  changeDishForAdd,
  changeCurrentColumnForModal,
  changeModalStatus,
} from "./actions";

const initState = {
  dishes: [],
  dishForAdd: null,
  currentColumnForModal: null,
  modalStatus: false,
};

const dishesReducer = createReducer(initState.dishes, {
  [addDishes]: (_, { payload }) => payload,
});

const dishForAddReducer = createReducer(initState.dishForAdd, {
  [changeDishForAdd]: (_, { payload }) => payload,
});

const currentColumnForModalReducer = createReducer(
  initState.currentColumnForModal,
  {
    [changeCurrentColumnForModal]: (_, { payload }) => payload,
  }
);

const modalStatusReducer = createReducer(initState.modalStatus, {
  [changeModalStatus]: (state) => !state,
});

const reducer = combineReducers({
  dishes: dishesReducer,
  dishForAdd: dishForAddReducer,
  currentColumnForModal: currentColumnForModalReducer,
  modalStatus: modalStatusReducer,
});

export default reducer;
