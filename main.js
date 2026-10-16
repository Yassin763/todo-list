const url = 'http://localhost:3001/tasks'
async function getTasks() {
    const response = await fetch(url)
    const data = await response.json()
    return data

}

async function showTasks() {
    const tasks = await getTasks()
    const ul = document.querySelector('.alltasks')


    for (let task of tasks) {
        const li = document.createElement('li')
        li.innerHTML = `
        <div class="item d-flex align-items-center justify-content-between  my-2 px-2 py-2 rounded-2 shadow">
            <div class="form-check  d-flex align-items-center ">
                <input class="form-check-input me-3" type="checkbox"  id="${task.id}">
                <label class="form-check-label fw-semibold fs-4 " for="${task.id}">
                    ${task.task}
                </label>
            </div>

            <div class="buttons">
                <button class="btn mx-2 pen" onclick="editTask('${task.id}', '${task.task}')"><i class="bi bi-pencil fs-4 rounded"></i></button>
                <button class="btn mx-2 pin" onclick="deleteTask('${task.id}')"><i class="bi bi-trash text-danger fs-4 rounded"></i></button>
            <div/>
        </div>
        `
        ul.appendChild(li)
    }
}

async function checkInput(event) {
        if (event.target.classList.contains('form-check-input')) {
            const check = event.target
            const label = check.nextElementSibling
            const button = check.closest('.item').querySelector('.pen');
            if (check.checked) {
                label.style.color = 'rgba(0, 0, 0 , .4)'
                label.style.textDecoration = ' line-through'
                button.style.display = 'none'
            } else {
                label.style.color = 'rgb(0, 0, 0)'
                label.style.textDecoration = 'none'
                button.style.display = 'inline-block'
            }
        }
    }
  

async function addTask(event ) {
     console.log("Add Task clicked!");
    event.preventDefault();
    const inputValue = document.querySelector('.form-control').value
    if (currantId) {
        fetch(`${url}/${currantId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: inputValue
            })
        })

    } else {
        if (inputValue !== '') {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: inputValue
                })
            })
            
        } else {
            alert('it’s empty')
        }
    }
}



async function deleteTask(id) {
    fetch(`${url}/${id}`,
        { method: "DELETE" })
}

let currantId = null
function editTask(id, taskText) {
    const input = document.querySelector('.form-control')
    input.value = taskText
    currantId = id
}



const form = document.querySelector('form')
document.addEventListener('DOMContentLoaded', showTasks)
document.addEventListener('change', checkInput)
form.addEventListener('submit', addTask)


