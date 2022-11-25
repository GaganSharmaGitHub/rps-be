import { io } from ".."
import { BASE_SCORE_BOARD, PLAYERS } from "./data"
import { cleanBoard, getWinner, moveBoard } from "./game"
import { chars, resetBoard, resetGame, scene, users } from "./interfaces"

export const animate = () => {
  if (scene.type == 'message') {
    if (scene.timer<1) {
      scene.type = 'game'
      clearInterval(scene.setInterval)
      resetBoard()
      io.emit('type', scene.type)
    }
  }
  if(scene.type=='game'){
    scene.scoreBoard= BASE_SCORE_BOARD()
    moveBoard(scene.board)
    cleanBoard()
    let winner = getWinner(scene.scoreBoard)
    if(winner){
      resetGame(winner)
      for(const uid of Array.from(users.keys())){
        let user = users.get(uid)
        if(user){
          user.isWinner = winner == chars[user.bet]
          users.set(uid,user)
        io.emit('bets', Array.from(users.values()))
        }
      }

      io.emit('type', scene.type)
      io.emit('winner', scene.winner)
      io.emit('timer', scene.timer)
    }
    scene.scoreBoard["💀"] = (3* PLAYERS) - scene.board.length
    io.emit('scoreBoard',scene.scoreBoard)
    io.emit('board', scene.board)
  }
}