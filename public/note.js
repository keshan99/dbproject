const newBtn = document.getElementById("new");
const add_item = document.getElementById("add_item");
const view_item = document.getElementById("view_item");


newBtn.addEventListener('click', (e) => {
    add_item.classList.add('show-modal');
    document.getElementById("add_submit_btn").classList.add("show-modal");
});


window.addEventListener('click', (e) => {
    e.target == add_item ? add_item.classList.remove('show-modal') : false;
    //e.target == view_item ? view_item.classList.remove('show-modal') : false;
    if (e.target == view_item) {
        view_item.classList.remove('show-modal');
        view_title.disabled = true;
        view_note.disabled = true;
        edit_submit_btn.classList.remove("show-modal");
        edit_delete_btn.classList.remove("show-modal");
        view_item_edit.classList.remove("off");
    }
});

// for view post
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        //console.log("this is a item class");
        //console.log(e.target.id)
        viewPost(e.target.id)
    } else if (e.target.parentElement.classList.contains('item')) {
        //console.log("this also");
        //.log(e.target.parentElement.id)
        viewPost(e.target.parentElement.id)
    }
});

const view_title = document.getElementById('view_title');
const view_note = document.getElementById("view_note");
const edit_submit_btn = document.getElementById("edit_submit_btn");
const edit_delete_btn = document.getElementById("edit_delete_btn");

let post_Id;

function viewPost(postId) {
    post_Id = postId;
    view_item.classList.add('show-modal');
    view_note.value = notes[postId].note;
    view_title.value = notes[postId].title;
    console.log(notes[postId].note)
}


//for edit post
const view_item_edit = document.getElementById("view_item_edit");

view_item.addEventListener('click', (e) => {
    if (e.target.classList.contains('view_item_edit')) {
        view_title.disabled = false;
        view_note.disabled = false;
        edit_submit_btn.classList.add("show-modal");
        edit_delete_btn.classList.add("show-modal");
        view_item_edit.classList.add("off");
        console.log("ok")
    }
})

// submit -> add  
const add_form = document.getElementById("add_form");
add_form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("submit")

        add_form.action = '/addNote';
        add_form.submit();
    })
    //delete note
edit_delete_btn.addEventListener('click', (e) => {

    hiddenNoteId.value = notes[post_Id].Note_ID;

    update_form.action = '/deleteNote';
    update_form.submit();

});

// submit -> update  
const update_form = document.getElementById("update_form");
const hiddenNoteId = document.getElementById("hiddenNoteId");
update_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("update");
    console.log(notes[post_Id].Note_ID);
    hiddenNoteId.value = notes[post_Id].Note_ID;

    update_form.action = '/updateNote';
    update_form.submit();
})