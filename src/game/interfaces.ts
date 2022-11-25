import { io } from ".."
import { INTERVAL_TIME , PLAYERS , CANVAS_HEIGHT, CANVAS_WIDTH,BASE_SCORE_BOARD } from "./data"
import { randomAngle, randomPosition } from "./math"

export const chars = ["🗿", "🧻","✂️"] as const

export let yourBet: typeof chars[number] = '🗿'
export let changeBet= (b:typeof chars[number]) => yourBet= b

export interface Entitty{
    x: number,
    y: number,
    direction: number
    char: (typeof chars[number]) | "💀"
  }
export interface Scene{
  type: 'game' | 'message'
  timer: number
  board: Entitty[]
  winner: string
  scoreBoard:ScoreBoard
  setInterval?: any 
}
export interface ScoreBoard{
  "🗿": number
  "🧻":number
  "✂️": number
  "💀": number
}
export const scene:Scene={
type: 'message',
timer: 10,
board: [],
scoreBoard:BASE_SCORE_BOARD(),
winner:''
}
export interface User{
  userId: string
  bet: typeof chars[number]
}

export const users = new Map<string, User>()

export const resetGame = (winner?: string)=>{
  scene.type= 'message'
  scene.timer= INTERVAL_TIME
  scene.winner= winner ||""
  scene.setInterval = setInterval(()=>{
    io.emit('timer', scene.timer)
    scene.timer-=1
  }, 1000)
}
export const resetBoard = ()=>{
  scene.scoreBoard=BASE_SCORE_BOARD()
  let board = []
  for(let i=0;i<3*PLAYERS;i++){
    board.push({
      char: chars[i%3],
      x: randomPosition(CANVAS_WIDTH),
      y: randomPosition(CANVAS_HEIGHT),
      direction: randomAngle()
    })
    scene.scoreBoard[chars[i%3]]+=1
  }
  scene.board = board
  
}
resetBoard()
resetGame()
