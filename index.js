const FPS = 60
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const numSquares = canvas.width / 2
let squares = []
let count = 0
let direction = 'DOWN'

const generateRandomColor = () => {
  return {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255),
  }
}
const addSquare = () => {
  const width = Math.floor(Math.random() * (canvas.width / 450)) + 1
  const height = Math.floor(Math.random() * (canvas.width / 150) + 15)
  squares.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor((Math.random() * -canvas.height) / 4),
    width,
    height,
    color: generateRandomColor(),
    speed: (width * height) / 15,
    brightening: true,
  })
}

const update = () => {
  context.fillStyle = 'BLACK'
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (const square of squares) {
    context.fillStyle = `rgb(${square.color.red}, ${square.color.green}, ${square.color.blue})`
    context.fillRect(square.x, square.y, square.width, square.height)

    square.y += square.speed

    //  background squares fade in and out effect
    if (square.brightening) {
      square.color.red++
      square.color.green++
      square.color.blue++

      if (
        square.color.red > 255 &&
        square.color.green > 255 &&
        square.color.blue > 255
      )
        square.brightening = false
    } else {
      square.color.red--
      square.color.green--
      square.color.blue--

      if (
        square.color.red < 0 &&
        square.color.green < 0 &&
        square.color.blue < 0
      )
        square.brightening = true
    }

    if (direction === 'DOWN' && square.y > canvas.height)
      square.y = -square.height
    else if (direction === 'UP' && square.y < 0) square.y = canvas.height
  }
}

const init = () => {
  for (let i = 0; i < numSquares; i++) {
    addSquare()
  }

  setInterval(update, 1000 / FPS)
}
init()

window.addEventListener('click', (e) => {
  for (const square of squares) {
    square.speed *= -1
  }
})
