import { useEffect, useState } from 'react';
import './App.css';
import { dropFruit, move } from './helper/move';
import store from "./redux/store"

function App() {
  let timeout

  let [score, setScore] = useState(0);
  let [lifeCount, setLives] = useState(3);
  let [gameOver, setGameOver] = useState("none")
  useEffect(() => {
    let hero = document.getElementById('hero');
    document.removeEventListener("keydown", () => { })
    document.addEventListener('keydown', (e) => move(e, hero))

  }, [])

  function start() {
    timeout = setInterval(() => {
      dropFruit()
    }, store.getState().intervalTime)
  }

  store.subscribe(() => {
    setLives(store.getState().lives)
    setScore(store.getState().score);
    if (store.getState().gameOver) {
      setGameOver("")
    }
  })

  let lives = [];
  for (let i = 0; i < lifeCount; i++) {
    lives.push("/img/heart.png")
  }

  return (
    <div className='board'>
      <div className='allergy-container'>
        <div className='allergy'>
          <h4>Allergic To</h4>
          <div className='image'>
            <img src={`/img/fruits/${store.getState().selectedFruit}.png`} width={"90%"} alt="allergy" />
          </div>
        </div>
        <div className='allergy'>
          <div style={{ display: 'flex' }}>
            {lives.map((item, index) => {
              return <img key={index} src={item} alt={item} width={50} style={{ marginLeft: 10 }} />
            })}
          </div>
        </div>
        <div className='allergy'>
          <h3>Score: {score}</h3>
        </div>
        <div className='allergy'>
          <button onClick={() => {
            if (!timeout) {
              dropFruit()
              start()
            }
          }}>Start</button>
          <button>Pause</button>
          <button onClick={() => store.dispatch(setScore())}>Restart</button>
        </div>
      </div>
      <div className='hero-section'>
        <div id="canvas"></div>
        <div className='gameOver' style={{ display: gameOver }}></div>
        <img src="/img/hero.png" width={150} height={150} id="hero" className='hero' alt="hero" />
      </div>
    </div>
  );
}

export default App;
