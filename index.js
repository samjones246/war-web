console.log("Started")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Define constants
const rows = 13
const cols = 13
const width = canvas.width
const height = canvas.height
const cellHeight = canvas.height / rows
const cellWidth = canvas.width / cols
const pieceRadius = cellWidth * 0.45

// Define colours
const grey = "#333333"
const pieceAColour = "#ff5555"
const pieceBColour = "#5555ff"

// Draws a grid onto the canvas
function drawGrid(){
    for(let i=1;i<rows;i++){
        ctx.moveTo(0,i*cellHeight)
        ctx.lineTo(width, i*cellHeight)
    }
    for(let i=1;i<cols;i++){
        ctx.moveTo(i*cellWidth, 0)
        ctx.lineTo(i*cellWidth, height)
    }
    ctx.stroke()
}

class Piece {
    constructor(team, strength, health){
        this.team = team
        this.strength = strength
        this.health = health
    }
}

// Takes a rows x cols list of pieces representing the board state and draws this state on the canvas
function drawBoard(board){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid()
    ctx.font = "20px Arial"
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            piece = board[i][j]
            if(piece){
                ctx.fillStyle = piece.team == 0 ? pieceAColour : pieceBColour
                let x = j*cellWidth + cellWidth/2
                let y = i*cellHeight + cellHeight/2
                ctx.beginPath()
                ctx.arc(x, y, pieceRadius, 0, 2 * Math.PI, false)
                ctx.fill()

                ctx.beginPath()
                ctx.moveTo(x, y - pieceRadius * 0.8)
                ctx.lineTo(x, y + pieceRadius * 0.8)
                ctx.strokeStyle = "#000000"
                ctx.stroke()

                ctx.fillStyle = "#000000"
                ctx.fillText(piece.strength, x - pieceRadius / 2 - 5, y + 7)
                ctx.fillText(piece.health, x + pieceRadius / 2 - 7, y + 7)
            }
        }
    }
}

// Test board drawing functionality with a simple board layout
function boardTest(){
    let testBoard = Array(13)
    for(let i=0;i<13;i++){
        testBoard[i] = Array(13)
    }
    testBoard[0][0] = new Piece(0, 9, 9)
    testBoard[12][12] = new Piece(1, 4, 9)
    drawBoard(testBoard)
}

drawGrid()