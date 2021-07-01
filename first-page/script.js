const open_plues = document.getElementById("open-plues");
const modal_plues = document.getElementById('modal-plues-con');

const catagory = document.getElementById('catagory');
const show_type_pluse = document.getElementById('show-type-pluse');

open_plues.addEventListener('click', () => {
    modal_plues.classList.add('show-modal')
});

window.addEventListener('click', (e) => {
    e.target == modal_plues ? modal_plues.classList.remove('show-modal') : false
});

catagory.addEventListener('click', (e) => {
    if (e.target.classList.contains('cata_select')) {
        show_type_pluse.innerText = e.target.id;
    }

});