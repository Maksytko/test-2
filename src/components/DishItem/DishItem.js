import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function DishItem({ text, id, columnTitle, index, moveCard }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      title: text,
      id,
      index,
      from: columnTitle,
    },
    type: "dish",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const [{ handlerId }, drop] = useDrop({
    accept: "dish",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        console.log(1);
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        console.log(2);
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        color: "black",
        border: "2px solid",
      }}
      data-handler-id={handlerId}
    >
      <p>{text}</p>
    </div>
  );
}

export default DishItem;
