import * as Setup from './setup'
import { incrementScore1, incrementScore2, incrementBounceCount} from './score'
import ballURL from './ball-final.png'

Crafty.c('Ball', {
  start ({ x, y, vx, vy }) {
    this.isCollidingWithPaddle = false
    this.addComponent('2D, Canvas, Color, Bounded, Solid, Collision, pingpongball')

    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy

    let ctx = this
    this.bind('moveBall', function (dt) {
      ctx.x += ctx.vx * (dt / 1000)
      ctx.y += ctx.vy * (dt / 1000)
      this.bounceOffWalls()

      // check for paddle collision
      var hitDatas
      var hitData
      if (hitDatas = this.hit('Paddle')) {
        if (!this.isCollidingWithPaddle) {
          this.vx *= -1
          this.vy += Setup.scaleY(30) * hitDatas[0].obj.movingDir
          incrementBounceCount()
        }
        this.isCollidingWithPaddle = true
      } else {
        this.isCollidingWithPaddle = false
      }

      // check for hits to walls
      if (this.x === Setup.bounds.left) {
        incrementScore2()
      }
      if (this.x === Setup.bounds.right - this.w) {
        incrementScore1()
      }
    })
  },
})