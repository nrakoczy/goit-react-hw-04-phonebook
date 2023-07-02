import css from 'components/ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
    <ul className={ css.contactList}>
        {contacts.map((contact) => (
            <li
                key={contact.id}
                className={css.item}>
                {contact.name} : {contact.number}
                <button
                    type="button"
                    className={css.btnContactList}
                    onClick={() => onDeleteContact(contact.id)}
                >
                    Delete
                </button>
            </li>
        ))}
        </ul>
);

ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired, 
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
};

export default ContactList;