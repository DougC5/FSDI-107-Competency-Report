/*

Online Store
 -display a dynamic catalog of items
 - Add items to catalog (Save to backend)
 - Display different categories (from the backend)
 - Display the list of categories/ Click to open category
 - Filter (search by text)
 - Add items to cart


Items in the store will have:
- Id
- Name
- Desc
- Price
- Image
- Category

*/

let catalog = [];
let isDataValid = true;
let url = 'http://localhost:8080';


function Item(name, desc, price, img, cat) {

    this.user = 'DougC';
    this.cart = false;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.img = img;
    this.cat = cat;

}

function registerItem() {
    console.log('register item');

    let name = $('#colFormName').val();
    let desc = $('#colFormDesc').val();
    let price = $('#colFormPrice').val();
    let img = $('#colFormImg').val();
    let cat = $('#colFormCat').val();

    //perform data validations
    if (!name) {
        $('#colFormName').addClass('border border-danger');
        isDataValid = false;
    }else{
        $('#colFormName').removeClass('border border-danger');
    }

    if (!desc) {
        $('#colFormDesc').addClass('border border-danger');
        isDataValid = false;
    }else{
        $('#colFormDesc').removeClass('border border-danger');
    }

    if (!price || isNaN(price)) {
        $('#colFormPrice').addClass('border border-danger');
        isDataValid = false;
    }else{
        $('#colFormPrice').removeClass('border border-danger');

    }

    if (!img) {
        $('#colFormImg').addClass('border border-danger');
        isDataValid = false;
    }else{
        $('#colFormImg').removeClass('border border-danger');
    }

    if (!cat) {
        $('#colFormCat').addClass('border border-danger');
        isDataValid = false;
    }else{
        $('#colFormCat').removeClass('border border-danger');
    }


    if (isDataValid) {
        let theItem = new Item(name, desc, price, img, cat);
        console.log(theItem);

        // add item to server
        sendToServer(theItem);
        //catalog.push(theItem);
        clearForm();

        $('#submit-alert').removeClass('hidden');

        setTimeout(function(){
            $('#submit-alert').addClass('hidden');

        }, 3000);
    }

    if (isDataValid === false){
    $('#fail-alert').removeClass('hidden');

        setTimeout(function(){
            $('#fail-alert').addClass('hidden');

        }, 3000);
}

    //reset teh data variable
isDataValid = true;

}

function clearForm() {
    //clear the form
    $('#colFormName').val('');
    $('#colFormDesc').val('');
    $('#colFormPrice').val('');
    $('#colFormImg').val('');
    $('#colFormCat').val('');
}
// add item to array
//clear the forms

function sendToServer(item){

    let theString = JSON.stringify(item);

    $.ajax({
        url: url + '/API/points',
        type: 'POST',
        data: theString,
        contentType: 'application/json',
        success: function(res){
        console.log('sucess ', res);

    },
        error: function(res){
        console.log('ERROR** ', res);
    }
    });

}

function removeOne(item){
  //let item = $('#txtIdToRemove').val();

  let theObject = {
    removeId: item
  };

  let objString = JSON.stringify(theObject);

  $.ajax({
      url: url + '/API/points',
      type: 'DELETE',
      data: objString,
      contentType: 'application/json',
      success: function(res){
      console.log('sucess: ', res);

      $('.removedAlert').removeClass('d-none');

          setTimeout(function(){
              $('.removedAlert').addClass('d-none');

          }, 3000);

      window.location.reload();

  },
      error: function(res){
      console.log('ERROR** ', res);
      console.log(res);
  }
  });
}

function removeAll(){

  let theObject = {
    removeUser: 'DougC'
  };

  let objString = JSON.stringify(theObject);

  $.ajax({
      url: url + '/API/points/many',
      type: 'DELETE',
      data: objString,
      contentType: 'application/json',
      success: function(res){
      console.log('sucess: ', res);
      $('#removedAllAlert').removeClass('d-none');

          setTimeout(function(){
              $('#removedAllAlert').addClass('d-none');

          }, 3000);

  },
      error: function(res){
      console.log('ERROR** ', res);
      console.log(res);
  }
  });
}

function buildItemList() {
  $('#dropdownMenuRemove').html('');

console.log('inside build item list function ', dataBase.length);

    for (var i = 0; i < dataBase.length; i++) {
        let thisItem = dataBase[i];
        let button = `<button id='${thisItem._id}' class="dropdown-item" type="button">${thisItem.name}</button>`;
        $('#dropdownMenuRemove').append(button);

    }
}

$(document).ready(function () {

    $('#btnSubmit').click(registerItem);
    $('#btnClear').click(clearForm);

    $('#btnRemoveOne').click(removeOne);
    $('#btnRemoveAll').click(removeAll);

    $('#dropdownMenuRemove').on('click', 'button', function (e) {
        removeSingleItem(e);
    });



});
