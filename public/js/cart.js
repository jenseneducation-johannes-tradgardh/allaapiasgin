function loadCart()  {
    fetch('http://localhost:8000/api/getCart')
    .then((res) => res.json())    
    .then((data) => {
    //   const add = addProductToCart(name);
        
        let output = '<h2>Produkter i varukorgen</h2>';
        data.forEach(function(products) {
            
            output += `
                <div id="produkter" >
                <h2> ${products.name}</h2> </br>
                <img src="${products.img}" height="130px" width="200px"/></br>
                <p>Price: ${products.price}</p> </br>
                <button id="bod" name="${products.name}"> Ta bort </button>
                </div>
            `;
             })
             document.getElementById('cart').innerHTML = output;        
            })
            document.getElementById('bod').addEventListener
        }
        loadCart();