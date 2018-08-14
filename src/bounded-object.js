import * as Setup from './setup'

// Define the behavor of objects that will be limited by the boundaries of the game.
Crafty.c('Bounded', {

  // simply limit the x and y properties of an object / entity to within the game.
  restrict () {
    let width = this.w || 10
    let height = this.h || 10
    if (this.x >= Setup.bounds.right - width) {
      this.x = Setup.bounds.right - width
    }
    if (this.x <= Setup.bounds.left) {
      this.x = Setup.bounds.left
    }
    if (this.y >= Setup.bounds.bottom - height) {
      this.y = Setup.bounds.bottom - height
    }
    if (this.y <= Setup.bounds.top) {
      this.y = Setup.bounds.top
    }
  },

  // bounce the object using it's vx and vy.
  bounceOffWalls () {
    let width = this.w || 10
    let height = this.h || 10
    this.restrict.call(this)
    if (this.x === Setup.bounds.left || this.x === Setup.bounds.right - width) {
      if (this.vx) {
        this.vx *= -1
      }
    }
    if (this.y === Setup.bounds.bottom - height || this.y === Setup.bounds.top) {
      if (this.vy) {
        this.vy *= -1
      }
    }
  }
})