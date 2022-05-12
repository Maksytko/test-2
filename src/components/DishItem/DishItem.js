import { useDrag } from "react-dnd";

function DishItem({ text }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      title: text,
    },
    type: "dish",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        color: "black",
      }}
    >
      <p>{text}</p>
    </div>
  );
}

export default DishItem;
