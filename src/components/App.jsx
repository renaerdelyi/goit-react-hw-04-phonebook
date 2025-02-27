import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
 
  const[contacts, setContacts] = useState( [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
   
   const[filter, setFilter] = useState('');

   useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if(storedContacts){
      setContacts(JSON.parse(storedContacts))
    }
   },[]);

   useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
   },[contacts]);


  const addContact = contact => {
    if (contacts.find(c => c.name === contact.name)) {
      alert(`${contact.name} already exists in contacts!`);
      return;
    }
   setContacts(prevContacts => [...prevContacts, contact]);
    };
  
  const changeFilter = e => {
    setFilter(e.target.value );
  };

  const getFilteredContacts = () =>  {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const deleteContact = id => {
      setContacts(prevContacts => prevContacts.filter (contact => contact.id !== id));
  };

  
    return (
      <div className={styles.App}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
}

export default App;