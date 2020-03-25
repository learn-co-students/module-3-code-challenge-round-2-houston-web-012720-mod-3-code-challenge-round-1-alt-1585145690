const ul = document.querySelector('.list-group')
const div = document.querySelector('#beer-detail')




fetch("http://localhost:3000/beers")
.then(resp=>resp.json())
.then(data=> showBeersDetail(data))



const showBeersDetail = (data) =>{
data.forEach(beerData =>{
 addBeer(beerData)
})
}

const addBeer = (data) =>{
    const li = document.createElement('li')
    li.className = "list-group-item" 
    li.innerText = data.name 

    li.addEventListener('click',()=>{
        div.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.innerText = data.name 
        const img = document.createElement('img')
        img.src = data.image_url 
        const h3 = document.createElement('h3')
        h3.innerText = data.tagline
        const textarea = document.createElement('textarea')
        textarea.innerText = data.description
        const editBtn = document.createElement('button')
        editBtn.id = "edit-beer"
        editBtn.className = "btn btn-info"
        editBtn.innerText = "Save"
        editBtn.addEventListener('click',()=>{
        const info = textarea.value
        fetch("http://localhost:3000/beers/"+data.id,{
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: info
            })
        })
        .then(resp=>resp.json())
        .then(data =>{
            textarea.innerText = data.description
           
        })
   })
        div.append(h1,img,h3,textarea,editBtn)
    })

    ul.append(li)
}