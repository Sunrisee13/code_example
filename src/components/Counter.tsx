import React, { useState } from "react";
import classes from "./Counter.module.scss";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <button
        className={classes.button}
        onClick={() => setCounter((prev) => prev - 1)}
      >
        -
      </button>
      <div>{counter}</div>
      <button
        className={classes.button}
        onClick={() => setCounter((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
};
