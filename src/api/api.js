const dishes = [
  { title: "борщ" },
  { title: "гречневая каша" },
  { title: "пицца" },
];

function fetchDishes() {
  return JSON.stringify(dishes);
}

export default fetchDishes;
