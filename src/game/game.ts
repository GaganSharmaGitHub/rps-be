import { Entitty, scene, ScoreBoard } from "./interfaces"
import { hasCollided, moveToRandomAngle } from "./math"

export const moveBoard=(board: Entitty[])=>{
    for(let i =0;i<board.length;i++){
      scene.scoreBoard[board[i].char]+=1
        board[i]= moveToRandomAngle(board[i])
    }
    for(let i =0;i<board.length;i++){
    for(let j =0;j<board.length;j++){
        if(i!=j){
            if(hasCollided(board[i], board[j]) && hasPower(board[i], board[j])){
                let ei = board[i]
                ei.char= '💀'
                board[i]
            }
        }
    }
    }
}
export const cleanBoard=()=>{
    scene.board = scene.board.filter(e=> e.char !== '💀')
}
// e2 can kill e1
export const hasPower=(e1:Entitty,e2:Entitty)=>{
    if(e1.char === "💀" || e2.char ==="💀" || e1.char=== e2.char ){
        return false
    }

    if(e1.char === "🧻"){
        return e2.char === "✂️"
    }else if(e1.char === "✂️"){
        return e2.char === "🗿"
    }
    return e2.char === "🧻"
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