const gameBoard = document.querySelector('#game_board')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info_display')

const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [rook, knight, bishop, queen, king, bishop, knight, rook, pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, rook, knight, bishop, queen, king, bishop, knight, rook]

const createBoard = () => {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        gameBoard.append(square)
        square.setAttribute('square-id', i)
        square.innerHTML = startPiece
        square.firstChild && square.firstChild.setAttribute('draggable', true)

        let row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        } else {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add("black")
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add("white")
        }
    })
}

createBoard()

const allSquares = document.querySelectorAll('#game_board .square')
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const taken = e.target.classList.contains('piece')
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkWinner()
            changePlayer()
            return
        }
    }

    if (taken && !takenByOpponent) {
        infoDisplay.textContent = 'Not a valid move.'
        setTimeout(() => infoDisplay.textContent = "", 2000)
        return
    }

    if (valid) {
        e.target.append(draggedElement)
        checkWinner();
        changePlayer()
        return
    }

}

function checkIfValid(target) {

    const targetId = Number(target.getAttribute('square-id') || Number(target.parentNode.getAttribute('square-id')))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    const rowDiff = Math.abs(Math.floor(targetId / width) - Math.floor(startId / width))
    const colDiff = Math.abs((targetId % width) - (startId % width))

    checkWinner()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    if (!correctGo) {
        return false
    }

    switch (piece) {
        case 'pawn':
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
            if (
                starterRow.includes(startId) && startId + (width * 2) === targetId && !document.querySelector(`[square-id="${startId + (width * 2)}"]`).firstChild ||
                startId + width === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + (width - 1) === targetId && document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                startId + (width + 1) === targetId && document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild
            ) {
                return true
            }
            break;

        case 'knight':
            if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
                return true;
            }
            break

        case 'bishop':
            if (
                (rowDiff === 1 && rowDiff === 1) ||
                (startId + (width * 2 - 2) === targetId) && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 3 - 3) === targetId) && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 4 - 4) === targetId) && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 5 - 5) === targetId) && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 6 - 6) === targetId) && !document.querySelector(`[square-id="${startId + (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 7 - 7) === targetId) && !document.querySelector(`[square-id="${startId + (width * 6 - 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||

                (startId + (width * 2 + 2) === targetId) && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 3 + 3) === targetId) && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 4 + 4) === targetId) && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 5 + 5) === targetId) && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 6 + 6) === targetId) && !document.querySelector(`[square-id="${startId + (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 7 + 7) === targetId) && !document.querySelector(`[square-id="${startId + (width * 6 + 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||

                (startId - (width * 2 - 2) === targetId) && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 3 - 3) === targetId) && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 4 - 4) === targetId) && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 5 - 5) === targetId) && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 6 - 6) === targetId) && !document.querySelector(`[square-id="${startId - (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 7 - 7) === targetId) && !document.querySelector(`[square-id="${startId - (width * 6 - 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||

                (startId - (width * 2 + 2) === targetId) && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 3 + 3) === targetId) && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 4 + 4) === targetId) && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 5 + 5) === targetId) && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 6 + 6) === targetId) && !document.querySelector(`[square-id="${startId - (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 7 + 7) === targetId) && !document.querySelector(`[square-id="${startId - (width * 6 + 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild
            ) {
                return true;
            }
            break;

        case 'rook':
            if (
                (rowDiff === 1 && colDiff === 0) ||
                (rowDiff === 0 && colDiff === 1) ||
                (startId + (width * 2) === targetId) && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 3) === targetId) && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 4) === targetId) && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 5) === targetId) && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 6) === targetId) && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 7) === targetId) && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||

                (startId - (width * 2) === targetId) && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 3) === targetId) && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 4) === targetId) && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 5) === targetId) && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 6) === targetId) && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 7) === targetId) && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||

                (startId - 2 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                (startId - 3 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                (startId - 4 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                (startId - 5 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                (startId - 6 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                (startId - 7 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild ||

                (startId + 2 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                (startId + 3 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                (startId + 4 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                (startId + 5 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                (startId + 6 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                (startId + 7 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild
            ) {
                return true;
            }
            break;

        case 'queen':
            if (
                (rowDiff === 1 && rowDiff === 1) ||
                (startId + (width * 2 - 2) === targetId) && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 3 - 3) === targetId) && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 4 - 4) === targetId) && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 5 - 5) === targetId) && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 6 - 6) === targetId) && !document.querySelector(`[square-id="${startId + (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||
                (startId + (width * 7 - 7) === targetId) && !document.querySelector(`[square-id="${startId + (width * 6 - 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width - 1)}"]`).firstChild ||

                (startId + (width * 2 + 2) === targetId) && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 3 + 3) === targetId) && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 4 + 4) === targetId) && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 5 + 5) === targetId) && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 6 + 6) === targetId) && !document.querySelector(`[square-id="${startId + (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||
                (startId + (width * 7 + 7) === targetId) && !document.querySelector(`[square-id="${startId + (width * 6 + 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId + (width + 1)}"]`).firstChild ||

                (startId - (width * 2 - 2) === targetId) && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 3 - 3) === targetId) && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 4 - 4) === targetId) && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 5 - 5) === targetId) && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 6 - 6) === targetId) && !document.querySelector(`[square-id="${startId - (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||
                (startId - (width * 7 - 7) === targetId) && !document.querySelector(`[square-id="${startId - (width * 6 - 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 5 - 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 - 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 - 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 - 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width - 1)}"]`).firstChild ||

                (startId - (width * 2 + 2) === targetId) && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 3 + 3) === targetId) && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 4 + 4) === targetId) && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 5 + 5) === targetId) && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 6 + 6) === targetId) && !document.querySelector(`[square-id="${startId - (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||
                (startId - (width * 7 + 7) === targetId) && !document.querySelector(`[square-id="${startId - (width * 6 + 6)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 5 + 5)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 4 + 4)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 3 + 3)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width * 2 + 2)}"]`).firstChild && !document.querySelector(`[square-id="${startId - (width + 1)}"]`).firstChild ||

                (rowDiff === 1 && colDiff === 0) ||
                (rowDiff === 0 && colDiff === 1) ||
                (startId + (width * 2) === targetId) && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 3) === targetId) && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 4) === targetId) && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 5) === targetId) && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 6) === targetId) && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                (startId + (width * 7) === targetId) && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||

                (startId - (width * 2) === targetId) && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 3) === targetId) && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 4) === targetId) && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 5) === targetId) && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 6) === targetId) && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                (startId - (width * 7) === targetId) && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||

                (startId - 2 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                (startId - 3 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                (startId - 4 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                (startId - 5 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                (startId - 6 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                (startId - 7 === targetId) && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild ||

                (startId + 2 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                (startId + 3 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                (startId + 4 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                (startId + 5 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                (startId + 6 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                (startId + 7 === targetId) && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild
            ) {
                return true;
            }
            break;

        case 'king':
            if (
                rowDiff === 1 && colDiff === 0 ||
                rowDiff === 0 && colDiff === 1 ||
                rowDiff === 1 && colDiff === 1
            ) {
                return true;
            }
            break;
    }
}

function checkWinner() {
    const kings = Array.from(document.querySelectorAll('#king'))

    if (!kings.some((king) => king.firstChild.classList.contains('white'))) {
        infoDisplay.textContent = 'Black Player Wins'
        const allPieces = Array.from(document.querySelectorAll('.piece'));
        allPieces.forEach((piece) => piece.setAttribute('draggable', false));
    }
    if (!kings.some((king) => king.firstChild.classList.contains('black'))) {
        infoDisplay.textContent = 'White Player Wins'
        const allPieces = Array.from(document.querySelectorAll('.piece'));
        allPieces.forEach((piece) => piece.setAttribute('draggable', false));
    }
}

function changePlayer() {
    if (playerGo === 'black') {
        playerGo = 'white'
        playerDisplay.textContent = 'white'
        reverseIds()
    } else {
        playerGo = 'black'
        playerDisplay.textContent = 'black'
        revertIds()
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-Id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-Id', i))

}


// TO CHECK WHETHER THE BISHOP'S PATH IS BLOCKED OR NOT

// if (rowDiff === colDiff && !isPathBlocked(startId, targetId)) {
//     return true;
// }
// function isPathBlocked(startId, targetId) {
//     const stepRow = startId < targetId ? 1 : -1;
//     const stepCol = (startId % width) < (targetId % width) ? 1 : -1;
//     let currentRow = Math.floor(startId / width) + stepRow;
//     let currentCol = startId % width + stepCol;
//     console.log(currentRow, currentCol)

//     while (currentRow !== Math.floor(targetId / width) || currentCol !== targetId % width) {
//         const currentSquare = document.querySelector(`[square-id="${currentRow * width + currentCol}"]`);
//         console.log(currentSquare)
//         if (currentSquare && currentSquare.firstChild) {
//             return true; // Path is blocked
//         }
//         currentRow += stepRow;
//         currentCol += stepCol;
//     }
//     return false; // Path is clear
// }
