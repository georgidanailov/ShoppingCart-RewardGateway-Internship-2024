window.addEventListener('DOMContentLoaded', ()=>{
    const shopBtn = document.querySelector('.shopBtn')
    const cartBtn = document.querySelector('.cartBtn')
    const itemContainer = document.querySelector('.item-container')
    
    const shopSec = document.querySelector('.shop')
    const cartSec = document.querySelector('.cart')
    
    shopBtn.addEventListener('click', ()=>{
        cartSec.style.display="none"
        shopSec.style.display="block"
    })
    
    cartBtn.addEventListener('click', ()=>{
        shopSec.style.display="none"
        cartSec.style.display="block"
    })

    fetch('http://localhost:5500/backend/myserver.php', {
        method:'GET',
        header:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }).then(res=>res.json())
    .then(data => {
        data.forEach(product=>{
            const div = document.createElement('div')
            div.classList.add('item')
            div.setAttribute('item-id', product.id)
            div.innerHTML = `
                            <img src="./images/${product.image}">
                            <h3>${product.title}</h3>
                            <span class="price">$${product.price/100}/kg</span>
                            <button class="btn add-btn">Add To Cart</button>
            `
            itemContainer.appendChild(div)

        })
    })
    let spy = new MutationObserver(mutations=>{
        mutations.forEach(mutation=>{
            if(!mutation.addedNodes.length == 1) return
            if(mutation.target.classList.contains('item-container')){
                mutation.addedNodes[0].children[3].addEventListener('click', addCartElm)
            }
        })
    })
    spy.observe(itemContainer, {childList:true})

    const tbody = document.querySelector('tbody');

    function addCartElm(){
        const tr = document.createElement('tr')
        tr.classList.add('item-now')
        tr.setAttribute('item-id', this.parentElement.getAttribute('item-id'))
        tr.innerHTML = `
        <td class="item-img"> <img src="${this.parentElement.children[0].src}"> </td>
        <td> ${this.parentElement.children[1].innerText}</td>
        <td> ${this.parentElement.children[2].innerText}</td>
        <td><input type="number" value="1"></td>
        <td><button class="rm-btn">Remove</td>
        `;
        tbody.insertBefore(tr, tbody.lastElementChild)
        updateTotal()
    }

    function updateTotal(){}

})