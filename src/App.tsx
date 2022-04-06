import React, { useState, useEffect } from 'react';
import './App.css';
import { IUser } from './interfaces';
import data from './data';
import { UsersList } from './components/UsersList';
import calculate from './utils/calculate';
const ROLLING_RETENTION_DAYS = 7;

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [result, setResult] = useState<number>(0);

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

  const onChange = (id: number, date: Date, activ: boolean) => {
    const newUsers = users.map((user) => (
      user.id === id
        ? 
        (!activ
        ?
        { ...user, dateRegistration: date }
        :
        { ...user, dateLastActivity: date })
        : user
    ));
    setUsers(newUsers);
  }

  const onAdd = () => {
    const date: Date = new Date;
    const user: IUser = {id: (users.length + 1), dateRegistration: date, dateLastActivity: date};
    setUsers([...users, user]);
  }

  const onCalculate = () => {
    setResult(calculate(users, ROLLING_RETENTION_DAYS));
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
                onChange={onChange}
              />
              <div className='footer-table'>
                <button className='button' onClick={() => onCalculate()}>Calculate</button>
                {!!result && <div className='result'>{result} %</div>}
                <button className='button save add' onClick={() => onAdd()}>Add</button>
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
