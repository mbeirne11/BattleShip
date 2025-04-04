function placeCPU(key){
    console.log(key)
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
        console.log(key)
        placeCPU(key)
    }) 
    console.log(screen)
}

function CPUfire(){
    // isTurn = false
    if(totalHits>16){
        return
    }
    let cpuMoveValues = {}
    let matrix =   [[10, 15, 19, 21, 22, 22, 21, 19, 15, 10],
                    [15, 20, 24, 26, 27, 27, 26, 24, 20, 15],
                    [19, 24, 28, 30, 31, 31, 30, 28, 24, 19],
                    [21, 26, 30, 32, 33, 33, 32, 30, 26, 21],
                    [22, 27, 31, 33, 34, 34, 33, 31, 27, 22],
                    [22, 27, 31, 33, 34, 34, 33, 31, 27, 22],
                    [21, 26, 30, 32, 33, 33, 32, 30, 26, 21],
                    [19, 24, 28, 30, 31, 31, 30, 28, 24, 19],
                    [15, 20, 24, 26, 27, 27, 26, 24, 20, 15],
                    [10, 15, 19, 21, 22, 22, 21, 19, 15, 10]]
    let tiles = document.getElementsByClassName('tile')
    let a;
    let b;
    let maxMatrixValue = 0
    for(let tile of tiles){
        let cl = tile.classList
        if(!!cl.contains('fireMiss')){
            a = parseInt(tile.id[0])
            b = parseInt(tile.id[3])
            if(b+1<10){
                matrix[a][b+1] += -(matrix[a][b+1])/(5)
            }
            if(b-1>=0){
                matrix[a][b-1] += -(matrix[a][b-1])/(5)
            }
            if(a+1<10){
                matrix[a+1][b] += -(matrix[a+1][b])/(5)
            }
            if(a-1>=0){
                matrix[a-1][b] += -(matrix[a-1][b])/(5)
            }
        }
        if(!!cl.contains('fireHit')){
            if((!playerShips[cl[2].replace('Tile','')]['isSunk'])){
                a = parseInt(tile.id[0])
                b = parseInt(tile.id[3])
                for (let size = 0; size < 3; size++) {
                    if(b+1+size<10){
                        matrix[a][b+1+size] += (matrix[a][b+1+size]+10)*(3-size)
                    }
                    if(b-1-size>=0){
                        matrix[a][b-1-size] += (matrix[a][b-1-size]+10)*(3-size)
                    }
                    if(a+1+size<10){
                        matrix[a+1+size][b] += (matrix[a+1+size][b]+10)*(3-size)
                    }
                    if(a-1-size>=0){
                        matrix[a-1-size][b] += (matrix[a-1-size][b]+10)*(3-size)
                    }
                }
            }    
        }
    }
    // console.log(matrix)
    for(let tile of tiles){
        if((!(tile.classList.contains('fireHit')))&&(!(tile.classList.contains('fireMiss')))){
            a = parseInt(tile.id[0])
            b = parseInt(tile.id[3])
            if(matrix[a][b]>maxMatrixValue){
                maxMatrixValue=matrix[a][b]
            }
            cpuMoveValues[`${a}, ${b}`] = matrix[a][b]
        }
    }
    let cpuMoveOptions = []
    // console.log(maxMatrixValue)
    Object.entries(cpuMoveValues).forEach(([key,value])=>{
        if(value>(maxMatrixValue-maxMatrixValue/8)){
            cpuMoveOptions.push(key)
        }
    })
    // console.log(cpuMoveOptions)
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