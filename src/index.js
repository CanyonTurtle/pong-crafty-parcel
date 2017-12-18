import Crafty from 'craftyjs'
import './bounded-object'
import './paddles'
import './ball'
import './cpu-paddle'
import './main-menu'
import './main-game'
import { randomInRange } from './utilities'
import * as Setup from './setup'
import { whoJustScored, prepForRound } from './score';
import { startGame } from './assets'


// Initialize Crafty.
Crafty.init(Setup.width, Setup.height, Setup.gameEl)
Crafty.timer.FPS(60)

Crafty.background('#001f3f')

// Crafty.enterScene('mainMenu')
startGame()