import React, { useState, useEffect } from 'react';
import css from 'components/App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('Contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    if (
      !contacts.find(
        contact => data.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts(prevState => (prevState ? [...prevState, data] : [data]));
    } else {
      alert(`${data.name} is already in contacts.`);
    }
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const findContact = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        fontWeight: 700,
      }}
    >
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={findContact} />
        {contacts.length === 0 ? (
          <p className={css.messageUser}>
            There are no contacts in the Phonebook
          </p>
        ) : (
          <ContactList
            contacts={filterContacts}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
    </div>
  );
}
