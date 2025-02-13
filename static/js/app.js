let ships = {
    'battleship':{
        'isPlaced':false,
        'health':[0,0,0,0],
        'isReady':false,
        'isSunk':false
    },
    'aircraft':{
        'isPlaced':false,
        'health':[0,0,0,0,0],
        'isReady':false,
        'isSunk':false
    },
    'submarine':{
        'isPlaced':false,
        'health':[0,0,0],
        'isReady':false,
        'isSunk':false
    },
    'destroyer':{
        'isPlaced':false,
        'health':[0,0,0],
        'isReady':false,
        'isSunk':false
    },
    'small':{
        'isPlaced':false,
        'health':[0,0],
        'isReady':false,
        'isSunk':false
    }
}
function placeCPU(size){
    let r = Math.floor(Math.random()*2)
    let x = 0
    let y = 0
    let okay = true
    if(r==0){
        x = Math.floor(Math.random() * (9-size))
        y = Math.floor(Math.random() * 9)
        for(let j = 0; j<size;j++){
            if((!!screen[x+j][y])){
                okay = false
            }else if((screen[x+j][y]==0)){
            }else{
                okay = false
            }
        }
    }else{
        x = Math.floor(Math.random() * 9)
        y = Math.floor(Math.random() * (9-size))
        for(let j = 0; j<size;j++){
            if((!!screen[x][y+j])){
                okay = false
            }else if((screen[x][y+j]==0)){
            }else{
                okay = false
            }
        }
    }
    
    if(okay == true){
        if(r==0){
            for(let j = 0; j<size;j++){
                screen[x+j][y] = size
            } 
        }else{
            for(let j = 0; j<size;j++){
                screen[x][y+j] = size
            } 
        }
    }else{
        placeCPU(size)
    }
}
let screen = []
function setCPU(){
    for(let i=0;i<10;i++){
        screen[i] = []
        for(let j=0;j<10;j++){
            screen[i][j] = 0
        }
    }
    console.log('setCPU')
    let cpuShips = [5,4,3,3,2]
    for(let size of cpuShips){
        placeCPU(size)
    }    
}
let totalFires = 0;
let totalHits;
function checkForWinner(){
    totalHits = 0
    if(isTurn){
        c = 'display'
        turn = 'Player'
    }else{
        c = 'tile'
        turn="CPU"
    }
    let screen = document.getElementsByClassName(c)
    for(let tile of screen){
        if(!!tile.classList.contains('fireHit')){
            totalHits+=1
        }
    }
    if(totalHits>16){
        showWinner(turn)
    }
}
function showWinner(turn){
    let scoreBoard = document.getElementById('scoreBoard')
    scoreBoard.innerHTML = turn + ' Wins!'
    d3.select("#playAgain").attr("style", "visibility:visible")
    totalHits=17
}
let isTurn = true
function CPUfire(){
    isTurn = false
    if(totalHits>16){
        return
    }
    let cpuMoveOptions = []
    let x = Math.floor(Math.random() * 9)
    let y = Math.floor(Math.random() * 9)
    cpuMoveOptions.push(`${x}, ${y}`)
    let tiles = document.getElementsByClassName('tile')
    for(let tile of tiles){
        if(!!tile.classList.contains('fireHit')){
            let a = parseInt(tile.id[0])
            let b = parseInt(tile.id[3])
            cpuMoveOptions.push(`${a}, ${b + 1}`)
            cpuMoveOptions.push(`${a}, ${b - 1}`)
            cpuMoveOptions.push(`${a + 1}, ${b}`)
            cpuMoveOptions.push(`${a - 1}, ${b}`)
        }
    }
    let c;
    let t;
    let i = 0
    while (i<cpuMoveOptions.length) {
        c = Math.floor(Math.random()*cpuMoveOptions.length)
        t = document.getElementById(cpuMoveOptions[c])
        if(!!t){
            break
        }
        i++
    }
    if((!!(t.classList.contains('fireHit')))||(!!(t.classList.contains('fireMiss')))){
        CPUfire()
    }
    if(!!t.classList.contains('ship')){
        t.classList.add('fireHit')
        displayHitInfo(t.classList[2],t.classList[3])
        checkForWinner()
    }else{
        t.classList.add('fireMiss')
    }
}
function displayHitInfo(ship,space){
    // ships[ship]['health'][space] = 1
    let tiles = document.getElementsByClassName(`shipTile info ${ship}`)
    tiles[space].classList.add('fireHit')
}
function unselectAll(){
    let shipTiles = document.getElementsByClassName('shipTile')
    for (let index = 0; index < shipTiles.length; index++) {
        const element = shipTiles[index];
        element.classList.remove('shipSelected')
    }
    shipSize = 0
}
// let isSelected = false
let isRotated = true
let shipSize = 0
let shipName = ''
function selectShip(ship){
    // isSelected=true
    const shipTiles = ship.children
    shipName = ship.classList[1]
    if(!shipTiles[0].classList.contains('shipSelected')){
        unselectAll()
    }
    shipSize = shipTiles.length
    for (let index = 0; index < shipTiles.length; index++) {
        const element = shipTiles[index];
        if(!element.classList.contains('shipSelected')){
            element.classList.add('shipSelected')
        }
        else{    
            unselectAll()
            break
        }
    } 
    
    
}
function hoverShip(tile){
    unhoverShip()
    if(shipSize>0){
        if(!isRotated){
            if(10-(parseInt(tile.id[0]))<shipSize){
                return
            }
            for(let i = 0; i<shipSize;i++){
                coor = `${parseInt(tile.id[0])+i}, ${tile.id[tile.id.length-1]}`
                if(document.getElementById(coor).classList.length>1){
                    return
                }
            }
            for (let index = 0; index < shipSize; index++) {
                let t = document.getElementById(`${parseInt(tile.id[0])+index}, ${tile.id[tile.id.length-1]}`)
                t.classList.add('shipHover')
                // t.classList.add(shipName)
            }
            tile.addEventListener('click', placeShip)
        }
        else{
            if(10-(parseInt(tile.id[tile.id.length-1]))<shipSize){
                return
            }
            for(let i = 0; i<shipSize;i++){
                coor = `${tile.id[0]}, ${parseInt(tile.id[tile.id.length-1])+i}`
                if(document.getElementById(coor).classList.length>1){
                    return
                }
            }
            for (let index = 0; index < shipSize; index++) {
                let t = document.getElementById(`${tile.id[0]}, ${parseInt(tile.id[tile.id.length-1])+index}`)
                t.classList.add('shipHover')
                // t.classList.add(shipName)
            }
            tile.addEventListener('click', placeShip)
        }
        
        
    }
}
function unhoverShip(){
    let tiles = document.getElementsByClassName('tile')
    for (let index = 0; index < tiles.length; index++) {
        const element = tiles[index];
        element.classList.remove('shipHover')
        // element.classList.remove(shipName)
        element.removeEventListener('click',placeShip)
    }
}
function rotateShips(){
    isRotated = !isRotated
}
totalShipsPlaced = 0
function placeShip(tile){
    if(!isRotated){    
        for (let index = 0; index < shipSize; index++) {
            let t = document.getElementById(`${parseInt(tile.target.id[0])+index}, ${tile.target.id[tile.target.id.length-1]}`)
            t.classList.add('ship')
            t.classList.add(`${shipName}Tile`)
            t.classList.add(index)
            t.classList.remove('shipHover')
            board[parseInt(tile.target.id[0])+index][parseInt(tile.target.id[tile.target.id.length-1])] = shipSize
        }
    }else
        {for (let index = 0; index < shipSize; index++) {
            let t = document.getElementById(`${tile.target.id[0]}, ${parseInt(tile.target.id[tile.target.id.length-1])+index}`)
            t.classList.add('ship')
            t.classList.add(`${shipName}Tile`)
            t.classList.add(index)
            t.classList.remove('shipHover')
            board[parseInt(tile.target.id[0])][parseInt(tile.target.id[tile.target.id.length-1])+index] = shipSize
        }
    }
    d3.select(`.${shipName}`).attr("style", "visibility:hidden")
    totalShipsPlaced+=1
    unselectAll()
    unhoverShip()
    if(totalShipsPlaced==5){
        d3.select("#sea").attr("style", "visibility:hidden")
        d3.select("#info").attr("style", "visibility:visible")
    }
}


/////////////////////////////////////////////////////////////////////////////////////////


function highlightMove(tile){
    if(totalShipsPlaced<5){
        return
    }
    if(totalHits>16){
        return
    }
    document.getElementById(tile.id).classList.add('fireHover')
}
function unHighlightMove(tile){
    document.getElementById(tile.id).classList.remove('fireHover')
}
function fire(tile){
    isTurn=true
    if(totalShipsPlaced<5){
        return
    }
    if(totalHits>16){
        return
    }
    if(tile.classList.length>2){
        return
    }
    row = tile.id.replace('screen ', '')[0]
    col = tile.id.replace('screen ', '')[3]
    totalFires+=1
    if(screen[row][col]!=0){
        document.getElementById(tile.id).classList.add('fireHit')
        checkForWinner()
    }else{
        document.getElementById(tile.id).classList.add('fireMiss')
    }
    let d = document.getElementsByClassName('display')
    let hits = 0
    for(let tile of d){
        if(!!tile.classList.contains('fireHit')){
            hits+=1
        }
    }
    let scoreBoard = document.getElementById('accuracy')
    scoreBoard.innerHTML = `Accuracy: ${(parseInt((hits/totalFires)*100))}%`
    CPUfire()
}
