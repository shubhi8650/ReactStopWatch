import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [active, setActive] = useState(false);
  const [background, setBackground] = useState({ back: "", colo: "" });

  const reset = () => {
    setActive(false);
    setSecond(0);
    setMinute(0);
    setCount(0);
  };

  useEffect(() => {
    let timer = null;
    if (active) {
      timer = setInterval(() => {
        if (count > 99) {
          setSecond((prev) => prev + 1);
          setCount(0);
        }
        if (second > 59) {
          setMinute((prev) => prev + 1);
          setSecond(0);
        } else {
          setCount((prev) => prev + 1);
        }
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [active, count, second]);

  const toggle = () => {
    background.back === "white"
      ? setBackground({ back: "", colo: "" })
      : setBackground({ back: "white", colo: "black" });
  };
  return (
    <div
      className="main-container"
      style={{ backgroundColor: background.back, color: background.colo }}
    >
      <h1>Stopwatch</h1>
      <div className="watch-container">
        <h1>{`${minute < 9 ? "0" + minute : minute}:${
          second < 9 ? "0" + second : second
        }:${count < 9 ? "0" + count : count}`}</h1>
      </div>
      <div className="btn">
        <button
          style={{ color: background.colo }}
          onClick={() => setActive(true)}
        >
          <b>Start</b>
        </button>
        <button
          style={{ color: background.colo }}
          onClick={() => setActive(false)}
        >
          <b>Stop</b>
        </button>
        <button
          style={{ color: background.colo }}
          onClick={() => setActive(true)}
        >
          <b>Resume</b>
        </button>
        <button style={{ color: background.colo }} onClick={reset}>
          <b>Reset</b>
        </button>
      </div>
      <div>
        <button
          style={{ color: background.colo }}
          className="toggle"
          onClick={toggle}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default App;
