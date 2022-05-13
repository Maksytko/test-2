const getDishes = (store) => store.dishes;

const getDishForAdd = (store) => store.dishForAdd;

const getCurrentColumnForModal = (store) => store.currentColumnForModal;

const getModalStatus = (store) => store.modalStatus;

export { getDishes, getDishForAdd, getCurrentColumnForModal, getModalStatus };
