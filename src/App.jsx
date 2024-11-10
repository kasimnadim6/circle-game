import { useState } from 'react';
import './App.css';
import Circle from './Circle';

function App() {
  const COLORS = [
    '#2c3e50',
    '#34495e',
    '#c0392b',
    '#e74c3c',
    '#27ae60',
    '#3498db',
    '#f39c12',
    '#f1c40f',
  ];

  const [circles, setCircles] = useState([]);
  const [recentlyDeletedCircles, setRecentlyDeletedCircles] = useState([]);

  const undo = () => {
    const copyCircles = [...circles];
    const deletedCircle = copyCircles.pop();
    setRecentlyDeletedCircles((prev) => [...prev, deletedCircle]);
    setCircles(copyCircles);
  };
  const redo = () => {
    if (recentlyDeletedCircles.length > 0) {
      const copyCircles = [...recentlyDeletedCircles];
      const deletedCircle = copyCircles.pop();
      setCircles((prev) => [...prev, deletedCircle]);
      setRecentlyDeletedCircles(copyCircles);
    }
  };
  const reset = () => {
    setCircles([]);
    setRecentlyDeletedCircles([]);
  };

  const createCircle = (event) => {
    const container = document.getElementById('circles-container');
    // const containerLeft = container.getBoundingClientRect().left; // this is needed only of circle-container is relatively-positioned
    // const containerTop = container.getBoundingClientRect().top;

    const { clientX, clientY } = event;
    const id = +new Date();
    setCircles((prev) => [
      ...prev,
      {
        id,
        // xAxis: clientX - containerLeft,
        // yAxis: clientY - containerTop,
        xAxis: clientX,
        yAxis: clientY,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
    ]);
  };
  return (
    <>
      <p>
        <a href="https://www.devtools.tech/questions/s/how-to-build-circles-game-in-react-js-frontend-coding-challenge---qid---Y8acly7B5CmIVAaT5knP?utm_source=social-share">
          How to build Circles Game in React.js? Frontend Coding Challenge
        </a>
      </p>
      <div
        id="circles-container"
        className="circles-container"
        onClick={createCircle}
      >
        {circles.map((circle, circleIdx) => (
          <Circle key={circleIdx} {...circle} />
        ))}

        <div className="actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-undo"
            disabled={circles.length <= 0}
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="btn btn-redo"
            disabled={recentlyDeletedCircles.length <= 0}
            onClick={redo}
          >
            Redo
          </button>
          <button className="btn btn-reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
