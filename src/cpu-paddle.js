import * as Setup from './setup'
import * as Score from './score'

Crafty.c('CpuPaddle', {
  start ({ x, y, ball }) {
    var ctx = this
    this.addComponent('Paddle')
    this.cpuSpeed = Setup.scaleY(25)
    this.startPaddle({
      x,
      y
    })
    this.yv = 0
    this.ball = ball
    this.pid = {
      p: 0.1,
      i: 0.001,
      iAccumulator: 0,
      iCap: 2,
      d: 0.1,
      error () {
        var ballPredictedY = Setup.bounds.bottom / 2
        let ballCenterY = ball.y + ball.h / 2
        let ballCenterX = ball.x + ball.w / 2
        if (ball.vx > 0) {
          ballPredictedY = ballCenterY + ball.vy * ((Setup.bounds.right - ballCenterX) / (ball.vx))
          if (ballPredictedY < Setup.bounds.top - 200 || ballPredictedY > Setup.bounds.bottom + 200) {
            ballPredictedY = Setup.bounds.bottom / 2
          }
        }
        let paddleCenterY = ctx.y + ctx.h / 2
        return (ballPredictedY - paddleCenterY)
      },
      step () {
        this.iAccumulator = Math.min(this.iAccumulator + this.error() * this.i, this.iCap)
        return this.error() * this.p + this.iAccumulator
      }
    }
    this.bind('movePaddles', function (dt) {
      if (ctx.ball !== undefined) {
        if (Score.cpuMode === 1) {
          ctx.yv = ctx.pid.step()
          ctx.y += ctx.yv
        } else {
          ctx.y += (Math.sign(ball.y - ctx.y) * ctx.cpuSpeed * (dt / 1000))
        }
      }
    })
  }
})
