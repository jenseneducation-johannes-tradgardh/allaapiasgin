
 
 function loadProduct()  {
fetch('http://localhost:8000/api/getProducts')
.then((res) => res.json())    
.then((data) => {
//   const add = addProductToCart(name);
    
    let output = '<h2>Products</h2>';
    data.forEach(function(products) {
        
        output += `
            <div id="produkter" >
            <h2> ${products.name}</h2> </br>
            <img src="${products.img}" height="130px" width="200px"/></br>
            <p>Price: ${products.price}</p> </br>
            <button id="bod" name="${products.name}"> Lägg till </button>
            </div>
        `;
         })
         document.getElementById('prod').innerHTML = output;        
        })
       
        
          
}   
loadProduct();

function loadCart()  {
    fetch('http://localhost:8000/api/getCart')
    .then((res) => res.json())    
    .then((data) => {
    
        let output = '<h3>Din order</h3>';
        data.forEach(function(products) {
            output += `
                <div id="carten">
                <p> ${products.name}  ${products.price}</p>
                
                </div>
            `;
        });
    
        document.getElementById('cart').innerHTML = output;
    })
    } 

    loadCart();
    

