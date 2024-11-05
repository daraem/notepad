const textarea = document.getElementById("text").children[0]
const menuBar = document.getElementById("menuBar")
const footer = document.getElementById("footer")

let menuBarWidth = 50
let footerHeight = 25

menuBar.style.width = `${menuBarWidth}px`
footer.style.height = `${footerHeight}px`

textarea.style.width = `calc(100% - ${menuBarWidth}px)`
textarea.style.height = `calc(100% - ${footerHeight}px)`
textarea.style.transform = `translateX(${menuBarWidth}px)`

