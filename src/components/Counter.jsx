import { useState } from "react";

const Counter = () => {
  let [count, setCount] = useState(10);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>плюс</button>
      <button onClick={decrement}>минус</button>
    </div>
  );
};

export default Counter;
