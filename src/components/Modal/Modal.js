import { createPortal } from "react-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { changeModalStatus } from "../../redux/actions";
import style from "./Modal.module.css";
import { getDishes } from "../../redux/selectors";

const modalRoot = document.getElementById("modal-root");

function Modal({ changeModalStatus, dishes, addDishToColumn }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  function handleKeydown(event) {
    if (event.code === "Escape") {
      changeModalStatus();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      changeModalStatus();
    }
  }

  return createPortal(
    <div onClick={handleBackdropClick} className={style.Overlay}>
      <div className={style.Modal}>
        <ul>
          {dishes.map((dish) => {
            return (
              <li>
                <p>{dish.title}</p>
                <button onClick={() => addDishToColumn(dish)}>add</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    modalRoot
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: () => dispatch(changeModalStatus()),
});

const mapStateToProps = (store) => ({
  dishes: getDishes(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
