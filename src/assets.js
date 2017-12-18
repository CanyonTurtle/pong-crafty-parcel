import ballURL from  './ball-final.png'

let assetsObj = {
  'sprites': {
    [ballURL]: {
      tile: 123,
      tileh: 123,
      map: {
        'pingpongball': [0, 0]
      }
    }
  }
}

export const startGame = function () {
  Crafty.paths({
    'images': '/pong-crafty-parcel/'
  })
  Crafty.load(assetsObj, function () {
    console.log('starting game...')
    console.log(Crafty.assets['/dist/pingpongball'])
    Crafty.enterScene('mainMenu')
  })
}