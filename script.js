let contacts = JSON.parse(localStorage.getItem('contacts16') || '[]');
let editIndex = -1;

function render() {
  const tbody = document.getElementById('contactList');
  const search = document.getElementById('search').value.toLowerCase();
  const count = document.getElementById('count');
  tbody.innerHTML = '';
  let filtered = contacts.filter(c => c.name.toLowerCase().includes(search) || c.phone.includes(search));
  count.textContent = filtered.length + ' contacts';
  filtered.forEach((c, idx) => {
    let realIndex = contacts.indexOf(c);
    tbody.innerHTML += `<tr>
      <td>${c.name}</td><td>${c.phone}</td><td>${c.email}</td><td>${c.address}</td>
      <td>
        <button onclick="editContact(${realIndex})" class="btn-edit">Edit</button>
        <button onclick="deleteContact(${realIndex})" class="btn-del">Del</button>
      </td></tr>`;
  });
  localStorage.setItem('contacts16', JSON.stringify(contacts));
}

function addContact(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  if(!name ||!phone ||!email ||!address){ alert('Please fill all fields'); return; }
  if(phone.length < 11){ alert('Phone must be 11 digits'); return; }
  const data = {name, phone, email, address};
  if(editIndex===-1) contacts.push(data);
  else { contacts[editIndex]=data; editIndex=-1; }
  document.getElementById('contactForm').reset();
  render();
  alert('Contact saved!');
}

function deleteContact(i){ if(confirm('Delete?')){ contacts.splice(i,1); render(); } }
function editContact(i){ const c=contacts[i]; document.getElementById('name').value=c.name; document.getElementById('phone').value=c.phone; document.getElementById('email').value=c.email; document.getElementById('address').value=c.address; editIndex=i; }

document.addEventListener('DOMContentLoaded', render);
