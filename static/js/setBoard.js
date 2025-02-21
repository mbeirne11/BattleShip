window.onload = function() {
    setBoard();
}

let playerShips = {
    'battleship':{
        'isRotated':true,
        'isPlaced':false,
        'health':4,
        'isReady':false,
        'isSunk':false
    },
    'aircraft':{
        'isRotated':true,
        'isPlaced':false,
        'health':5,
        'isReady':false,
        'isSunk':false
    },
    'submarine':{
        'isRotated':true,
        'isPlaced':false,
        'health':3,
        'isReady':false,
        'isSunk':false
    },
    'destroyer':{
        'isRotated':true,
        'isPlaced':false,
        'health':3,
        'isReady':false,
        'isSunk':false
    },
    'small':{
        'isRotated':true,
        'isPlaced':false,
        'health':2,
        'isReady':false,
        'isSunk':false
    }
}
let cpuShips = {
    'battleship':{
        'isRotated':true,
        'isPlaced':false,
        'health':4,
        'isReady':false,
        'isSunk':false
    },
    'aircraft':{
        'isRotated':true,
        'isPlaced':false,
        'health':5,
        'isReady':false,
        'isSunk':false
    },
    'submarine':{
        'isRotated':true,
        'isPlaced':false,
        'health':3,
        'isReady':false,
        'isSunk':false
    },
    'destroyer':{
        'isRotated':true,
        'isPlaced':false,
        'health':3,
        'isReady':false,
        'isSunk':false
    },
    'small':{
        'isRotated':true,
        'isPlaced':false,
        'health':2,
        'isReady':false,
        'isSunk':false
    }
}
let board = []

function clearBoard() {
    playerShips = {
        'battleship':{
            'isRotated':true,
            'isPlaced':false,
            'health':4,
            'isReady':false,
            'isSunk':false
        },
        'aircraft':{
            'isRotated':true,
            'isPlaced':false,
            'health':5,
            'isReady':false,
            'isSunk':false
        },
        'submarine':{
            'isRotated':true,
            'isPlaced':false,
            'health':3,
            'isReady':false,
            'isSunk':false
        },
        'destroyer':{
            'isRotated':true,
            'isPlaced':false,
            'health':3,
            'isReady':false,
            'isSunk':false
        },
        'small':{
            'isRotated':true,
            'isPlaced':false,
            'health':2,
            'isReady':false,
            'isSunk':false
        }
    }
    cpuShips = {
        'battleship':{
            'isRotated':true,
            'isPlaced':false,
            'health':4,
            'isReady':false,
            'isSunk':false
        },
        'aircraft':{
            'isRotated':true,
            'isPlaced':false,
            'health':5,
            'isReady':false,
            'isSunk':false
        },
        'submarine':{
            'isRotated':true,
            'isPlaced':false,
            'health':3,
            'isReady':false,
            'isSunk':false
        },
        'destroyer':{
            'isRotated':true,
            'isPlaced':false,
            'health':3,
            'isReady':false,
            'isSunk':false
        },
        'small':{
            'isRotated':true,
            'isPlaced':false,
            'health':2,
            'isReady':false,
            'isSunk':false
        }
    }
    gameStarted=false
    isTurn=true
    totalShipsPlaced = 0
    totalHits = 0
    totalFires = 0
    shipSize = 0
    // shipName = ""
    let scoreBoard = document.getElementById('scoreBoard')
    scoreBoard.innerHTML=''
    let acc = document.getElementById('accuracy')
    acc.innerHTML='Accuracy: '
    let shipTiles = document.getElementsByClassName(`shipTile`)
    for(let t of shipTiles){
        t.classList.remove(...t.classList)
        t.classList.add("shipTile")
    }
    let cpuTiles = document.getElementsByClassName(`cpuTile`)
    for(let t of cpuTiles){
        t.classList.remove(t.classList[2])
    }
    let tiles = document.getElementsByClassName('tile')
    for(let t of tiles){
        t.setAttribute('onclick',"")
    }
    d3.selectAll(".cpuTile").attr("style", "visibility:hidden")
    d3.select("#playAgain").attr("style", "visibility:hidden")
    // d3.select("#stats").attr("style", "visibility:hidden")
    document.getElementById("playerMoves").innerHTML=""
    document.getElementById("cpuMoves").innerHTML=""


}

function setBoard() {
    clearBoard()
    setCPU()
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
                tile.setAttribute("onmousemove", "hoverShip(this)");
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
