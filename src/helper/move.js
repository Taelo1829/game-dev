import store from "../redux/store"
import { left, right, setLives, setScore } from "../redux/slice"
import { useDispatch } from "react-redux";

store.subscribe(() => { })
export function move(e, pic) {
    let parentElement = pic.parentElement;
    let parentWidth = parentElement.getClientRects()[0].width;
    if (e.key === "a" || e.key === "ArrowLeft") {
        pic.style.transform = "scaleX(1)"
        store.dispatch(left())
    } else if (e.key === "d" || e.key === "ArrowRight") {
        if (store.getState().position < parentWidth - 155)
            store.dispatch(right())
        pic.style.transform = "scaleX(-1)"
    }
    let value = store.getState().position;
    pic.style.left = value + "px"
}

export function dropFruit() {
    let canvas = document.getElementById("canvas");
    let canvasWidth = canvas.getClientRects()[0].width - 155
    let canvasHeight = canvas.getClientRects()[0].height - 155
    let fruits = ["apple", "banana", "cherry", "pinapple", "strawberry"]
    let selectedFruit = fruits[parseInt(Math.random() * fruits.length - 1)]
    let hero = document.getElementById("hero")
    let fruit = document.createElement("img")
    fruit.width = 50
    fruit.style.position = "absolute"
    fruit.style.left = Math.random() * canvasWidth + "px"
    fruit.style.top = "0px"
    fruit.src = `/img/fruits/${selectedFruit}.png`
    canvas.appendChild(fruit);

    let isPlaying = store.getState().isPlaying;
    let interval = store.getState().dropInterval
    let timeout;
    if (isPlaying) {
        timeout = setInterval(() => {
            let height = parseInt(fruit.style.top.split("px")[0]);
            if (height < canvasHeight) {
                fruit.style.top = height + 30 + "px"
            } else {
                let fruitPosition = splitPx(fruit.style.left);
                let heroPositionStart = splitPx(hero.style.left);
                let heroPositionEnd = heroPositionStart + hero.getClientRects()[0].width
                let fruitEaten = fruitPosition > heroPositionStart && fruitPosition < heroPositionEnd
                if (fruitEaten) {
                    if (selectedFruit === store.getState().selectedFruit) {
                        store.dispatch(setLives())
                    } else {
                        store.dispatch(setScore())
                    }
                }
                stopFruit()
            }
        }, interval)
    }

    function stopFruit() {
        fruit.style.display = "none"
        clearInterval(timeout)
    }

}

function splitPx(number) {
    return parseInt(number.split("px")[0])
}