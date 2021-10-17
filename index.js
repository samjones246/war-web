console.log("Started")
// Get canvas and context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Define constants
const rows = 13
const cols = 13
const width = canvas.width
const height = canvas.height
const cellHeight = canvas.height / rows
const cellWidth = canvas.width / cols

// Define colours
const grey = "#333333"

// Draw grid
for(let i=1;i<rows;i++){
    ctx.moveTo(0,i*cellHeight)
    ctx.lineTo(width, i*cellHeight)
}
for(let i=1;i<cols;i++){
    ctx.moveTo(i*cellWidth, 0)
    ctx.lineTo(i*cellWidth, height)
}
ctx.stroke()