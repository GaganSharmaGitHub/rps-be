import { CANVAS_HEIGHT, CANVAS_WIDTH, SPEED } from "./data"
import { Entitty } from "./interfaces"

export const randomPosition=(l: number)=>{
    return Math.floor(Math.random()* l)
  }
  
export const randomAngle=()=>{
  return Math.random() * 2 * Math.PI
}

export const moveToRandomAngle=(e:Entitty): Entitty=>{
    let shouldChangeDir = Math.floor(Math.random()*50)
    let direction = shouldChangeDir?e[3]:  randomAngle()
    let nx=e[1]+ SPEED* Math.sin(direction)
    let ny = e[2] + SPEED* Math.cos(direction)
    if(nx<=0 || nx>= CANVAS_WIDTH || ny<=0 || ny>= CANVAS_HEIGHT){
      direction += Math.PI
      nx=e[1]+ SPEED* Math.sin(direction)
      ny = e[2] +SPEED* Math.cos(direction)
     
    }
    return [e[0], nx,ny,direction]
  }
export const collisionBox = 60
export const hasCollided=(e1: Entitty, e2: Entitty)=>{
  let l1 = {
    x: e1[1],
    y: e1[2]-collisionBox/2
  }
  let r1 = {
    x: e1[1] + collisionBox,
    y: e1[2] + collisionBox/2
  }
  
  if(isInbetween(l1.x,r1.x, e2[1]) || isInbetween(l1.x,r1.x,e2[1] + collisionBox)){
    return isInbetween(l1.y,r1.y, e2[2]- collisionBox/2) || isInbetween(l1.y,r1.y, e2[2] + collisionBox/2)
  }
  return false
}
const isInbetween=(sm:number,lg:number,nm:number)=>{
  return nm >= sm && nm<= lg
}