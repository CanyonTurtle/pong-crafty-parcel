import * as UI from './ui'
import * as Setup from './setup'
import * as Score from './score'

// this scene defines how each round of Pong plays.
Crafty.defineScene('playRound', function () {

  UI.initGameUI()

  var ball
  // ball entity
  ball = Crafty.e('Ball')
  ball.start({
    x: Setup.width / 2 - Setup.scaleX(5) / 2,
    y: Setup.height / 2 - Setup.scaleY(5 * Setup.ASPECT_RATIO) / 2,
    vx: Setup.scaleX(((Math.random() > 0.5)? 1 : -1) * (20 + Math.random() * 20)),
    vy: Setup.scaleY(((Math.random() > 0.5)? 1 : -1) * (20 + Math.random() * 20))
  })

  // paddle entities
  let paddle1 = Crafty.e('Paddle')
  paddle1.startPaddle({
    up: Crafty.keys.W,
    down: Crafty.keys.S,
    x: Setup.bounds.left + Setup.scaleX(2),
    y: Setup.height / 2 - Setup.scaleY(15) / 2
  })
  paddle1.color('#01ff70')

  var paddle2
  if (Score.gameMode === 1) {
    paddle2 = Crafty.e('CpuPaddle')
    paddle2.start({
      x: Setup.bounds.right - Setup.scaleX(2) - Setup.scaleX(1.5),
      y: Setup.height / 2 - Setup.scaleY(15) / 2,
      ball: ball
    })
  }
  else {
    paddle2 = Crafty.e('Paddle')
    paddle2.startPaddle({
      up: Crafty.keys.UP_ARROW,
      down: Crafty.keys.DOWN_ARROW,
      x: Setup.bounds.right - Setup.scaleX(2) - Setup.scaleX(1.5),
      y: Setup.height / 2 - Setup.scaleY(15) / 2
    })
  }
  paddle2.color('#ff4136')


  let game = Crafty.e('2D, Canvas')

  var firstFrame = true
  var launchedBall = false
  var pauseGame = false
  var someoneScoredFrame = 0
  var startFrame

  // GAME LOOP
  game.bind('EnterFrame', function (eventData) {
    if (Score.whoJustScored !== 0) {
      if (!pauseGame) {
        someoneScoredFrame = eventData.frame
      }
      pauseGame = true
      UI.displaySomeoneJustWonText()
    }
    if (!pauseGame) {
      if (launchedBall) {
        Crafty.trigger('movePaddles', eventData.dt)
        Crafty.trigger('moveBall', eventData.dt)
      }

      // make ball after a second
      if (firstFrame) {
        firstFrame = false
        startFrame = eventData.frame
      }
      if (eventData.frame - startFrame > 60 && !launchedBall) {
        launchedBall = true
      }

      // speed up the ball over time
      if (launchedBall && eventData.frame % 60 === 0) {
        if (Math.abs(ball.vx) < Setup.scaleX(Setup.MAX_BALL_SPEED_X)) {
          ball.vx *= 1.1 
        } else {
          console.log('capped')
        }
      }
    } else {
      if (eventData.frame - someoneScoredFrame > 60) {
        Score.prepForRound()
        Crafty.enterScene('playRound')
      }
    }
  })
})