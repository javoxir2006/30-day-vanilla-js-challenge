// elements
const lists = document.querySelector('.listItems');
const deleteBtn = document.querySelector('.remove');
const addBtn = document.querySelector('.addnew');
const check = document.querySelector('.checkall');
const uncheck = document.querySelector('.uncheckall');
let items = JSON.parse(localStorage.getItem('items')) || [];

// functions


function addItem(e){
    e.preventDefault();
    const value = addBtn.querySelector('[type="text"]').value;
    const temp = {
        value,
        done: false
    }
    items.push(temp);
    localStorage.setItem('items', JSON.stringify(items));

    populateList(items, lists);

    addBtn.reset();
}

function populateList(tasks = [], place){
    place.innerHTML = tasks.map((task, i) => {
        return `<li>
                    <input type="checkbox" id="item${i}" data-index="${i}" ${task.done ? 'checked' : ''}>
                    <label for="item${i}">${task.value}</label>
                </li>`
    }).join('');
}

function toggleDone(e){
    if(!e.target.matches('input')) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;

    localStorage.setItem('items', JSON.stringify(items));
}

function deleteChecked(){
    items = items.filter(item => {
        if(!item.done){
            return item
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, lists);
}

populateList(items, lists);

let lastChecked;
const checkboxes = document.querySelectorAll('[type="checkbox"]');

function handleCheck(e){
    let inBetween = false;
    const is = [];
    if(this.checked && e.shiftKey){
        checkboxes.forEach((checkbox) => {
            if(checkbox === this || checkbox === lastChecked){
                inBetween = !inBetween;
                is.push(checkbox.dataset.index)
            }

            if(inBetween){
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;
    checkboxes.forEach((checkbox) => {
        if(checkbox.dataset.index >= is[0] && checkbox.dataset.index <= is[1]){
            items[parseFloat(checkbox.dataset.index)].done = true;
        }
    })
    localStorage.setItem('items', JSON.stringify(items));
}

function checkAll(){
    items.forEach(item => {
        item.done = true;
    })
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, lists);
}

function uncheckAll(){
    items.forEach(item => {
        item.done = false;
    })
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, lists);
}


// hooks events
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
addBtn.addEventListener('submit', addItem);
lists.addEventListener('click', toggleDone);
deleteBtn.addEventListener('click', deleteChecked);
check.addEventListener('click', checkAll);
uncheck.addEventListener('click', uncheckAll);

