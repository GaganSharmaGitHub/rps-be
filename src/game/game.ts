import { chars, Entitty, scene, ScoreBoard } from "./interfaces"
import { hasCollided, moveToRandomAngle } from "./math"

export const moveBoard=(board: Entitty[])=>{
    for(let i =0;i<board.length;i++){
      scene.scoreBoard[chars[board[i][0]]]+=1
        board[i]= moveToRandomAngle(board[i])
    }
    for(let i =0;i<board.length;i++){
    for(let j =0;j<board.length;j++){
        if(i!=j){
            if(hasCollided(board[i], board[j]) && hasPower(board[i], board[j])){
                let ei = board[i]
                ei[0]= 3
                board[i]
            }
        }
    }
    }
}
export const cleanBoard=()=>{
    scene.board = scene.board.filter(e=> e[0] !== 3)
}
// e2 can kill e1
export const hasPower=(e1:Entitty,e2:Entitty)=>{
    if(e1[0] == 3 || e2[0] === 3 || e1[0]=== e2[0] ){
        return false
    }

    if(e1[0] === 1){
        return e2[0] === 2
    }else if(e1[0] === 2){
        return e2[0] === 0
    }
    return e2[0] === 1
}

export const getWinner = (scoreBoard: ScoreBoard)=>{
    if(scoreBoard["✂️"] == 0){
        return "🧻"
    }
    if(scoreBoard['🗿']== 0){
        return "✂️"
    }
    if(scoreBoard['🧻']==0){
        return "🗿"
    }
    return ''
}