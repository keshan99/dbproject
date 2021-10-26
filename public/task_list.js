const add_note = document.getElementById("add_note");
const add_note_1 = document.getElementById("add_note_1");
const update_note = document.getElementById("update_note");
const update_note_1 = document.getElementById("update_note_1");
const add_note_edit_item = document.getElementById("add_note_edit_item");
const update_note_edit_item = document.getElementById("update_note_edit_item");


const dragArea = document.querySelector(".wra");

new Sortable(dragArea, {
    animation: 350
});

let temp;

function new_item() {
    document.getElementById("wra_ID").innerHTML = ``;
    add_note.classList.add('show-modal');
    add_note_edit_item.classList.remove('show-modal');
    update_note_edit_item.classList.remove('show-modal');
}

function close_win() {
    add_note.classList.remove('show-modal');
    update_note.classList.remove('show-modal');
}

window.addEventListener('click', (e) => {
    //console.log(e.target.classList)
    e.target == add_note_edit_item ? add_note_edit_item.classList.remove('show-modal') : false;
    e.target == update_note_edit_item ? update_note_edit_item.classList.remove('show-modal') : false;
    e.target == add_note_1 ? add_note.classList.remove('show-modal') : false;
    e.target == update_note_1 ? update_note.classList.remove('show-modal') : false;



    if (e.target.classList.contains("list-col")) {
        create_dr_list_for_update(e.target.id)
    } else if (e.target.parentElement.classList.contains("list-col") && !(e.target.classList.contains("deletebtnforjs"))) {
        create_dr_list_for_update(e.target.parentElement.id)
    } else if (e.target.parentElement.parentElement.classList.contains("list-col") && !(e.target.classList.contains("deletebtnforjs"))) {
        create_dr_list_for_update(e.target.parentElement.parentElement.id)
    } else if (e.target.parentElement.parentElement.parentElement.classList.contains("list-col")) {
        create_dr_list_for_update(e.target.parentElement.parentElement.parentElement.id)
    }


    if (e.target.classList.contains("mark")) {
        if (e.target.parentElement.classList.contains("done")) {

            e.target.parentElement.classList.remove("done");

            e.target.classList.remove("fa-repeat")
            e.target.classList.add("fa-check")


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
    if (e.target.classList.contains('update_task_one')) {
        update_note_edit_item.classList.add('show-modal');

        temp = e.target.parentElement;
        //console.log(temp.innerText)
        document.getElementById("update_note_edit_ele").value = temp.innerText;

    }
});



const InputADD = document.getElementById("InputADD");
const add_note_BAdd = document.getElementById("add_note_BAdd");

const InputADD_update = document.getElementById("InputADD_update");
const add_note_BAdd_update = document.getElementById("add_note_BAdd_update");



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

//
const BEditEle_update = document.getElementById("BEditEle_update");
BEditEle_update.addEventListener("click", (e) => {
    temp.children[1].innerText = document.getElementById("update_note_edit_ele").value;
    update_note_edit_item.classList.remove('show-modal')
});



let senditem = {
    title: "",
    task: []
};
const form1 = document.getElementById("form1");
form1.addEventListener("submit", (e) => {
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


        document.getElementById("add_note_list_data").value = JSON.stringify(senditem);

        console.log(document.getElementById("add_note_list_data").value);

        form1.action = '/addTask';
        form1.submit();
    }



});

var temp_task_id;

function create_dr_list_for_update(taskId) {
    temp_task_id = taskId;
    update_note.classList.add('show-modal');
    const update_wra = document.getElementById("update_wra");
    var thisitem;
    items.forEach(item => {
        if (item.id == taskId) {
            thisitem = item;

        }
    });


    document.getElementById("InputUpdateNoteName").value = thisitem.title;
    document.getElementById("update_wra_ID").innerHTML = ""


    thisitem.list.forEach(task => {
        console.log(task.name);

        var div = document.createElement("div");
        div.classList.add("item");
        div.classList.add("addNew");
        div.id = "taskid" + task.id;

        div.innerHTML = ``;

        let st = `
        <i  class="fa fa-bars" aria-hidden="true"></i>
        <span class="text">${task.name}</span>
        <i class="fa fa-pencil update_task_one" aria-hidden="true"></i>
       
        `;

        if (task.done == 0) {
            st = st + `<i class="fa fa-check mark" aria-hidden="true"></i>`;
        } else {
            st = st + `<i class="fa mark fa-repeat" aria-hidden="true"></i>`;
            div.classList.add("done");
        }

        div.innerHTML = st

        document.getElementById("update_wra_ID").appendChild(div);

    });


    add_note_BAdd_update.addEventListener('click', function(e) {
        if (InputADD_update.value != "") {
            //console.log(InputADD.value)

            var div = document.createElement("div");
            div.classList.add("item");
            div.classList.add("addNew");
            div.classList.add("addNewWithUpdate");
            div.innerHTML = `
            <i  class="fa fa-bars" aria-hidden="true"></i>
          <span class="text">${InputADD_update.value}</span>
          <i class="fa fa-trash-o items" aria-hidden="true"></i>
          <i class="fa fa-pencil update_task_one" aria-hidden="true"></i>
          <i class="fa fa-check mark" aria-hidden="true"></i>
            `;
            document.getElementById("update_wra_ID").appendChild(div);
            InputADD_update.value = "";
        }

    });



}

let updateitem = {
    id: 0,
    title: "",
    task: [],
    newTask: []
};


document.getElementById("form2").addEventListener("submit", (e) => {
    e.preventDefault();
    let tempL = document.querySelectorAll(".addNew");
    let itemsList = []
    let newItemList = []

    tempL.forEach(ele => {
        if (!ele.classList.contains("addNewOff")) {
            if (ele.classList.contains("addNewWithUpdate")) {
                let itemEle = { id: null, name: "", done: 0 }

                itemEle.name = ele.innerText;

                if (ele.children[3].classList.contains("fa-repeat")) {
                    itemEle.done = 1;
                }
                newItemList.push(itemEle)

            } else {
                let itemEle = { id: null, name: "", done: 0 }
                itemEle.name = ele.innerText;
                itemEle.id = parseInt(ele.id.substring(6));


                if (ele.children[3].classList.contains("fa-repeat")) {
                    itemEle.done = 1;
                }
                itemsList.push(itemEle)

            }

        }

    });

    const note_title = document.getElementById("InputUpdateNoteName");
    if (note_title.value != "") {

        updateitem.title = note_title.value;
        updateitem.task = itemsList;
        updateitem.newTask = newItemList;
        updateitem.id = temp_task_id;

        console.log(updateitem);

    }

});