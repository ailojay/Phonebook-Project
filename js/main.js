// Contacts Array
let contacts = [];

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
