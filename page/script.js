const textarea = document.getElementById("text").children[0]
const menuBar = document.getElementById("menuBar")
const navBar = document.getElementById("navbar")
const footer = document.getElementById("footer")
const container = document.getElementById("container")

let menuBarWidth = 50
let footerHeight = 25
menuBar.children[1].style.transform = `translateY(12px)`

function adjustSize(menuBarWidth, footerHeight) {
    menuBar.style.width = `${menuBarWidth}px`
    footer.style.height = `${footerHeight}px`
    
    textarea.style.width = `calc(100% - ${menuBarWidth}px)`
    textarea.style.height = `calc(100% - ${footerHeight}px - 50px)`
    textarea.style.transform = `translate(${menuBarWidth}px,50px)`

    navBar.style.width = `calc(100% - ${menuBarWidth}px)`
    navBar.style.transform = `translateX(${menuBarWidth}px)`
}

adjustSize(menuBarWidth, footerHeight)

document.getElementById("buttonExpand").addEventListener("click", () => {
    if (menuBarWidth > 50) {
        container.style.display = "flex"
        container.style.marginTop = "12px"
        container.style.marginLeft = ""
        menuBar.children[1].style.transform = `translateY(12px)`
        menuBarWidth = 50
    } else {
        container.style.display = "block"
        container.style.marginTop = "12px"
        container.style.marginLeft = "calc(100% - 35px)"
        menuBar.children[1].style.transform = `translateY(8px)`
        menuBarWidth = 300
    }
    adjustSize(menuBarWidth, footerHeight)
    showTempFiles()
})

window.electronAPI.onCallSave(() => {
    window.electronAPI.saveFile(textarea.value)
})

window.electronAPI.onCallTemp(() => {
    window.electronAPI.tempSave(textarea.value)
})

let tempFiles = []
let tempFilesArray = []
let n = 0
window.electronAPI.onGetTemp(async (data) => {
    if(!tempFilesArray.includes(data)) {
        let buttonFile = document.createElement("button")
        let compressedData = data.slice(0,20) + "..."
        buttonFile.innerHTML = `Unsaved File [${n}] <br> <p>${compressedData}</p>`
        buttonFile.setAttribute("id", n)
        buttonFile.setAttribute("class", "file")
        menuBar.children[1].appendChild(buttonFile)
        tempFiles.push({index: n, content: data})
        tempFilesArray.push(data)
        n += 1
    }
    await Promise.resolve();
    showTempFiles()
})

document.getElementById("newFile").addEventListener("click", () => {
    window.electronAPI.tempSave(textarea.value)
})

function showTempFiles() {
    for (let i = 0; i < (menuBar.children[1]).children.length; i++) {
        if(menuBarWidth <= 50) {
            menuBar.children[1].children[i].style.display = "none"
        } else {
            menuBar.children[1].children[i].style.display = "block"
        }
    }

    for (let i = 0; i < document.getElementsByClassName("file").length; i++) {
        if(document.getElementsByClassName("file")[i].getAttribute("listener") == "listener") {
            continue
        } else {
            document.getElementsByClassName("file")[i].addEventListener("click", (e) => {
                textarea.value = tempFiles[e.target.id].content
            })
            document.getElementsByClassName("file")[i].setAttribute("listener", "listener")    
        }
    }
}