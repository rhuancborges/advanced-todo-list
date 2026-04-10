import { useState } from "react";
import {Meteor} from "meteor/meteor";
export const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const handleLogout =  () => {
        Meteor.logout();
  }

  return (
    <div className="card counter-card">
      <div className="counter-content">
        <button className="button" onClick={increment}>
          Click Me
        </button>
        <p className="counter-text">
          You've pressed the button{" "}
          <span className="counter-value">{counter}</span>{" "}
          {counter === 1 ? "time" : "times"}.
        </p>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
