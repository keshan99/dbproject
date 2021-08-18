const open_plues = document.getElementById("open-plues");
const modal_plues = document.getElementById('modal-plues-con');
const open_mines = document.getElementById("open-mines");
const modal_mines = document.getElementById('modal-mines-con');

const catagory1 = document.getElementById('catagory1');
const catagory2 = document.getElementById('catagory2');
const show_type_pluse = document.getElementById('show-type-pluse');
const show_type_mines = document.getElementById('show-type-mines');

const formPluse = document.getElementById('pluse-money-form');
const formMines = document.getElementById('mines-money-form');

var inID; // for save id of topic_of_money table when in_or_out == 1
var outId; // for save id of topic_of_money table when in_or_out == 0

open_plues.addEventListener('click', () => {
    modal_plues.classList.add('show-modal');
});
open_mines.addEventListener('click', () => {
    modal_mines.classList.add('show-modal');
});

window.addEventListener('click', (e) => {
    e.target == modal_plues ? modal_plues.classList.remove('show-modal') : false;
    e.target == modal_mines ? modal_mines.classList.remove('show-modal') : false;

});

catagory1.addEventListener('click', (e) => {
    if (e.target.classList.contains('cata_select')) {
        show_type_pluse.innerText = e.target.innerText;
        inID = Number(e.target.id);


    }
});

catagory2.addEventListener('click', (e) => {
    if (e.target.classList.contains('cata_select')) {
        show_type_mines.innerText = e.target.innerText;
        outId = Number(e.target.id);

    }

});

var moneyItemPluseID = document.getElementById('hiddenInputPluse');
formPluse.addEventListener('submit', function(e) {
    e.preventDefault();
    if (Number.isFinite(inID)) {
        moneyItemPluseID.value = inID;
        console.log("ok");
        console.log(inID);
        formPluse.action = '/auth/updateMoney';
        formPluse.submit();
    }
});

var moneyItemMinesID = document.getElementById('hiddenInputMines');
formMines.addEventListener('submit', function(e) {
    e.preventDefault();
    if (Number.isFinite(outId)) {
        moneyItemMinesID.value = outId;
        console.log("ok");
        console.log(outId);
        formMines.action = '/auth/updateMoney';
        formMines.submit();
    }
});