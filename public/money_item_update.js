const dragArea = document.querySelector(".wra");
const edit_item = document.getElementById("edit_item");
const Edit_pop_Input = document.getElementById("edit_ele");
const BEditEle = document.getElementById("BEditEle");
const form1 = document.getElementById("form1");

new Sortable(dragArea, {
    animation: 350
});

let temp;


const item = document.querySelectorAll(".item");


let State_Change = []
dragArea.addEventListener('click', function(e) {
    if (e.target.classList.contains('items')) {
        //console.log(e.target.classList);
        if (e.target.parentElement.classList.contains('off')) {
            e.target.parentElement.classList.remove('off');
            e.target.classList.add('fa-trash');
            e.target.classList.remove('fa-trash-restore');

            let ok = 0;
            State_Change.forEach(sc => {
                if (sc.id == e.target.parentElement.id) {
                    sc.new = "ok"
                    ok = 1;
                }
            });
            if (ok == 0) {
                let State = {
                    id: e.target.parentElement.id,
                    ori: "delete",
                    new: "ok"
                }
                State_Change.push(State);
            }

        } else {
            if (e.target.parentElement.classList.contains('addNew')) {
                e.target.parentElement.classList.add('addNewOff');
                //////////
                let index = new_items_name.indexOf(e.target.parentElement.innerText.trim());
                if (index > -1) {
                    new_items_name.splice(index, 1);
                }
            } else {
                e.target.parentElement.classList.add('off');
                e.target.classList.remove('fa-trash');
                e.target.classList.add('fa-trash-restore');

                let ok = 0;
                State_Change.forEach(sc => {
                    if (sc.id == e.target.parentElement.id) {
                        sc.new = "delete"
                        ok = 1;
                    }
                });
                if (ok == 0) {
                    let State = {
                        id: e.target.parentElement.id,
                        ori: "ok",
                        new: "delete"
                    }
                    State_Change.push(State);
                }
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

let new_items_name = [];

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
        new_items_name.push(InputADD.value);

        dragArea.appendChild(div);
        InputADD.value = "";


    }

});

window.addEventListener('click', (e) => {
    e.target == edit_item ? edit_item.classList.remove('show-modal') : false;
});


let rename_titles = [];
BEditEle.addEventListener('click', (e) => {


    let ok = 0;
    rename_titles.forEach(rt => {
        if (rt.new == temp.innerText.trim()) {
            rt.new = edit_ele.value.trim();
            ok = 1;
        }
    });

    if (temp.classList.contains("addNew")) {
        //new_items_name
        new_items_name.forEach((element, index) => {
            if (element == temp.innerText.trim()) {
                new_items_name[index] = edit_ele.value.trim();
                console.log(index)
            } else {
                new_items_name.push(edit_ele.value.trim());
                //console.log(index)
            }
        });
        ok = 1;
    }

    if (ok == 0) {
        let title_detail = {
            id: temp.id,
            ori: temp.innerText.trim(),
            new: edit_ele.value.trim()
        }
        rename_titles.push(title_detail);
    }



    if (temp.classList.contains('off')) {
        temp.innerHTML = `
    <i class="fas fa-bars"></i>
      <span class="text">${edit_ele.value}</span>
      <i class="fas fa-trash-restore items"></i>
      <i class="fas fa-pen"></i>
    `;
    } else {
        temp.innerHTML = `
    <i class="fas fa-bars"></i>
      <span class="text">${edit_ele.value}</span>
      <i class="fas fa-trash items"></i>
      <i class="fas fa-pen"></i>
    `;
    }

    edit_item.classList.remove('show-modal');
});

const list_data = document.getElementById("list_data");
const delete_data = document.getElementById("delete_data");
const renameTitles = document.getElementById("rename_titles");
const StateChange = document.getElementById("State_Change");
const newItems_name = document.getElementById("new_items_name");

form1.addEventListener("submit", (e) => {
    e.preventDefault();
    const items_object = document.querySelectorAll(".item");
    let items = [];
    let remove_items = [];


    items_object.forEach(item => {
        let temp = {
            id: -1,
            title: ""
        };

        if (typeof item.id !== 'undefined') {
            temp.id = item.id;
        }
        temp.title = item.innerText;


        if (!item.classList.contains('off') && !item.classList.contains('addNewOff')) {
            items.push(temp);
        } else {
            if (item.classList.contains('off')) {
                remove_items.push(temp);
            }

        }

    });

    items.forEach(i => {
        console.log("save", i);
    });

    remove_items.forEach(r => {
        console.log("re", r);
    });

    rename_titles.forEach(rt => {
        console.log("rt", rt)
    });

    State_Change.forEach(sc => {
        console.log("sc", sc)
    });

    console.log(new_items_name)


    list_data.value = JSON.stringify(items);
    delete_data.value = JSON.stringify(remove_items);
    renameTitles.value = JSON.stringify(rename_titles);
    StateChange.value = JSON.stringify(State_Change);
    newItems_name.value = JSON.stringify(State_Change);

    /*
        list_data.value = items;
        delete_data.value = remove_items;
        renameTitles.value = rename_titles;
        StateChange.value = State_Change;
        newItems_name.value = State_Change;
    */

    form1.action = '/updateMoneyTitleIn';
    form1.submit();


});