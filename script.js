document.querySelector(".year").textContent = new Date().getFullYear() 

const grids = document.querySelectorAll('.grid-element')
grids.forEach((grid)=>{
    grid.addEventListener('click',(e)=>{
        console.log(e.target.id)
    })
})