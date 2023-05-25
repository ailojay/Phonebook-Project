// Contacts Array
let contacts = [];

// Load Contacts from Local Storage
function loadContacts() {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts) {
    contacts = JSON.parse(savedContacts);
  }
}

// Save Contacts to Local Storage
function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Add Contact
function addContact(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const city = document.getElementById('city').value;
  const career = document.getElementById('career').value;

  const contact = {
    name: name,
    phone: phone,
    email: email,
    city: city,
    career: career
  };

  contacts.push(contact);
  document.getElementById('addContactForm').reset();
  showContacts();
}

// Show Contacts
function showContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const card = `<div class="card mb-2">
                    <div class="card-body">
                      <h5 class="card-title">${contact.name}</h5>
                      <p class="card-text">${contact.phone}</p>
                      <p class="card-text">${contact.email}</p>
                      <p class="card-text">${contact.city}</p>
                      <p class="card-text">${contact.career}</p>
                      <a class="btn btn-info btn-sm" href="pages/viewcontact.html">View Details</a>
                      <button type="button" class="btn btn-warning" onclick="editContact(${i})">Edit</button>
                      <button type="button" class="btn btn-danger" onclick="deleteContact(${i})">Delete</button>
                    </div>
                  </div>`;
    contactList.innerHTML += card;
  }
}

// Show Contact Details
function showContactDetails(index) {
  const contact = contacts[index];
  const contactDetails = document.getElementsByClassName('contactDetails');
  console.log(contactDetails);
  contactDetails.innerHTML = `
        <div class="container">
        <h1>Contact Details</h1>
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">${contact.name}</h5>
            <p class="card-text"><strong>Phone Number:</strong> ${contact.phone}</p>
            <p class="card-text"><strong>Email:</strong> ${contact.email}</p>
            <p class="card-text"><strong>City:</strong> ${contact.city}</p>
            <p class="card-text"><strong>Career:</strong> ${contact.career}</p>
          </div>
        </div>
        <a href="index.html" class="btn btn-primary">Back to Contact List</a>
      </div>
  `;
  contactDetailsPage.document.write(contactDetails);
}

// Search Contacts
function searchContacts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchInput) ||
      contact.phone.toLowerCase().includes(searchInput) ||
      contact.email.toLowerCase().includes(searchInput)
    );
  });

  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';

  if (filteredContacts.length === 0) {
    contactList.innerHTML = '<p>No contacts found.</p>';
  } else {
    filteredContacts.forEach(contact => {
      const card = `
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">${contact.name}</h5>
            <p class="card-text">${contact.phone}</p>
            <button type="button" class="btn btn-primary" onclick="showContactDetails('${contact.phone}')">View Details</button>
            <button type="button" class="btn btn-warning" onclick="editContact('${contact.phone}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteContact('${contact.phone}')">Delete</button>
          </div>
        </div>`;
      contactList.innerHTML += card;
    });
  }
}




// Edit Contact
function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;
  document.getElementById('city').value = contact.city;
  document.getElementById('career').value = contact.career;

  contacts.splice(index, 1);
  showContacts();
}

// Delete Contact
function deleteContact(index) {
  contacts.splice(index, 1);
  showContacts();
}


// Event Listeners
document.getElementById('addContactForm').addEventListener('submit', (event) => {
  addContact(event);
  saveContacts();
});

document.getElementById('searchInput').addEventListener('keyup', searchContacts);

// Load Contacts on page load
window.addEventListener('load', () => {
  loadContacts();
  showContacts();
});
