window.onload = function() {
    setBoard();
}
//Create an empty board
let board = []
function setBoard() {
    setCPU()
    totalShipsPlaced = 0
    totalHits = 0
    totalFires = 0
    let scoreBoard = document.getElementById('scoreBoard')
    scoreBoard.innerHTML=''
    let acc = document.getElementById('accuracy')
    acc.innerHTML=''
    let tiles = document.getElementsByClassName(`shipTile info`)
    for(let t of tiles){
        t.classList.remove('fireHit')
    }
    for(let name of ['battleship','aircraft','destroyer','submarine','small']){
        d3.select(`.${name}`).attr("style", "visibility:visible")
    }
    d3.select("#info").attr("style", "visibility:hidden")
    d3.select("#sea").attr("style", "visibility:visible")
    d3.select("#playAgain").attr("style", "visibility:hidden")
    
    console.log('setBoard')
    for(let i=0;i<10;i++){
        board[i] = []
        for(let j=0;j<10;j++){
            board[i][j] = 0
        }
    }
    // check to see if board already exists
    let elementExists = document.getElementById('0, 0')
    // if board does not exist, create a new one
    if(elementExists == null){
        //loop through each space on the board
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                //create tile
                let tile = document.createElement('div')
                //add id and class for styling
                tile.id = `${i}, ${j}`
                tile.classList.add('tile')
                //add attributes for styling on mouse events
                tile.setAttribute("onmouseover", "hoverShip(this)");
                // tile.setAttribute("onmousemove", "highlightMove(this)");
                // tile.setAttribute("onmousedown", "highlightMove(this)");
                tile.setAttribute("onmouseout", "unHighlightMove(this)");
                //add tile to the board
                document.getElementById('board').append(tile)
            }
        }
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                //create tile
                let tile = document.createElement('div')
                //add id and class for styling
                tile.id = `screen ${i}, ${j}`
                // tile.classList.add('tile')
                tile.classList.add('display')
                //add attributes for styling on mouse events
                tile.setAttribute("onclick", "fire(this)");
                tile.setAttribute("onmousemove", "highlightMove(this)");
                // tile.setAttribute("onmousedown", "highlightMove(this)");
                tile.setAttribute("onmouseout", "unHighlightMove(this)");
                //add tile to the board
                document.getElementById('screen').append(tile)
            }
        }
    // if board already exists, reset the board
    }else{
        console.log('again')
        //loop through each space on the board
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                //reset the class of tile so every tile is empty
                document.getElementById(`${i}, ${j}`).setAttribute("class",'tile')
                document.getElementById(`screen ${i}, ${j}`).setAttribute("class",'display')
            }
        }
    }
}
