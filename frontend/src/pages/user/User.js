import React, { useState } from 'react';
import '../../Css/Global.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAsync } from '../../redux/reducers'; 

const User = () => {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.userName || '');
  const dispatch = useDispatch();

  const toggleEditUsername = () => {
    setEditUsername(!editUsername);
  };

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleCancel = () => {
    setNewUsername(user?.userName || ''); 
    toggleEditUsername(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAsync({ ...user, userName: newUsername, token })); 
    toggleEditUsername(); 
  };

  return (
    <>
      <main className="main bg-dark">
        {token ? (
          <div>
            <div className="header">
              {editUsername ? (
                <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Enter your username" value={newUsername} onChange={handleChange} />
                  <div>
                    <button type="submit" className="edit-button">Save</button>
                    <button type="button" onClick={handleCancel} className="edit-button">Cancel</button> 
                  </div>
                </form>
              ) : (
                <>
                  <h1>Welcome back, {user?.userName}!</h1>
                  <button className="edit-button" onClick={toggleEditUsername}>Edit Username</button>
                </>
              )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default User;
