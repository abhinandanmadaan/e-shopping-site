$(function () {

    let cartList = $('#cart-list')
  
    function fetchCartItems (done) {
        $.get('/api/cart', function (data) {
            done(data)
        })
    }

    function createCartItemCard (item) {
        return $(`
        <div class="col-4 card mx-2 p-4">
            <h4 class="product-name">${item.name}</h4>
            <div class="product-manufacturer">${item.manufacturer}</div>
            <div class="row">
                <div class="col m-3 p-3">
                    <b>Rs. ${item.price}</b>
                </div>
                <div class="col m-3 p-3">
                    Quantity:
                    <b> ${item.quantity}</b>
                </div>
                <div class="col m-3 p-3">
                    Total price:
                    <b> ${item.quantity * item.price}</b>
                </div>
                <button class="col btn btn-warning m-3" id="removeButton" onclick="removeItem(event)" >Remove</button> 
            </div>
        </div>`
            )
    }

    fetchCartItems(function (cartItems) {
        let tamount=0;
        cartList.empty()
        for (item of cartItems) {
            cartList.append(createCartItemCard(item))
            tamount=tamount+item.price*item.quantity;
        }
        cartList.append(`
        <div class="row">
        <div class="col m-3 p-3">
            <b>Bill amount: </b>
            <b>Rs. ${tamount}</b>
        </div>
        </div>
        `)
    })
})

removeItem = function (event) 
{
   const name = event.target.parentElement.parentElement.children[0].innerText;
   console.log(name)
   
   $.post('/api/cart', 
   {
           name:name,
           flag:1
   },
   function (data)
   {
       console.log("data send")
   }
   )

}
   
gotohome = function(event)
{
    window.location = "http://localhost:2678/index.html"
}
    // fetchProducts(function (products) {
    //     productList.empty()
    //     for (product of products) {
    //         productList.append(createProductCard(product))
    //     }
    // })