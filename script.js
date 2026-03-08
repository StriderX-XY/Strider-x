// MENU MOBILE
const menuToggle=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('.nav-menu');
menuToggle.addEventListener('click',()=>{navMenu.classList.toggle('active');});

// SLIDER PRODUIT
const thumbs=document.querySelectorAll('.thumb');
const mainImg=document.getElementById('main-img');
thumbs.forEach(thumb=>{
    thumb.addEventListener('click',()=>{
        mainImg.src=thumb.src;
        thumbs.forEach(t=>t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// PANIER
let cart=JSON.parse(localStorage.getItem('cart'))||[];
function displayCart(){
    const cartItems=document.getElementById('cart-items');
    const totalEl=document.getElementById('total');
    if(!cartItems)return;
    cartItems.innerHTML='';
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price;
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`<p>${item.name} - ${item.size} - ${item.price}€</p><button onclick="removeFromCart(${index})">Supprimer</button>`;
        cartItems.appendChild(div);
    });
    totalEl.textContent=total+'€';
}

function addToCart(name,price,size){
    cart.push({name,price,size});
    localStorage.setItem('cart',JSON.stringify(cart));
    displayCart();
}

const addBtn=document.getElementById('add-to-cart');
if(addBtn){
    addBtn.addEventListener('click',()=>{
        const name=document.querySelector('.product-info h1').textContent;
        const price=parseInt(document.querySelector('.product-info .price').textContent.replace('€',''));
        const size=document.getElementById('size').value;
        addToCart(name,price,size);
        alert('Produit ajouté au panier !');
    });
}

function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    displayCart();
}

displayCart();