
let categories = [];
let categoriesAll = [];
let qty = 0;
let dataBase = [];
//let cart[];
let theObjects;

//url = 'http://restclass.azurewebsites.net';
url = 'http://localhost:8080';

let lower100 = [];
let greater100 = [];

function categoriesList(item) {

    if (categories.indexOf(item.cat) === -1) {
        categories.push(item.cat);
    }
    categoriesAll.push(item.cat);
}

function categoriesBar() {


    for (var i = 0; i < categories.length; i++) {
        let thisItem = categories[i];

        catQty(thisItem);

        let li = `<li class="list-group-item d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-info" id="catButton">${thisItem}</button>
                <span class="badge badge-primary badge-pill ">${qty}</span>
            </li>`;
        $('#catBar').append(li);

        qty = 0;
    }

}

function catQty(thisItem) {

    for (var i = 0; i < categoriesAll.length; i++) {

        if (categoriesAll[i] === thisItem) {
            qty++;
        }
    }
}


function displayCatalog() {

    for (var i = 0; i < dataBase.length; i++) {
        let thisItem = dataBase[i];
        displayItem(thisItem);
        categoriesList(thisItem);
    }
    categoriesBar();
}

//<a class="btn btn-primary buyButton align-bottom" href="cart.html" role="button">Buy Me Now!</a>

//<button class="btn btn-primary buyButton align-bottom">Buy Me Now!</button>

function displayItem(item) {
    let itemHtml = `
        <div class="col-md-4 my-4">
            <div class="card text-center">
                <img src="${item.img}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.desc}</p>
                    <p class=" card-price card-text"><strong>Item Price: $${item.price}</strong></p>
                    <button class="btn btn-primary buyButton align-bottom">Buy Me Now!</button>
                </div>
            </div>
        </div>`;

    $('#card-deck').append(itemHtml);
}

function resetAll() {
    $('#card-deck').html('');
    $('#catBar').html('');
    categories = [];
    categoriesAll = [];
    qty = 0;
}

function search(e) {

    let inputValue = '';

    if (e.target.id === 'btnLess100' || e.target.id === 'btnMore100') {
        filterAt100(e);
        return;
    }

    if (e.target.id === 'btnSearch') {
        if ($('#txtSearch').val() == '') {
            displayCatalog();
            return;
        }
        inputValue = $('#txtSearch').val().toLowerCase();
    }

    if (e.target.id === 'catButton') {
        inputValue = e.target.innerText.toLowerCase();
    }

    for (i = 0; i < dataBase.length; i++) {
        let item = dataBase[i];
        if (item.name.toLowerCase().indexOf(inputValue) >= 0 || item.desc.toLowerCase().indexOf(inputValue) >= 0 || item.id == inputValue || item.cat.toLowerCase() === inputValue) {
            displayItem(item);
            categoriesList(item);
        }
    }

    categoriesBar();
}

function filterAt100(e) {
    if (e.target.id === 'btnLess100') {
        for (i = 0; i < dataBase.length; i++) {
            let item = dataBase[i];
            if (item.price < 100) {
                displayItem(item);
                categoriesList(item);
            }
        }
    }
    if (e.target.id === 'btnMore100') {
        for (i = 0; i < dataBase.length; i++) {
            let item = dataBase[i];
            if (item.price > 100) {
                displayItem(item);
                categoriesList(item);
            }
        }
    }
    categoriesBar();

}

function lowerThan100() {
    lower100 = [];
    for (i = 0; i < dataBase.length; i++) {
        let item = dataBase[i];
        if (item.price < 100) {
            lower100.push([item.name, item.price]);
        }
    }
    console.log('lower than 100 array', lower100);
}

function greaterThan100() {
    greater100 = [];
    for (i = 0; i < dataBase.length; i++) {
        let item = dataBase[i];
        if (item.price >= 100) {
            greater100.push([item.name, item.price]);
        }
    }
    console.log('Greater than 100 array', greater100);
}

function getCatalog(){
        $.ajax({
        url: url + '/API/points',
        type: 'GET',
        success: function (response, status) {
            // console.log('all good ', response);
            // console.log('astatus ', status);
            // console.log('Length ', response.length);
            // console.log('the object is: ', theObjects);
            for (i=0; i<response.length; i++){
                let item = response[i];
                if (item.user === 'DougC' && item.cart ===false){
                    dataBase.push(item);
                }
                if(item.user === 'DougC' && item.cart ===true){
                    cart.push(item);
                }
            }
            console.log('full list is: ', dataBase);
            displayCatalog();
            displayCart();
            buildItemList();

        },
        error: function (response) {
            console.log('Error** ', response);
        }

    });
}


$(document).ready(function () {

    //hook events
    $('#txtSearch').keypress(function (e) {
        if (e.keyCode === 13) {
            search(e);
        }
    });

    $('#btnSearch').on('click', function (e) {
        resetAll();
        search(e);
    });

    $('#btnShowAll').on('click', function () {
        resetAll();
        displayCatalog();
    });

    $('#searchField').on('click', '.moreLess', function (e) {
        resetAll();
        search(e);
    });

    $('#catBar').on('click', '#catButton', function (e) {
        resetAll();
        search(e);
    });


    //initalize stuff
    getCatalog();
    lowerThan100();
    greaterThan100();

});
