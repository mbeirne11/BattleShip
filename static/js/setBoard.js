window.onload = function() {
    setBoard();
}
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
    let elementExists = document.getElementById('0, 0')
    if(elementExists == null){
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let tile = document.createElement('div')
                tile.id = `${i}, ${j}`
                tile.classList.add('tile')
                tile.setAttribute("onmouseover", "hoverShip(this)");
                tile.setAttribute("onmouseout", "unHighlightMove(this)");
                document.getElementById('board').append(tile)
            }
        }
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let tile = document.createElement('div')
                tile.id = `screen ${i}, ${j}`
                tile.classList.add('display')
                tile.setAttribute("onclick", "fire(this)");
                tile.setAttribute("onmousemove", "highlightMove(this)");
                tile.setAttribute("onmouseout", "unHighlightMove(this)");
                document.getElementById('screen').append(tile)
            }
        }
    }else{
        console.log('again')
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                document.getElementById(`${i}, ${j}`).setAttribute("class",'tile')
                document.getElementById(`screen ${i}, ${j}`).setAttribute("class",'display')
            }
        }
    }
}
