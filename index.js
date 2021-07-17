var taskId = 0;
var totalItemCount = 0;
var completedCount = 0;

window.onload = function () {
    // Get the input field
    var input = document.getElementById("addItemInput");
    updateCompletedCount();
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            addTask();
        }
    });
}

function addTask() {
    var inputText = document.getElementById("addItemInput").value

    if (!inputText) {
        return;
    }

    taskId++;
    totalItemCount++;

    var todoListContainer = document.getElementById("todoListContainer");

    var deleteIcon = getDeleteIcon();
    var editIcon = getEditIcon();

    var checkbox = getCheckBox();
    var checkBoxLabel = getCheckBoxLabel();

    var newRow = getNewRow();

    newRow.appendChild(checkbox);
    newRow.appendChild(checkBoxLabel);
    newRow.appendChild(deleteIcon);
    newRow.appendChild(editIcon);

    todoListContainer.appendChild(newRow);

    document.getElementById("addItemInput").value = '';

    updateTotalItemCount();
    setVisibility();

    // Helper functions
    function getNewRow() {
        var node = document.createElement("div");
        node.id = taskId;
        node.classList.add(...["list-row", "row-item"]);
        return node;
    }

    function getCheckBoxLabel() {
        var taskInput = document.createElement('input');
        taskInput.htmlFor = taskId;
        taskInput.readOnly = true;
        taskInput.classList.add(...["added-task-input"]);
        taskInput.value = inputText;


        taskInput.addEventListener("keyup", (event) => {
            var input = event.currentTarget.parentNode.children[1];
            var editIcon = event.currentTarget.parentNode.children[3];

            if (event.key === "Enter") {
                input.readOnly = true;
                editIcon.style.visibility = 'visible';
            }
        });
        
        taskInput.addEventListener("blur", () => {
            var input = event.currentTarget.parentNode.children[1];
            var editIcon = event.currentTarget.parentNode.children[3];
            input.readOnly = true;
            editIcon.style.visibility = 'visible';
        });

        taskInput.onclick = onTaskEdit;

        return taskInput;
    }

    function getCheckBox() {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = taskId;
        checkbox.classList.add(...["form-check-input"]);
        checkbox.addEventListener("change", onCheckBoxChange) // <-- add this line
        return checkbox;
    }

    function getDeleteIcon() {
        var deleteIcon = document.createElement("icon");
        deleteIcon.classList.add(...["fa", "fa-trash", "fa-2x", "float-right"]);
        deleteIcon.onclick = onDelete;
        return deleteIcon;
    }

    function getEditIcon() {
        var editIcon = document.createElement("icon");
        editIcon.id = taskId + 'editIcon';
        editIcon.classList.add(...["fa", "fa-pencil", "fa-2x", "float-right"]);
        editIcon.onclick = onTaskEdit;
        return editIcon;
    }
}

function onTaskEdit(event) {
    var editIcon = event.currentTarget.parentNode.children[3];
    editIcon.style.visibility = 'hidden';

    var input = event.currentTarget.parentNode.children[1];
    input.readOnly = false;
    setTimeout(() => {
        input.focus();
    });
}

function setTaskUnEditable(input) {
    input.readOnly = true;
}

function onDelete(event) {
    event.target.parentNode.remove();
    totalItemCount--;
    if (completedCount > 0) {
        completedCount--;
    }

    updateCompletedCount();
    updateTotalItemCount();
    setVisibility();
}

function setVisibility() {
    if (totalItemCount) {
        document.getElementById("taskInfo").style.visibility = 'visible';
    } else {
        document.getElementById("taskInfo").style.visibility = 'hidden';
    }
}

function onCheckBoxChange(event) {
    if (event.currentTarget.checked) {
        completedCount++;
    } else {
        completedCount--;
    }
    updateCompletedCount();
}

function updateCompletedCount() {
    document.getElementById("completedTasks").innerHTML = completedCount;
}


function updateTotalItemCount() {
    document.getElementById("totalTasks").innerHTML = totalItemCount;
}