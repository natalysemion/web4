const uri = 'api/Actors';
let actors = [];
function getActors() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayActors(data))
        .catch(error => console.error('Unable to get actors.', error));
}
function addActor() {
    const addNameTextbox = document.getElementById('add-name');
    const addRatingTextbox = document.getElementById('add-rating');
    const addGenderTextbox = document.getElementById('add-gender');
    const actor = {
        name: addNameTextbox.value.trim(),
        rating: addRatingTextbox.value.trim(),
        gender: addGenderTextbox.value.trim(),
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actor)
    })
        .then(response => response.json())
        .then(() => {
            getActors();
            addNameTextbox.value = '';
            addRatingTextbox.value = '';
            addGenderTextbox.value = '';
        })
        .catch(error => console.error('Unable to add actor.', error));
}
function deleteActor(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getActors())
        .catch(error => console.error('Unable to delete Actor.', error));
}
function displayEditForm(id) {
    const actor = actors.find(actor => actor.id == id);
    document.getElementById('edit-id').value = actor.id;
    document.getElementById('edit-name').value = actor.name;
    document.getElementById('edit-rating').value = actor.rating;
    document.getElementById('edit-gender').value = actor.gender;
    document.getElementById('editForm').style.display = 'block';
}
function updateActor() {
    const actorId = document.getElementById('edit-id').value;
    const actor = {
        id: parseInt(actorId, 10),
        name: document.getElementById('edit-name').value.trim(),
        rating: document.getElementById('edit-rating').value.trim(),
        gender: document.getElementById('edit-gender').value.trim()
    };
    fetch(`${uri}/${actorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actor)
    })
        .then(() => getActors())
        .catch(error => console.error('Unable to update actor.', error));
    closeInput();
    return false;
}
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}
function _displayActors(data) {
    const tBody = document.getElementById('actors');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(actor => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${actor.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteActor(${actor.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(actor.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeRating = document.createTextNode(actor.rating);
        td2.appendChild(textNodeRating);

        let td3 = tr.insertCell(2);
        let textNodeGender = document.createTextNode(actor.gender);
        td3.appendChild(textNodeGender);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });
    actors = data;
}