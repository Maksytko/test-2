import { createPortal } from "react-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { changeDishForAdd, changeModalStatus } from "../../redux/actions";
import style from "./Modal.module.css";
import { getCurrentColumnForModal, getDishes } from "../../redux/selectors";

const modalRoot = document.getElementById("modal-root");

function Modal({ changeModalStatus, dishes, currentCulomn, changeDishForAdd }) {
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
              <li key={dish.title}>
                <p style={{ color: "white" }}>{dish.title}</p>
                <button
                  onClick={() => {
                    changeDishForAdd({
                      ...dish,
                      to: currentCulomn,
                    });
                  }}
                >
                  Добавить
                </button>
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
  changeDishForAdd: (dish) => dispatch(changeDishForAdd(dish)),
});

const mapStateToProps = (store) => ({
  dishes: getDishes(store),
  currentCulomn: getCurrentColumnForModal(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
