document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(beers => {
        beers.forEach(beer => showBeer(beer))
    });
    function showBeer(beer){
        const ul = document.querySelector("ul.list-group")
        const li = document.createElement("li")
        li.innerText = beer.name
        li.className = "list-group-item"
        li.addEventListener("click", () => {
            // <h1>Beer Name</h1>
            // <img src="<add beer img url here>">
            // <h3>Beer Tagline</h3>
            // <textarea>Beer Description</textarea>
            // <button id="edit-beer" class="btn btn-info">
            //     Save
            // </button>
            const div = document.querySelector("div#beer-detail")
            div.innerHTML = ""
            const h1 = document.createElement("h1")
            h1.innerText = beer.name
            const img = document.createElement("img")
            img.src = beer.image_url
            const h3 = document.createElement("h3")
            h3.innerText = beer.tagline
            const textarea = document.createElement("textarea")
            textarea.innerText = beer.description
            const button = document.createElement("button")
            button.innerText = "Save"
            button.addEventListener("click", () => {
                fetch("http://localhost:3000/beers/" + beer.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify ({
                        description: textarea.value
                    })
                })
                .then(res => res.json())
                .then(newBeer => {
                    beer.description = newBeer.description
                })
            })

            div.append(h1,img,h3,textarea,button)
        })
        ul.append(li)
    }
})