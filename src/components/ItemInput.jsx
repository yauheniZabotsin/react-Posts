import { useState } from "react";

function ItemInput() {
  let [value, setValue] = useState("Text");

  return (
    <div>
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>
    </div>
  );
}

export default ItemInput;
