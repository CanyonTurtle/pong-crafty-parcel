import * as Setup from './setup'
import { score1, score2, whoJustScored, bounceCount } from './score'

export var titleText
export var score1Text
export var score2Text
export var menuTitleText
export var startInstructionsText

export var someoneJustWonText
export var winnerText
export var menuStartText
export var menuStartText2
export var menuStartText3
export var menuSubText
export var bounceCountText

Crafty.c("menuUISingleton", {
  init () {
    this.bind("initMenuUI", function () {
      menuTitleText = Crafty.e('GAMEUITEXT')
      menuTitleText.start({
        x: Setup.width / 2 - 250,
        y: Setup.height / 2 - 100,
        w: 500,
        h: 500,
        text: 'Crafty Pong!',
        size: 48,
        color: UI_COLOR
      })
      menuSubText = Crafty.e('GAMEUITEXT')
      menuSubText.start({
        x: Setup.width / 2 - 250,
        y: Setup.height / 2,
        w: 500,
        h: 500,
        text: 'made with Parcel.js and Crafty.js',
        size: 14, 
        color: UI_COLOR
      })

      menuStartText = Crafty.e('GAMEUITEXT')
      menuStartText.start({
        x: Setup.width / 2 - 250,
        y: Setup.height / 2 + 50,
        w: 500,
        h: 500,
        text: '(A) Easy CPU',
        size: 20,
        color: UI_COLOR
      })
      menuStartText.textAlign('left')

      menuStartText2 = Crafty.e('GAMEUITEXT')
      menuStartText2.start({
        x: Setup.width / 2 - 250,
        y: Setup.height / 2 + 70,
        w: 500,
        h: 500,
        text: '(B) Hard CPU',
        size: 20,
        color: UI_COLOR
      })
      menuStartText2.textAlign('left')

      menuStartText3 = Crafty.e('GAMEUITEXT')
      menuStartText3.start({
        x: Setup.width / 2 - 250,
        y: Setup.height / 2 + 90,
        w: 500,
        h: 500,
        text: '(C) 2-Player',
        size: 20,
        color: UI_COLOR
      })
      menuStartText3.textAlign('left')
    })
    this.bind('updateBounceCount', function () {
      if (bounceCountText !== undefined) {
        bounceCountText.destroy()
      }
      bounceCountText = Crafty.e('GAMEUITEXT')
      bounceCountText.start({
        x: 400,
        y: 10,
        w: 200,
        text: 'Bounce count: ' + bounceCount,
        size: 14,
        color: UI_COLOR
      })
    })
    this.bind('initGameUI', function () {
      titleText = Crafty.e('GAMEUITEXT')
      titleText.start({
        x: 100,
        y: 10,
        w: 200,
        text: 'Craftyjs Pong',
        size: 20,
        color: UI_COLOR
      })

      score1Text = Crafty.e('GAMEUITEXT')
      score1Text.start({
        x: 200,
        y: 10,
        w: 200,
        text: 'score 1: ' + score1,
        size: 10,
        color: UI_COLOR
      })

      score2Text = Crafty.e('GAMEUITEXT')
      score2Text.start({
        x: 300,
        y: 10,
        w: 200,
        text: 'score 2: ' + score2,
        size: 10,
        color: UI_COLOR
      })
      Crafty.trigger('updateBounceCount')
    })
    this.bind('displaySomeoneJustWonText', function () {
      someoneJustWonText = Crafty.e('GAMEUITEXT')
      someoneJustWonText.start({
        x: Setup.width / 2,
        y: Setup.height / 2,
        w: 200,
        text: 'Player ' + whoJustScored + ' scored!',
        size: 20,
        color: UI_COLOR
      })
    })
    this.bind('showWinnerUI', function () {
      winnerText = Crafty.e('GAMEUITEXT')
      winnerText.start({
        x: Setup.width / 2,
        y: Setup.height / 2,
        w: 200,
        text: 'Player ' + whoJustScored + ' won!',
        size: 20,
        color: UI_COLOR
      })
    })
  }
})

export var menuUISingleton = Crafty.e("menuUISingleton")

export const UI_COLOR = '#7fdbff'

Crafty.c('GAMEUITEXT', {
  start ({ x, y, h, w, text, size, color }) {
    this.addComponent('2D, DOM, Text')
    this.x = x
    this.y = y
    this.h = h
    this.w = w
    this.textFont({
      size: '' + size + 'px',
      weight: 'bold'
    })
    this.textColor(color)
    this.setText(text)
    this.textAlign('center')
  },
  setText (t) {
    this.text(t)
  },
})
