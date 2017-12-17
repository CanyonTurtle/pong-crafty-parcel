import * as Setup from './setup'

// both players use the paddle component 
Crafty.c('Paddle', {
  startPaddle ({ up, down, x, y }) {
    this.addComponent('2D, Canvas, Color, Keyboard, Bounded, Solid')
    this.speed = Setup.scaleX(60)
    this.w = Setup.scaleX(1.5)
    this.h = Setup.scaleY(15)

    // Used to determine what happens when the ball hits the paddle.
    this.movingDir = 0

    // lexically scoped 'this' ref because the Crafty.js binding system seems to shadow regular es6 Function.prototype.bind?? call didn't work either.
    let ctx = this
    this.bind('movePaddles', (function (dt) {
      // keyboard controls. 
      if (this.isDown(up)) {
        ctx.y -= ctx.speed * (dt / 1000)
        this.movingDir = -1
      } else if (this.isDown(down)) {
        ctx.y += ctx.speed * (dt / 1000)
        this.movingDir = 1
      } else {
        this.movingDir = 0
      }
      this.restrict.call(this)
    }))
    this.place.call(this, x, y)
  },
  place (x, y) {
    this.x = x
    this.y = y
    return this
  }
})