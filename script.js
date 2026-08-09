let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = -1;

function render() {
  const tbody = document.getElementById('contactList');
  const search = document.getElementById('search')?.value.toLowerCase() || '';
  if(!tbody) return;
  tbody.innerHTML = '';
  contacts.forEach((c,i)=>{
    if(c.name.toLowerCase().includes(search) || c.phone.includes(search)){
      tbody.innerHTML += `<tr>
        <td>${c.name}</td><td>${c.phone}</td><td>${c.email}</td>
        <td>
          <button onclick="editContact(${i})" style="background:#00b894">Edit</button>
          <button onclick="deleteContact(${i})" style="background:#d63031">Del</button>
        </td></tr>`;
    }
  });
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!name ||!phone ||!email){ alert('Fill all fields'); return; }
  if(phone.length < 11){ alert('Phone must be 11 digits'); return; }
  if(!email.includes('@')){ alert('Invalid email'); return; }
  const data = {name, phone, email};
  if(editIndex===-1) contacts.push(data); else { contacts[editIndex]=data; editIndex=-1; }
  document.getElementById('contactForm').reset();
  render();
}

function deleteContact(i){ if(confirm('Delete this contact?')){ contacts.splice(i,1); render(); } }
function editContact(i){ const c=contacts[i]; document.getElementById('name').value=c.name; document.getElementById('phone').value=c.phone; document.getElementById('email').value=c.email; editIndex=i; }

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('search')?.addEventListener('input', render);
  render();
});
