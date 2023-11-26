import { useState, useEffect } from 'react';
import AddContacts from './components/AddContacts/AddContacts';
import ContactsList from './components/ContactsList/ContactsList';

import './App.scss';

function App ()  {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState('contacts');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const limitedData = data.slice(0, 7);
        setContacts(limitedData);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]); 
    setCurrentPage('contacts');
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  return (
    <div>
      <header>
        <button onClick={() => setCurrentPage('contacts')}>Contacts</button>
        <button onClick={() => setCurrentPage('addContact')}>Add Contact</button>
      </header>

      {currentPage === 'contacts' && (
        <ContactsList contacts={contacts} onDeleteContact={handleDeleteContact} />
      )}

      {currentPage === 'addContact' && (
        <AddContacts onSaveContact={handleAddContact} onCancel={() => setCurrentPage('contacts')} />
      )}
    </div>
  );
};

export default App;
