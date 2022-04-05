import React, { useState, useEffect } from 'react';
import './App.css';
import { IUser } from './interfaces';
import data from './data';
import { UsersList } from './components/UsersList';

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // fetch(`/users`)
    //   .then(res => res.json())
    //   .then(setUsers)
    setUsers(data);
  }, [])
  console.log({ users: users });

  const onDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete the item?');
    if (confirmDelete) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  }

  const onCalculate = () => {
  }

  const onSave = () => {
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="users">
          <h1 className='title'>Users Table</h1>
          {users.length > 0
            ?
            <div className='container-table'>
              <UsersList
                users={users}
                onDelete={onDelete}
              />
              <div className='footer-table'>
                <button className='button' onClick={() => onCalculate()}>Calculate</button>
                <button className='button save' onClick={() => onSave()}>Save</button>
              </div>
            </div>
            :
            <p className="empty">The list is empty.</p>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
