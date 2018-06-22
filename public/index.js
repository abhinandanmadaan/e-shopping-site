$(function () {

    let productList = $('#product-list')

    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(createProductCard(product))
        }
    })

})

 doWork = function (event) 
 {
    const name = event.target.parentElement.parentElement.children[0].innerText;
   // console.log(name)
    
    $.post('/api/cart', 
    {
            name:name,
            flag:0
    },
    function (data)
    {
        console.log("data send")
    }
    )
    alert("Item Added to cart !!")
 }

 gotoadmin = function(event)
 {
     window.location = "http://localhost:2678/add_products.html"
 }

 gotocart = function(event)
{
    window.location = "http://localhost:2678/mycart.html"
}