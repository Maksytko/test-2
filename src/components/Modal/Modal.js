import { createPortal } from "react-dom";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDishForAdd, changeModalStatus } from "../../redux/actions";
import style from "./Modal.module.css";
import { getCurrentColumnForModal, getDishes } from "../../redux/selectors";

const modalRoot = document.getElementById("modal-root");

function Modal() {
  const dispatch = useDispatch();
  const dishes = useSelector(getDishes);
  const currentCulomn = useSelector(getCurrentColumnForModal);

  const handleKeydown = useCallback(
    (event) => {
      if (event.code === "Escape") {
        dispatch(changeModalStatus());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      dispatch(changeModalStatus());
    }
  }

  return createPortal(
    <div onClick={handleBackdropClick} className={style.Overlay}>
      <div className={style.Modal}>
        <button onClick={handleBackdropClick} className={style.exit_button}>
          X
        </button>
        <ul className={style.list}>
          {dishes.map((dish) => {
            return (
              <li key={dish.title} className={style.item}>
                <p className={style.text}>{dish.title}</p>
                <button
                  onClick={() =>
                    dispatch(
                      changeDishForAdd({
                        ...dish,
                        to: currentCulomn,
                      })
                    )
                  }
                  className={style.button}
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

export default Modal;
