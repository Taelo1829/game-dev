import { createSlice } from '@reduxjs/toolkit'
let fruits = ["apple", "banana", "cherry", "pinapple", "strawberry"]
export const movementSlice = createSlice({
    name: "movement",
    initialState: {
        position: 0,
        selectedFruit: fruits[parseInt(Math.random() * fruits.length - 1)],
        intervalTime: 5000,
        dropInterval: 1000,
        isPlaying: true
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
        }
    }
})

export const { left, right, setRandomFruit, increaseLevel, dropInterval, setIsPlaying } = movementSlice.actions

