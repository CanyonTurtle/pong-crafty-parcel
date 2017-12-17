export var score1 = 0
export var score2 = 0

export var whoJustScored = 0

export var gameMode = 0
export var cpuMode = 1

export let incrementScore1 = function () {
  score1++
  whoJustScored = 1
}

export let incrementScore2 = function () {
  score2++
  whoJustScored = 2
}

export let prepForRound = function () {
  whoJustScored = 0
}