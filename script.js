const x_class='x'
const o_class='o'

// Oh arrays, I both love and hate you...
const winning_combinations= [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
const cellElements=document.querySelectorAll('[data-cell]')
const winningMessageElement=document.getElementById('winningMessage')
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const resetButton=document.getElementById('resetButton')
let oTurn

startGame()

resetButton.addEventListener('click',startGame)

function startGame() {
	oTurn=false
	cellElements.forEach(cell => {
		cell.classList.remove(x_class)
		cell.classList.remove(o_class)
		cell.removeEventListener('click',handleClick)
		cell.addEventListener('click',handleClick,{once:true})
	})
	winningMessageElement.classList.remove('show')
}

function handleClick(e) {
	const cell=e.target
	const currentClass=oTurn?o_class:x_class
	placeMark(cell,currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurn()
	}
}

function placeMark(cell,currentClass) {
	cell.classList.add(currentClass)
}

function swapTurn() {
	oTurn=!oTurn
}

function checkWin(currentClass) {
	return winning_combinations.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText='Draw!'
	} else {
		winningMessageTextElement.innerText=`${oTurn?"Player 2":"Player 1"} Wins!`
	}
	winningMessageElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(x_class) ||
		cell.classList.contains(o_class)
	})
}