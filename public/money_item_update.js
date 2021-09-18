const dragArea = document.querySelector(".wra");
const edit_item = document.getElementById("edit_item");
const Edit_pop_Input = document.getElementById("edit_ele");
const BEditEle = document.getElementById("BEditEle");

new Sortable(dragArea, {
    animation: 350
});

let temp;

const item = document.querySelectorAll(".item");

dragArea.addEventListener('click', function(e) {
    if (e.target.classList.contains('items')) {
        console.log(e.target.classList);
        if (e.target.parentElement.classList.contains('off')) {
            e.target.parentElement.classList.remove('off');
            e.target.classList.add('fa-trash');
            e.target.classList.remove('fa-trash-restore');
        } else {
            if (e.target.parentElement.classList.contains('addNew')) {
                e.target.parentElement.classList.add('addNewOff');
            } else {
                e.target.parentElement.classList.add('off');
                e.target.classList.remove('fa-trash');
                e.target.classList.add('fa-trash-restore');
            }

        }
    } else {
        //console.log("no")
    }
    if (e.target.classList.contains('fa-pen')) {
        edit_item.classList.add('show-modal');

        temp = e.target.parentElement;
        //console.log(temp.innerText)
        Edit_pop_Input.value = temp.innerText;
    }
});

const InputADD = document.getElementById("InputADD");
const BAdd = document.getElementById("BAdd");

BAdd.addEventListener('click', function(e) {
    if (InputADD.value != "") {
        //console.log(InputADD.value)

        var div = document.createElement("div");
        div.classList.add("item");
        div.classList.add("addNew");
        div.innerHTML = `
        <i class="fas fa-bars"></i>
      <span class="text">${InputADD.value}</span>
      <i class="fas fa-trash items"></i>
      <i class="fas fa-pen"></i>
        `;

        dragArea.appendChild(div);


    }

});

window.addEventListener('click', (e) => {
    e.target == edit_item ? edit_item.classList.remove('show-modal') : false;
});

BEditEle.addEventListener('click', (e) => {
    temp.innerHTML = `
    <i class="fas fa-bars"></i>
      <span class="text">${edit_ele.value}</span>
      <i class="fas fa-trash items"></i>
      <i class="fas fa-pen"></i>
    `;
    edit_item.classList.remove('show-modal');
});