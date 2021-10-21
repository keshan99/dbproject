const add_note = document.getElementById("add_note");
const add_note_1 = document.getElementById("add_note_1");
const update_note = document.getElementById("update_note");
const update_note_1 = document.getElementById("update_note_1");
const add_note_edit_item = document.getElementById("add_note_edit_item");




const dragArea = document.querySelector(".wra");

new Sortable(dragArea, {
    animation: 350
});

let temp;

function new_item() {
    document.getElementById("wra_ID").innerHTML = ``;
    add_note.classList.add('show-modal');
    add_note_edit_item.classList.remove('show-modal');
}

function close_win() {
    add_note.classList.remove('show-modal');
    update_note.classList.remove('show-modal');
}

window.addEventListener('click', (e) => {
    //console.log(e.target.classList)
    e.target == add_note_edit_item ? add_note_edit_item.classList.remove('show-modal') : false;
    e.target == add_note_1 ? add_note.classList.remove('show-modal') : false;
    e.target == update_note_1 ? update_note.classList.remove('show-modal') : false;



    if (e.target.classList.contains("list-col")) {
        update_note.classList.add('show-modal');
        //console.log("0")
        //console.log(e.target.id)
        create_dr_list_for_update(e.target.id)
    } else if (e.target.parentElement.classList.contains("list-col") && !(e.target.classList.contains("deletebtnforjs"))) {
        update_note.classList.add('show-modal');
        //console.log("1")
        //console.log(e.target.parentElement.id)
        create_dr_list_for_update(e.target.parentElement.id)
    } else if (e.target.parentElement.parentElement.classList.contains("list-col") && !(e.target.classList.contains("deletebtnforjs"))) {
        update_note.classList.add('show-modal');
        //console.log("2")
        //console.log(e.target.parentElement.parentElement.id)
        create_dr_list_for_update(e.target.parentElement.parentElement.id)
    } else if (e.target.parentElement.parentElement.parentElement.classList.contains("list-col")) {
        update_note.classList.add('show-modal');
        //console.log("3")
        //console.log(e.target.parentElement.parentElement.parentElement.id)
        create_dr_list_for_update(e.target.parentElement.parentElement.parentElement.id)
    }


    if (e.target.classList.contains("mark")) {
        if (e.target.parentElement.classList.contains("done")) {

            e.target.parentElement.classList.remove("done");

            e.target.classList.remove("fa-repeat")
            e.target.classList.add("fa-check")
            console.log("11");

        } else {
            e.target.parentElement.classList.add("done");

            e.target.classList.remove("fa-check")
            e.target.classList.add("fa-repeat")

        }
    }
    if (e.target.classList.contains("fa-trash-o")) {
        e.target.parentElement.classList.add("addNewOff");
    }

    if (e.target.classList.contains('edit_task_one')) {
        add_note_edit_item.classList.add('show-modal');

        temp = e.target.parentElement;
        //console.log(temp.innerText)

        document.getElementById("add_note_edit_ele").value = temp.innerText;
    }
});


function create_dr_list_for_update(taskId) {
    const update_wra = document.getElementById("update_wra");
    items.forEach(item => {
        if (item.id == taskId) {
            var list = item.list;
            list.forEach(task => {
                console.log(task.name);
            });
        }
    });
    let str = " ";
    str += "55"

}


const InputADD = document.getElementById("InputADD");
const add_note_BAdd = document.getElementById("add_note_BAdd");



add_note_BAdd.addEventListener('click', function(e) {
    if (InputADD.value != "") {
        //console.log(InputADD.value)

        var div = document.createElement("div");
        div.classList.add("item");
        div.classList.add("addNew");
        div.innerHTML = `
        <i  class="fa fa-bars" aria-hidden="true"></i>
      <span class="text">${InputADD.value}</span>
      <i class="fa fa-trash-o items" aria-hidden="true"></i>
      <i class="fa fa-pencil edit_task_one" aria-hidden="true"></i>
      <i class="fa fa-check mark" aria-hidden="true"></i>
        `;
        dragArea.appendChild(div);
        InputADD.value = "";
    }

});

//
const BEditEle_add = document.getElementById("BEditEle_add");
BEditEle_add.addEventListener("click", (e) => {
    temp.children[1].innerText = document.getElementById("add_note_edit_ele").value;
    add_note_edit_item.classList.remove('show-modal')
});



let senditem = {
    title: "",
    task: []
};

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    let tempL = document.querySelectorAll(".addNew");
    let itemsList = []

    tempL.forEach(ele => {
        if (!ele.classList.contains("addNewOff")) {
            let itemEle = { name: "", done: 0 }
            itemEle.name = ele.innerText;
            if (ele.children[4].classList.contains("fa-repeat")) {
                itemEle.done = 1;
            }
            itemsList.push(itemEle)
        }

    });

    const note_title = document.getElementById("InputADDNoteName");
    if (note_title.value != "") {

        senditem.title = note_title.value;
        senditem.task = itemsList;
        console.log(senditem);
    }

});