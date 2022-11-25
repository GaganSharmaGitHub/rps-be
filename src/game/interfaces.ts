import { io } from ".."
import { INTERVAL_TIME , PLAYERS , CANVAS_HEIGHT, CANVAS_WIDTH,BASE_SCORE_BOARD } from "./data"
import { randomAngle, randomPosition } from "./math"

export const chars = ["🗿", "🧻","✂️", "💀"] as const

export const charIndex = {
  "🗿":0,
  "🧻":1,
  "✂️":2
}
export let yourBet: typeof chars[number] = '🗿'
export let changeBet= (b:typeof chars[number]) => yourBet= b
// char,x,y,dir
export type Entitty = [0|1|2|3, number, number, number]

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
  bet: number
  isWinner: boolean
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
  let board:Entitty[] = []
  for(let i=0;i<3*PLAYERS;i++){
    board.push([
       i%3 as 0|1|2,
       randomPosition(CANVAS_WIDTH),
     randomPosition(CANVAS_HEIGHT),
    randomAngle()
    ])
    scene.scoreBoard[chars[i%3]]+=1
  }
  scene.board = board
  
}
resetBoard()
resetGame()
