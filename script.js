const textarea = document.getElementById("text").children[0]
const menuBar = document.getElementById("menuBar")
const footer = document.getElementById("footer")
const container = document.getElementById("container")

let menuBarWidth = 50
let footerHeight = 25

function adjustSize(menuBarWidth, footerHeight) {
    menuBar.style.width = `${menuBarWidth}px`
    footer.style.height = `${footerHeight}px`
    
    textarea.style.width = `calc(100% - ${menuBarWidth}px)`
    textarea.style.height = `calc(100% - ${footerHeight}px)`
    textarea.style.transform = `translateX(${menuBarWidth}px)`
}

adjustSize(menuBarWidth, footerHeight)

document.getElementById("buttonExpand").addEventListener("click", () => {
    if (menuBarWidth > 50) {
        container.style.display = "flex"
        container.style.marginTop = "10px"
        container.style.marginLeft = ""
        menuBarWidth = 50
    } else {
        container.style.display = "block"
        container.style.marginTop = "10px"
        container.style.marginLeft = "calc(100% - 35px)"
        menuBarWidth = 100
    }

    adjustSize(menuBarWidth, footerHeight)
})