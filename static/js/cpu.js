function placeCPU(key){
    let size = cpuShips[key]['health']
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
                screen[x+j][y] = key
            } 
        }else{
            for(let j = 0; j<size;j++){
                screen[x][y+j] = key
            } 
        }
    }else{
        placeCPU(key)
    }
}

let screen;
function setCPU(){
    screen = []
    for(let i=0;i<10;i++){
        screen[i] = []
        for(let j=0;j<10;j++){
            screen[i][j] = 0
        }
    }
    console.log('setCPU')
    Object.keys(cpuShips).forEach(key=>{
        placeCPU(key)
    }) 
    console.log(screen)
}

function CPUfire(){
    // isTurn = false
    if(totalHits>16){
        return
    }
    let cpuMoveOptions = []
    let x = Math.floor(Math.random() * 9)
    let y = Math.floor(Math.random() * 9)
    cpuMoveOptions.push(`${x}, ${y}`)
    let tiles = document.getElementsByClassName('tile')
    let a;
    let b;
    for(let tile of tiles){
        if(!!tile.classList.contains('fireHit')){
            a = parseInt(tile.id[0])
            b = parseInt(tile.id[3])
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
        return
    }
    // let move = boardValues[a][b-1]
    let move = boardValues[parseInt(t.id[0])+1][t.id[3]]
    document.getElementById("cpuMoves").innerHTML = 'Firing on ' + move + '.'
    t.classList.add('fireHover')
    setTimeout(function(){
        if(!!t.classList.contains('ship')){
            document.getElementById("cpuMoves").innerHTML+=' HIT!!'
            t.classList.add('fireHit')
            t.classList.remove('fireHover')
            displayHitInfo(t.classList[2],t.classList[3])
            checkForWinner()
        }else{
            document.getElementById("cpuMoves").innerHTML+=' MISS!'
            t.classList.add('fireMiss')
            t.classList.remove('fireHover')
        }
        isTurn=true
    },1000)
}