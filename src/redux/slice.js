import { createSlice } from '@reduxjs/toolkit'
let fruits = ["apple", "banana", "cherry", "pinapple", "strawberry"]
export const movementSlice = createSlice({
    name: "movement",
    initialState: {
        position: 0,
        selectedFruit: fruits[parseInt(Math.random() * fruits.length - 1)],
        intervalTime: 2500,
        dropInterval: 500,
        isPlaying: true,
        lives: 3,
        intervals: [],
        score: 0,
        gameOver: false
    },
    reducers: {
        left: state => {
            if (state.position > 0)
                state.position -= 10
        },
        right: state => {
            state.position += 10
        },
        setRandomFruit: state => {
            state.selectedFruit = fruits[parseInt(Math.random() * fruits.length - 1)]
        },
        increaseLevel: state => {
            state.intervalTime -= 20
        },
        dropInterval: state => {
            state.dropInterval -= 10
        },
        setIsPlaying: state => {
            state.isPlaying = !state.isPlaying
        },
        setLives: state => {
            state.lives -= 1
        },
        setIntervals: (state, interval) => {
            state.intervals.push(interval.payload)
        },
        setScore: state => {
            state.score += 1
        },
        setGameOver: state => {
            state.gameOver = true
        }

    }
})

export const { left, right, setRandomFruit, increaseLevel, dropInterval, setIsPlaying, setLives, setScore } = movementSlice.actions

