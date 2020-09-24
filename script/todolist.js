const cafeList = document.querySelector('#todolist');
const form = document.querySelector('#add-todolist');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let list = document.createElement('span');
    let title = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    list.textContent = doc.data().list;
    title.textContent = doc.data().title;
    cross.textContent = 'x';

    li.appendChild(list);
    li.appendChild(title);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todo').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('todo').add({
        list: form.list.value,
        title: form.title.value
    });
    form.list.value = '';
    form.title.value = '';

    window.alert("working")
});

// real-time listener
db.collection('todo').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});