import { useState } from "react";
import shortid from "shortid";
import css from 'components/ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputChange = e => {
        const { name, value } = e.currentTarget;

        switch (name) { 
            case 'name':
                setName(value);
                break;
            
            case 'number':
                setNumber(value);
                break;
            
            default:
                return;
        }
    };

    const handleSubmit = e => {
        const id = shortid.generate();
        e.preventDefault();
        onSubmit({ name: name, number: number, id: id });
        reset();
    };
    
    const reset = () => {
        setName('');
        setNumber('')
    };

        return (
            <form
                onSubmit={handleSubmit}
                className={css.form}
            >
                <label
                    className={css.label}>
                    Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleInputChange}
                    className={css.inputForm}
                />

                <label
                    className={css.label}>
                    Number
                </label>
                
                <input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleInputChange}
                    className={css.inputForm}
                />

                <button
                    type="submit"
                    className={css.btnForm}>Add contact
                </button>
            
            </form>
        );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};