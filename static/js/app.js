let boardValues = {}
for(let i = 1; i<11;i++){
    let r = []
    for(let j = 1; j<11;j++){
        r.push(String.fromCharCode(i+64)+j)
    }
    boardValues[i]=r
}

let totalFires = 0;
let totalHits;
let isTurn = true
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

let isRotated;
function rotateShips(){
    isRotated = !isRotated
}
let shipSize = 0
let shipName = ''
function selectShip(ship){
    if(gameStarted){
        return
    }
    // isSelected=true
    shipName = ship.id
    if((ship.id.includes(','))&&(ship.classList.length>1)){
        shipName = ship.classList[2].replace('Tile','')
    }
    // console.log(shipName)
    isRotated = playerShips[shipName]['isRotated']
    let shipTiles = document.getElementById(shipName).children
    if(playerShips[shipName]['isPlaced']){
        totalShipsPlaced += -1
        let tiles = document.getElementsByClassName('tile')
        for(let t of tiles){
            if(t.classList.contains(`${shipName}Tile`)){
                t.setAttribute("onclick", "")
                let classesToRemove = Array.from(t.classList)
                classesToRemove.shift()
                t.classList.remove(...classesToRemove)
            }
        }
        for(t of shipTiles){
            t.classList.remove(`${shipName}Tile`)
        }
        
    }
    if (totalShipsPlaced<=4){
        d3.select("#start").attr("style", "visibility:hidden")
        d3.select("#fireMessage").attr("style", "visibility:hidden")
    }
    playerShips[shipName]['isPlaced']=false
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
function unselectAll(){
    let shipTiles = document.getElementsByClassName('shipTile')
    for (let index = 0; index < shipTiles.length; index++) {
        const element = shipTiles[index];
        element.classList.remove('shipSelected')
    }
    shipSize = 0
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

document.addEventListener('keydown', function(event){
    if(event.key == 'r'){
        isRotated = !isRotated
    }
})

totalShipsPlaced = 0
function placeShip(tile){
    if(!isRotated){    
        for (let index = 0; index < shipSize; index++) {
            let t = document.getElementById(`${parseInt(tile.target.id[0])+index}, ${tile.target.id[tile.target.id.length-1]}`)
            t.classList.add('ship')
            t.classList.add(`${shipName}Tile`)
            t.classList.add(index)
            t.classList.remove('shipHover')
            let s = document.getElementById(shipName)
            t.setAttribute("onclick", "selectShip(this)")
            // board[parseInt(tile.target.id[0])+index][parseInt(tile.target.id[tile.target.id.length-1])] = shipSize
        }
    }else
        {for (let index = 0; index < shipSize; index++) {
            let t = document.getElementById(`${tile.target.id[0]}, ${parseInt(tile.target.id[tile.target.id.length-1])+index}`)
            t.classList.add('ship')
            t.classList.add(`${shipName}Tile`)
            t.classList.add(index)
            t.classList.remove('shipHover')
            let s = document.getElementById(shipName)
            t.setAttribute("onclick", "selectShip(this)")
            // board[parseInt(tile.target.id[0])][parseInt(tile.target.id[tile.target.id.length-1])+index] = shipSize
        }
    }
    let ship = document.getElementById(`${shipName}`)   
    let tiles = ship.children
    for(let t of tiles){
        t.classList.add(`${shipName}Tile`)
    }
    playerShips[shipName]['isPlaced'] = true
    playerShips[shipName]['isRotated'] = isRotated
    totalShipsPlaced+=1
    unselectAll()
    unhoverShip()
    if (totalShipsPlaced>4){
        d3.select("#start").attr("style", "visibility:visible")
        // d3.select("#fireMessage").attr("style", "visibility:visible")
    }

}
let gameStarted = false
function startGame(){
    if(gameStarted){
        return
    }
    if (totalShipsPlaced<5){
        return
    }
    d3.select("#stats").attr("style", "visibility:visible")
    d3.select("#cpu").attr("style", "visibility:visible")
    d3.select("#fireMessage").attr("style", "visibility:visible")
    setCPU()
    gameStarted=true
}
function showWinner(turn){
    let showWinner = document.getElementById('showWinner')
    let winnerScreen = document.getElementById('winnerScreen')
    let scoreBoard = document.getElementById('scoreBoard')
    let playerMove = document.getElementById('playerMoves')
    let cpuMove = document.getElementById('cpuMoves')
    showWinner.innerHTML = turn + ' Wins!'
    scoreBoard.innerHTML = turn + ' Wins!'
    cpuMove.innerHTML += " " + turn + ' Wins!'
    playerMove.innerHTML += " " + turn + ' Wins!'
    winnerScreen.classList.add('open')
    let closeScreen = document.getElementById("closeScreen")
    closeScreen.addEventListener("click", () =>{
        winnerScreen.classList.remove('open')
    })
    d3.select("#playAgain").attr("style", "visibility:visible")
    totalHits=17
}

function displayHitInfo(ship,space){
    playerShips[ship.replace('Tile','')]['health'] += -1
    let tiles = document.getElementsByClassName(`shipTile ${ship}`)
    tiles[space].classList.add('fireHover')
    let h = playerShips[ship.replace('Tile','')]['health']
    if(h==0){
        playerShips[ship.replace('Tile','')]['isSunk'] = true
        for(let tile of tiles){
            tile.classList.add('fireHit')
        }
        document.getElementById("cpuMoves").innerHTML+= " They sunk your " + ship.replace('Tile','') + "!!!"
    }
}

function highlightMove(tile){
    if(!gameStarted){
        return
    }
    if(!isTurn){
        return
    }
    if(totalShipsPlaced<5){
        return
    }
    if(totalHits>16){
        return
    }
    tile.classList.add('fireHover')
    let move = boardValues[parseInt(tile.id.replace('screen ','')[0])+1][tile.id.replace('screen ','')[3]]
    document.getElementById("playerMoves").innerHTML="Targeting " + move 
}
function unHighlightMove(tile){
    if(!isTurn){
        return
    }
    tile.classList.remove('fireHover')
    // document.getElementById("playerMoves").innerHTML=""
}

function fire(tile){
    // isTurn=true
    if(!gameStarted){
        return
    }
    if(!isTurn){
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
    let move = boardValues[parseInt(row)+1][col]
    document.getElementById("playerMoves").innerHTML ='Firing on '+move+'.'
    isTurn=false
    setTimeout(function(){
        if(screen[row][col]!=0){
            document.getElementById(tile.id).classList.add('fireHit')
            document.getElementById("playerMoves").innerHTML+=" HIT!!"
            let s = screen[row][col]
            cpuShips[s]['health'] += -1
            if(cpuShips[s]['health'] == 0){
                d3.selectAll('.cpuTile.'+ s).attr("style", "visibility:visible")
                let tiles = document.getElementsByClassName('cpuTile '+ s)
                for(let t of tiles){
                    t.classList.add("fireHit")
                }
                document.getElementById('playerMoves').innerHTML+=" You sank their " +s + "!!!"
            }
            
            isTurn=true
            checkForWinner()
            isTurn=false
        }else{
            document.getElementById(tile.id).classList.add('fireMiss')
            document.getElementById("playerMoves").innerHTML+=" MISS!"
    
        }
        unHighlightMove(tile)
        let d = document.getElementsByClassName('display')
        let hits = 0
        for(let tile of d){
            if(!!tile.classList.contains('fireHit')){
                hits+=1
            }
        }
        let scoreBoard = document.getElementById('accuracy')
        scoreBoard.innerHTML = `Shots Fired: ${totalFires}`
        tile.classList.remove('fireHover')
    },1000)
    setTimeout(function(){
        CPUfire()
    },2500)
}