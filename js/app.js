//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("lista");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables

let LIST, id;

//Obtener las tareas del almacenamiento local
let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//Cargar tareas
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear Button
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

// Mostrar fecha
const options = { month: "short", day: "numeric", weekday: "long" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-US", options);

// Añadir una tarea

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `

    <li class="item">
        <i class="fa ${DONE} co" job="complete" id=${id}></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id=${id}></i>
    </li>

    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

// Escuchar Enter

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //Checar si el input no esta vacio
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            // Añadir tares al almacenamiento local
            localStorage.setItem("TODO", JSON.stringify(LIST));
            //Añadimos una unidad al valor de la id
            id++;
        }
        //Luego, vaciamos el input
        input.value = "";
    }
});

// Completar una tarea

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// Remover una tarea
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

// Target elements

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // Añadir tares al almacenamiento local
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

