const ul = document.querySelector("ul#list-group")
const div = document.querySelector("div#beer-detail")

fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(beer => makeBeerList(beer))
    })


function makeBeerList(beer){
    let li = document.createElement("li")
    li.className = "list-group-item"
    li.innerText = beer.name

    li.addEventListener("click", ()=> {
        div.innerHTML = ""
        fetch(`http://localhost:3000/beers/${beer.id}`)
            .then(resp => resp.json())
            .then(beer => makeBeerCard(beer))
    })

    ul.append(li)
}

function makeBeerCard(beer){
  
    let h1 = document.createElement("h1")
    h1.innerText = beer.name


    let img = document.createElement("img")
    img.src = beer.image_url

    let h3 = document.createElement("h3")
    h3.innerText = beer.tagline

    let textarea = document.createElement("textarea")
    textarea.innerText = beer.description


    let btn = document.createElement("button")
    btn.id = "edit-beer"
    btn.className = "btn btn-info"
    btn.innerText = "Save"

    btn.addEventListener("click", ()=>{
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({  
                description: textarea.value 
            })
        })
            .then(resp => resp.json())
            .then(beer => makeBeerList(beer))

    })


    div.append(h1,img,h3,textarea,btn)
    // console.log(beer)
}