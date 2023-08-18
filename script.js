const inputBox = document.getElementById("input-box")
const buttons = document.querySelectorAll('button')
const ul = document.querySelector('ul')
let data = []

const dataStored = () => {
    items = JSON.parse(localStorage.getItem('data'))
    data = items || []
    renderFromLocalStorage()

}
function renderFromLocalStorage(){
    for(let i=0; i<data.length; i++){
        const list = document.createElement('li')
        const link = document.createElement('a')
        link.textContent += data[i];
        list.appendChild(link)
        link.target = "_blank"
        list.classList.add("list")
        link.href = data[i];
        ul.appendChild(list)
    }
}

dataStored();

function render(){
            const list = document.createElement('li')
            const link = document.createElement('a')
            
          
            for(let i=0; i<data.length; i++){
                link.href = data[i];
                link.textContent = data[i];
            }
            list.appendChild(link)
            link.target = "_blank"
            list.classList.add("list")
            
            ul.appendChild(list)   
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if(e.target.id === 'save-btn'){
            if(inputBox.value !== ""){
                data.push(inputBox.value)
                localStorage.setItem("data", JSON.stringify(data))
              
                render()
                inputBox.value = ''
            } 
        }
        if(e.target.id === 'delete-btn'){
            console.log("deleted")
            data = []
            localStorage.clear()
            ul.innerHTML = ""
        }
        if(e.target.id === 'tab-btn'){
            chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
      
                data.push(tabs[0].url)
                localStorage.setItem("data", JSON.stringify(data))
                render();
            })
        }
    })
})

