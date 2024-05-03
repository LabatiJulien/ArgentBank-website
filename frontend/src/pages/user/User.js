import React, { useState } from 'react';
import '../../Css/Global.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers'; 

const User = () => {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user?.firstName || '');
  const dispatch = useDispatch();

  const toggleEditName = () => {
    setEditName(!editName);
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({ ...user, firstName: newName })); 
    toggleEditName(); 
  };

  return (
    <>
      <main className="main bg-dark">
        {token ? (
          <div>
            <div className="header">
              {editName ? (
                <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Enter your name" value={newName} onChange={handleChange} />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
                  <button className="edit-button" onClick={toggleEditName}>Edit Name</button>
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
