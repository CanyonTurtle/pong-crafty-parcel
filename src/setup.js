export let gameEl = document.getElementById('game')
gameEl.innerHTML = ''
gameEl.setAttribute('padding', '0px')

export const ASPECT_RATIO = 14 / 9
export let width = Math.min(gameEl.offsetWidth, 1200)
export let height = width / ASPECT_RATIO

export let bounds = {
  left: 0,
  right: width,
  top: 0,
  bottom: height
}

// normalize measurements in the game to be in units of 100 width, and 100 height units.
export let unitX = width / 100
export let unitY = height / 100

export let scaleX = function (x) {
  return unitX * x
}

export let scaleY = function (y) {
  return unitY * y
}

export const MAX_BALL_SPEED_X = 150

export const PADDLE_LEFT_RIGHT = true