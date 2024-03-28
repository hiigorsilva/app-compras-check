let textElement = document.querySelector("#inputText")
let buttonElement = document.querySelector("#addItem")
let buttonCheckbox = document.querySelectorAll(".checked-item")
let listElement = document.querySelector("#list")
let totalElement = document.querySelector("#counterTotal")
let checkElement = document.querySelector("#counterCompleted")
const warningInput = document.querySelector(".inputArea > span")

let arrItems = []
let itemsChecked = 0

function renderTodo() {
  listElement.innerHTML = ""

  arrItems.forEach((item, index) => {
    const liElement = document.createElement("li")
    const inputElement = document.createElement("input")
    const pElement = document.createElement("p")
    const pText = document.createTextNode(item)
    const deleteElement = document.createElement("button")
    const iconElement = document.createElement("img")

    liElement.classList.add("item")
    inputElement.setAttribute("type", "checkbox")
    inputElement.setAttribute("id", "checkedItem")
    inputElement.classList.add("checked-item")

    inputElement.addEventListener("change", function () {
      updateCounter()
    })

    pElement.appendChild(pText)

    deleteElement.classList.add("delete")
    deleteElement.setAttribute("onclick", `deleteItem(${index})`)
    iconElement.setAttribute("src", "./src/icon/delete.svg")
    deleteElement.appendChild(iconElement)

    liElement.appendChild(inputElement)
    liElement.appendChild(pElement)
    liElement.appendChild(deleteElement)

    listElement.appendChild(liElement)
    textElement.value = ""
  })
  updateCounter()
}

function addItem() {
  const textItem = textElement.value
  if (textItem !== "") {
    textElement.classList.remove("validate")
    warningInput.style.display = "none"
    arrItems.push(textItem)
    renderTodo()
  } else {
    validateInput()
  }
}

function addItemEnter(event) {
  if (event.keyCode === 13) {
    addItem()
    renderTodo()
  }
}

function validateInput() {
  textElement.classList.add("validate")
  warningInput.style.display = "block"

  textElement.addEventListener(
    "input",
    () => {
      if (textElement.value.trim() !== "") {
        textElement.classList.remove("validate")
        warningInput.style.display = "none"
      }
    },
    { once: true } // O evento é chamadado somente uma vez equanto o user digita
  )
}

function deleteItem(pos) {
  arrItems.splice(pos, 1)
  renderTodo()
}

function updateCounter(input) {
  const inputsCheckeds = document.querySelectorAll(".checked-item:checked")
  itemsChecked = inputsCheckeds.length

  totalElement.innerHTML = arrItems.length
  checkElement.innerHTML = `${itemsChecked} de ${arrItems.length}`
}

buttonElement.addEventListener("click", addItem)
textElement.addEventListener("keyup", addItemEnter)

renderTodo()
