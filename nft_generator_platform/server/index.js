const express = require('express')
const { promisify } = require('util')
const app = express()
const port = 3100
const fs = require('fs')
const readdir = promisify(fs.readdir)
const cors = require('cors')
const { createCanvas, loadImage } = require('canvas')

let imageCounter = 0 // Counter for generating unique image names

app.use(express.json())
app.use(cors()) // Enable CORS
app.use(express.static('public'))
app.use('/generated_images', express.static('generated_images'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.post('/api/save-image', (req, res) => {
  const nodes = req.body // Receive the nodes data from the request body

  // Create a 4x4 matrix with the emojis and backgrounds
  const matrix = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => null),
  )
  nodes.forEach((node) => {
    const { emoji, background, position } = node
    const { row, column } = position
    matrix[row][column] = { emoji, background }
  })

  // Generate a unique image file name with counter
  const fileName = `${imageCounter}.png`
  imageCounter++

  // Create the image and save it
  createImage(matrix, `./generated_images/${fileName}`)
    .then(() => {
      console.log('Image saved successfully')
      res.status(200).send('Image saved successfully')
    })
    .catch((err) => {
      console.error('Error saving image:', err)
      res.status(500).send('Error saving image')
    })
})

app.get('/api/all', (req, res) => {
  console.log('test')
  files = fs.readdirSync('./generated_images/')
  console.log(files.length)
  console.log('test1')
  return res.status(200).send({ files: files, fileNumber: files.length })
})

function createImage(matrix, filePath) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(400, 400)
    const ctx = canvas.getContext('2d')

    const cellWidth = canvas.width / 4
    const cellHeight = canvas.height / 4

    // Draw the matrix on the canvas
    matrix.forEach((row, i) => {
      row.forEach((node, j) => {
        const { emoji, background } = node

        // Set cell background color
        ctx.fillStyle = background
        ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)

        // Draw the emoji text
        ctx.fillStyle = 'black' // Set the text color to black
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(emoji, (j + 0.5) * cellWidth, (i + 0.5) * cellHeight)
      })
    })

    // Convert the canvas to a PNG image and save it
    const stream = canvas.createPNGStream()
    const out = fs.createWriteStream(filePath)
    stream.pipe(out)
    out.on('finish', resolve)
    out.on('error', reject)
  })
}
