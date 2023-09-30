import { useEffect } from 'react';
import './App.css';
import { dropFruit, move } from './helper/move';
import store from "./redux/store"

function App() {
  let timeout
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
          <h3>Score: 0</h3>
        </div>
        <div className='allergy'>
          <button onClick={() => {
            if (!timeout) {
              dropFruit()
              start()
            }
          }}>Start</button>
          <button>Pause</button>
          <button>Restart</button>
        </div>
      </div>
      <div className='hero-section'>
        <div id="canvas"></div>
        <img src="/img/hero.png" width={150} height={150} id="hero" className='hero' alt="hero" />
      </div>
    </div>
  );
}

export default App;
