import React, { useState } from 'react';
import './AddContacts.scss';

const AddContacts = ({ onSaveContact, onCancel }) => {
  const [name, setName] = useState('');
  const [username, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', surname: '', phone: '' });

  const validateName = () => {
    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Enter your name' }));
      return false;
    }
    if (!/^[\p{L}\s-]+$/u.test(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Please enter a valid name containing only alphabetical characters, spaces, and hyphens.' }));
      return false;
    }
    return true;
  };

  const validateUsername = () => {
    if (!username.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, surname: 'Enter your surname' }));
      return false;
    }
    if (!/^[\p{L}\s-]+$/u.test(username)) {
      setErrors((prevErrors) => ({ ...prevErrors, surname: 'Please enter a valid name containing only alphabetical characters, spaces, and hyphens.' }));
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    if (!phone.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Enter your phone' }));
      return false;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'The phone number must be in 10-digit format' }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    return validateName() && validateUsername() && validatePhone();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSaveContact({ name, username, phone });
  };

  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
      <input 
          className='input-field'
          type='text' 
          placeholder='Name'
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {errors.name && <div className='error-message'>{errors.name}</div>}
        
        <input 
          className='input-field'
          type='text' 
          placeholder='Surname' 
          value={username} 
          onChange={(e) => setSurname(e.target.value)} 
        />
        {errors.surname && <div className='error-message'>{errors.surname}</div>}

        <input 
          className='input-field'
          type='tel' 
          placeholder='Phone'
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          autoComplete="off"
        />
        {errors.phone && <div className='error-message'>{errors.phone}</div>}

        <button type='submit' className='submit-button'>Save</button>
        <button type='button' className='cancel-button' onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddContacts;
