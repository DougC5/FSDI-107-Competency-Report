let cart = [];
let cartTotal = 0;

function CartItem (name, price){

    this.user = 'DougC';
    this.cart = true;
    this.name = name;
    this.price = price;

}

function displayCart(){
// Reset allvariables
    cartTotal = 0;
    $('#cartList').html('');
    console.log('inside display cart');
    console.log('full cart array: ', cart);

    for (var i = 0; i < cart.length; i++) {
        let thisItem = cart[i];
        console.log('single cart item: ', thisItem);
        console.log('item id', thisItem._id);

        let li = `<li class="list-group-item d-flex justify-content-between align-items-center">${thisItem.name}
    <span>$${thisItem.price} <button type="button" id='${thisItem._id}' class="btnRemoveCartItem btn btn-danger btn-sm ml-3">Remove</button></span></li>`;

        console.log(li);

        cartTotal += thisItem.price;

        $('#cartList').append(li);

    }

    $('#total').text(' $' + cartTotal);
}


function addToCart(e){
    let itemName = e.target.parentElement.getElementsByClassName('card-title')[0].innerText;
    console.log('add to cart function item title: ', itemName);
    let itemPrice;

        //loop database

    for (i = 0; i < dataBase.length; i++) {
        let item = dataBase[i];

        //console.log(item.name);
        //console.log(itemName);
        if (item.name === itemName) {
            itemPrice = parseInt(item.price);
        }

}
    let theCartItem = new CartItem(itemName, itemPrice);
    console.log('The item added to the cart: ', theCartItem);
    sendToServer(theCartItem);


}

function removeSingleItem(e){
  let removeId = e.target.id;
  removeOne(removeId);
}

$(document).ready(function () {
  //Add to Cart
    $('#card-deck').on('click', '.buyButton', function (e) {
        addToCart(e);
    });

    //remove cart item listener

    $('#cartList').on('click', '.btnRemoveCartItem', function (e) {
        removeSingleItem(e);
    });



});
