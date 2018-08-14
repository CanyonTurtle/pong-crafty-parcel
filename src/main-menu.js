import * as UI from './ui'
import * as Score from './score'

Crafty.defineScene('mainMenu', function () {
  Crafty.trigger('initMenuUI')
  var mainMenu = Crafty.e('2D, DOM, Keyboard')
  mainMenu.x = 0
  mainMenu.y = 0
  mainMenu.bind('KeyDown', function () {
    // cpu easy mode
    if (this.isDown(Crafty.keys.A)) {
      Score.gameMode = 1
      Score.cpuMode = 0
      mainMenu.unbind('KeyDown')
      Crafty.enterScene('playRound')
    // cpu hard mode
    } else if (this.isDown(Crafty.keys.B)) {
      Score.gameMode = 1
      Score.cpuMode = 1
      mainMenu.unbind('KeyDown')
      Crafty.enterScene('playRound')
    // 2 player mode
    } else if (this.isDown(Crafty.keys.C)) {
      Score.gameMode = 2
      mainMenu.unbind('KeyDown')
      Crafty.enterScene('playRound')
    }
  })
})