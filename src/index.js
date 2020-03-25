/* <ul class="list-group">
  <li class="list-group-item">Beer title 1</li>
  <li class="list-group-item">Beer title 2</li>
  /* etc... */
// </ul>

const ul = document.querySelector('.list-group')
const div = document.querySelector('#beer-detail')

fetch('http://localhost:3000/beers')
.then(res => res.json())
.then(beers => {
    beers.forEach( beer => {
        showBeer(beer)
    })
})

function showBeer(beer){
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = beer.name 

    li.addEventListener('click', ()=>{
        div.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.innerText = `${beer.name} Name`

        const img = document.createElement('img')
        img.src = beer.image_url

        const h3 = document.createElement('h3')
        h3.innerText = beer.tagline

        const textarea = document.createElement('textarea')
        textarea.innerText = beer.description

        const btn = document.createElement('button')
        btn.innerText = 'save'
        btn.className = 'btn btn-info'

        btn.addEventListener('click', () => {
            // console.log(textarea.value)
            fetch('http://localhost:3000/beers/' + beer.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                description: textarea.value
                })
            })
            .then(res => res.json())
            .then(updatedBeer => {
                console.log(updatedBeer)
                console.log(textarea.value)
                beer = updatedBeer

            
            })
        })

        
        div.append(h1, img, h3, textarea, btn)
    })

    ul.append(li)
}
