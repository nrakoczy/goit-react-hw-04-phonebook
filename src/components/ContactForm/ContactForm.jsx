import React, { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = shortid.generate();
    onSubmit({ ...contact, id });
    reset();
  };

  const reset = () => {
    setContact({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label">Name</label>
      <input
        type="text"
        name="name"
        value={contact.name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
        className="inputForm"
      />

      <label className="label">Number</label>
      <input
        type="tel"
        name="number"
        value={contact.number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
        className="inputForm"
      />

      <button type="submit" className="btnForm">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
