//Set year to the footer dynamically
document.querySelector(".year").textContent = new Date().getFullYear() 

//Initialize the game board module
const gameBoard = (()=>{
    let board = Array(9).fill(" ")

    const isFilled = (pos)=>{
        return board[pos]!=" "
    }

    const fetchMarker = pos => board[pos] 

    const placeMarker = (pos, player)=>{
        if(isFilled(pos)) return
        board[pos] = player
    }

    const reset= ()=>{
        board = board.map(()=> " ")
    }

    return {
        isFilled,
        fetchMarker,
        placeMarker,
        reset
    }
})();

const player = (marker)=>{
    this.marker = marker
    const getMarker = ()=> marker
    return {getMarker}
}

const gameController = (()=>{
    
    const playerX = player('X')
    const playerO = player('O')
    let roundsPlayed = 0;
    let currPlayer = playerX

    const flipTurn = () =>{
        if(fetchCurrPlayer() ==playerX){
            setCurrPlayer(playerO)
        }else{
            setCurrPlayer(playerX)
        }
    }

    const fetchCurrPlayer = ()=> currPlayer

    const setCurrPlayer = (player) => {
        currPlayer = player
    }

    const reset = () => {
        roundsPlayed = 0
        gameBoard.reset()
        currPlayer = playerX
    }

    const playRound = (id) => {
        let a = checkWinner()
        if(a!=false) return
        currPlayer = fetchCurrPlayer()
        gameBoard.placeMarker(id, currPlayer.getMarker())
        flipTurn()
        displayController.renderMessage(`Player ${currPlayer.getMarker()}'s turn`)
        roundsPlayed+=1
        console.log(roundsPlayed)
        a = checkWinner()
        if(a!=false){
            displayController.renderMessage(`Player ${a} has won`)
        }
        else if(roundsPlayed==9){
            displayController.renderMessage("It's a draw")
        }
    }

    const checkWinner = ()=>{
        const checker = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i=0; i<checker.length; i++){
            let el1 = gameBoard.fetchMarker(checker[i][0])
            let el2 = gameBoard.fetchMarker(checker[i][1])
            let el3 = gameBoard.fetchMarker(checker[i][2])
            if(el1==" " || el2== " " || el3==" ") continue
            if((el1===el2) && (el2===el3)){
                return gameBoard.fetchMarker(checker[i][0])
            }
        }
        return false
    }

    return {
        reset,
        playRound
    }
})();

const displayController = (()=>{
    
    const gridElements = document.querySelectorAll('.grid-element')
    const messageElement = document.querySelector('.message')
    const restartButton = document.querySelector('.restart-button')

    gridElements.forEach((grid)=>{
        grid.addEventListener('click',(e)=>{
            if(gameBoard.isFilled(e.target.id)) return
            gameController.playRound(parseInt(e.target.id))
            renderBoard()
        })
    })

    restartButton.addEventListener("click",()=>{
        gameController.reset()
        renderBoard()
        renderMessage("Player X's turn")
    })

    const renderBoard = ()=>{
        for(let i=0;i<gridElements.length;i++){
            gridElements[i].textContent = gameBoard.fetchMarker(i)
        }
    }

    const renderMessage = (message)=>{
        messageElement.textContent = message
    }

    return {
        renderBoard,
        renderMessage
    }
})();