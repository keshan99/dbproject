const open_plues = document.getElementById("open-plues");
const modal_plues = document.getElementById('modal-plues-con');
const open_mines = document.getElementById("open-mines");
const modal_mines = document.getElementById('modal-mines-con');

const edit_modal_mines = document.getElementById('edit-modal-mines-con');
const edit_modal_pluse = document.getElementById('edit-modal-pluse-con');


const catagory1 = document.getElementById('catagory1');
const catagory2 = document.getElementById('catagory2');
const catagory3 = document.getElementById('catagory3');
const show_type_pluse = document.getElementById('show-type-pluse');
const show_type_mines = document.getElementById('show-type-mines');
const edit_show_type_pluse = document.getElementById('edit_show-type-pluse');
const edit_show_type_mines = document.getElementById('edit_show-type-mines');


const formPluse = document.getElementById('pluse-money-form');
const formMines = document.getElementById('mines-money-form');
const edit_formPluse = document.getElementById('edit_pluse-money-form');
const edit_formMines = document.getElementById('edit_mines-money-form');


const moneydetailIn = document.getElementById('ID_moneydetailIn');
const moneydetailOut = document.getElementById('ID_moneydetailOut');

var inID; // for save id of topic_of_money table when in_or_out == 1
var outId; // for save id of topic_of_money table when in_or_out == 0
var edit_inID; // for save id of topic_of_money table when in_or_out == 1
var edit_outId; // for save id of topic_of_money table when in_or_out == 0

open_plues.addEventListener('click', () => {
    modal_plues.classList.add('show-modal');
});
open_mines.addEventListener('click', () => {
    modal_mines.classList.add('show-modal');
});

window.addEventListener('click', (e) => {
    e.target == modal_plues ? modal_plues.classList.remove('show-modal') : false;
    e.target == modal_mines ? modal_mines.classList.remove('show-modal') : false;
    e.target == edit_modal_mines ? edit_modal_mines.classList.remove('show-modal') : false;
    e.target == edit_modal_pluse ? edit_modal_pluse.classList.remove('show-modal') : false;

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
        //console.log("ok");
        //console.log(inID);
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

catagory3.addEventListener('click', (e) => {
    if (e.target.classList.contains('cata_select')) {
        edit_show_type_pluse.innerText = e.target.innerText;
        edit_inID = Number(e.target.id.slice(4));
        console.log(edit_inID)
    }

});
var client_RID = 0;
moneydetailIn.addEventListener('click', (e) => {
    if (e.target.classList.contains('postEdit')) {

        console.log(e.target.id);
        console.log(clientmoneydetailIn[e.target.id]);

        client_RID = clientmoneydetailIn[e.target.id].RID;
        let client_name = clientmoneydetailIn[e.target.id].name;
        let client_note = clientmoneydetailIn[e.target.id].note;
        let client_value = clientmoneydetailIn[e.target.id].value;

        edit_inID = Number(clientmoneydetailIn[e.target.id].TID);

        edit_modal_pluse.classList.add('show-modal');

        var value = document.getElementById('edit_money_in');
        var note = document.getElementById('edit_note_in');

        value.value = client_value;
        note.value = client_note;

        let str = 'edit' + edit_inID;
        console.log(str);
        let selected_label = document.getElementById(str);
        selected_label.classList.add('active');
        console.log(str);

        edit_show_type_pluse.innerText = client_name;

    }

});

const del_hid_RID_in = document.getElementById('editpost-hidden_RID_Pluse');
var edit_moneyItemPluseID = document.getElementById('editpost-hiddenInputPluse');
edit_formPluse.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("submit hi")


    if (Number.isFinite(edit_inID)) {
        edit_moneyItemPluseID.value = edit_inID;
        console.log(edit_inID);

        del_hid_RID_in.value = client_RID;

        edit_formPluse.action = '/auth/updateMoneyrecode';
        edit_formPluse.submit();
    }

});

const delete_in = document.getElementById('edit_form_in_delete');
delete_in.addEventListener('click', (e) => {
    console.log("delete hi", client_RID);
    del_hid_RID_in.value = client_RID;
    edit_formPluse.action = 'auth/deleteMoneyRecode';
    edit_formPluse.submit();
});




///////////////////////////////////


catagory4.addEventListener('click', (e) => {
    if (e.target.classList.contains('cata_select')) {
        edit_show_type_mines.innerText = e.target.innerText;
        edit_outId = Number(e.target.id.slice(4));
        console.log(edit_outId)
    }

});
var client_RID = 0;
moneydetailOut.addEventListener('click', (e) => {
    if (e.target.classList.contains('postEdit')) {

        console.log(e.target.id);
        console.log(clientmoneydetailOut[e.target.id]);

        client_RID = clientmoneydetailOut[e.target.id].RID;
        let client_name = clientmoneydetailOut[e.target.id].name;
        let client_note = clientmoneydetailOut[e.target.id].note;
        let client_value = clientmoneydetailOut[e.target.id].value;

        edit_outId = Number(clientmoneydetailOut[e.target.id].TID);

        edit_modal_mines.classList.add('show-modal');

        var value = document.getElementById('edit_money_out');
        var note = document.getElementById('edit_note_out');

        value.value = client_value;
        note.value = client_note;

        let str = 'edit' + edit_outId;
        console.log(str);
        let selected_label = document.getElementById(str);
        selected_label.classList.add('active');
        console.log(str);

        edit_show_type_mines.innerText = client_name;

    }

});

const del_hid_RID_out = document.getElementById('editpost-hidden_RID_mines');
var edit_moneyItemMinesID = document.getElementById('editpost-hiddenInputMines');
edit_formMines.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("submit hi")


    if (Number.isFinite(edit_outId)) {
        edit_moneyItemMinesID.value = edit_outId;
        console.log(edit_outId);

        del_hid_RID_out.value = client_RID;

        edit_formMines.action = '/auth/updateMoneyrecode';
        edit_formMines.submit();
    }

});

const delete_out = document.getElementById('edit_form_out_delete');
delete_out.addEventListener('click', (e) => {
    console.log("delete hi", client_RID);
    del_hid_RID_out.value = client_RID;
    edit_formMines.action = '/auth/deleteMoneyRecode';
    edit_formMines.submit();
});

const filter = document.getElementById('filter');
filter.addEventListener('input', filterPosts);

// Filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.money_post');

    posts.forEach(post => {
        const title = post.querySelector('.money_title').innerText.toUpperCase();
        const body = post.querySelector('.money_note').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}