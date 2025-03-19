// removing game section
let gameSection = document.querySelector(".game")
let userNameSpan = document.querySelector(".user-name")
let cardsContainer = document.querySelector(".game .cards-container")
let worngTries = document.querySelector(".worng-tries-num")
let cards = document.querySelectorAll(".game .card")
gameSection.remove()

// entering section
// adding 20 divs to entering section
let enterSetion = document.querySelector(".entering-section")


for (let i = 0; i < 20; i++) {
  let div = document.createElement("div")
  enterSetion.append(div)
}

// getting name when clicking start game
let startButton = document.querySelector(".entering-section span")
let userName;
startButton.addEventListener("click", () => {
  // getting user name
  userName = window.prompt("Enter your name").trim()
  if (userName !== "") {
    // removing entering section
    enterSetion.remove()
    // changing body background
    document.body.style.background = "white"
    // adding game section
    document.body.append(gameSection)
  }
  // adding user name to info
  userNameSpan.innerHTML = userName
  // order the cards
  reOrder(cards)
  // matching cards
  let firstCardMatch = ""
  let secondCardMatch = ""
  let stage = 0
  matchCards(firstCardMatch, secondCardMatch, stage)
})



// misordering function
function reOrder(nodeList) {
  let orderArray = [];
  for (let i = 0; i < nodeList.length; i++) {
    orderArray[i] = i + 1
  }
  nodeList.forEach((e) => {
    let randomNum = orderArray[Math.floor(Math.random() * orderArray.length)]
    orderArray.splice(orderArray.indexOf(randomNum), 1)
    e.style.order = randomNum
  })
}

// matching cards function
function matchCards(firstCardMatch, secondCardMatch, stage) {
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.dataset.match !== undefined && stage === 0 && !event.target.classList.contains("pin")) {
      firstCardMatch = event.target.dataset.match
      stage++ 
      event.target.classList.add("active")
    } else if (event.target.dataset.match !== undefined && stage === 1 && !event.target.classList.contains("pin")) {
      secondCardMatch = event.target.dataset.match
      stage++ 
      event.target.classList.add("active")
      let timeToWait = setTimeout(() => {
        if (firstCardMatch === secondCardMatch) {
          document.querySelectorAll(`[data-match="${secondCardMatch}"]`).forEach(e => e.classList.add("pin"))
          firstCardMatch = "" 
          secondCardMatch = ""
          stage = 0
          // checking all cards are pinned
          arePinned()
        } else {
          firstCardMatch = "" 
          secondCardMatch = ""
          stage = 0
          cards.forEach((e) => {
            e.classList.remove("active")
          })
          worngTries.innerHTML++
        }
      }, 700)
    }
  })
}

// checking if all cards are pinned function

function arePinned() {
  let tempNum = 0;
  cards.forEach(e => {
    if (e.classList.contains("pin")) {
      tempNum++
    }
    if (tempNum === 20) {
      location.reload()
    }
  })
}