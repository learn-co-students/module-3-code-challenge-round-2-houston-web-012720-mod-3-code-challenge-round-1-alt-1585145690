const ul = document.querySelector("ul#list-group")
const div = document.querySelector("div#beer-detail")
const body = document.querySelector("body")


// NEW BEER FORM //

    let form = document.createElement("form")
    form.id = "new-beer"
    
    let label = document.createElement("label")
    label.innerText = "Add New Beer"

    let br1 = document.createElement("br")

    let input1 = document.createElement("input")
    input1.placeholder = "Enter Beer Name"
    input1.type = "text"

    let br2 = document.createElement("br")

    
    let input2 = document.createElement("input")
    input2.placeholder = "Enter Beer Image URL"
    input2.type = "text"

    let br3 = document.createElement("br")


    let input3 = document.createElement("input")
    input3.placeholder = "Enter Tagline"
    input3.type = "text"

    let br4 = document.createElement("br")

    
    let input4 = document.createElement("input")
    input4.placeholder = "Enter Beer Description"
    input4.type = "text"

    let br5 = document.createElement("br")


    let input5 = document.createElement("input")
    input5.type = "submit"


    form.append(label,br1,input1,br2,input2,br3,input3,br4,input4,br5,input5)
    body.prepend(form)
// NEW BEER FORM // Hmm a lot more info on the beer API than I thought... 
// I would add an event listener to make a "POST" and add it to the array of beers in the db.json file...
// However running out of time...

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