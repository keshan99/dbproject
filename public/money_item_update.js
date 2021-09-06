const dragArea = document.querySelector(".wrapper");
new Sortable(dragArea, {
    animation: 350
});


const item = document.querySelectorAll(".item");

dragArea.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-adjust')) {
        console.log(e.target.id);
        if (e.target.parentElement.classList.contains('off')) {
            e.target.parentElement.classList.remove('off');
        } else {
            e.target.parentElement.classList.add('off');
        }

    } else {
        console.log("no")
    }
});