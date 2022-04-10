import React, { useState, useEffect } from 'react';
import './App.css';
import { IUser, IResult } from './interfaces';
import data from './data';
import { UsersList } from './components/UsersList';
import BarGraph from './components/BarGraph';
import calculate from './utils/calculate';
import transformationDuring from './utils/transformationDuring';
const ROLLING_RETENTION_DAYS = 7;

const App: React.FC = () => {
  const [usersIds, setUsersIds] = useState<[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersAdd, setUsersAdd] = useState<any>([]);
  const [barGraphData, setBarGraphData] = useState<object[]>([]);
  const [result, setResult] = useState<number>(0);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(true);
  const hasUsers = users.length > 0;

  useEffect(() => {
    fetch(`/users`)
      .then(res => res.json())
      .then(data => {
      console.log({ data: data });
      const newUsers = data.users.map((user: any) => (
        {
          ...user,
          dateRegistration: new Date(user.date_registration),
          dateLastActivity: new Date(user.date_last_activity)
        }
      ));
      setUsers(newUsers);
      setUsersIds(data.users.map((user: any) => (user.id)));
    })
    .catch(()=> { 
      console.log('Error getting data. The app is running as a demo.');
      setUsers(data);
    });
  }, [])

  const onDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete the item?');
    if (confirmDelete) {
      fetch(`/users/${id}`, {
        method: 'delete',
      })
        .then(res => res.json())
        .then(res => console.log(res))
      setUsers(prev => prev.filter(user => user.id !== id));
    }
    setHasResult(false);
  }

  const onChange = (id: number, date: Date, activ: boolean) => {
    let newUsers: IUser[] = [];
    users.forEach((user) => {
      if (user.id === id) {
        let isUser: IUser =
          (!activ
            ?
            { ...user, dateRegistration: date }
            :
            { ...user, dateLastActivity: date });
        setUsersAdd([...usersAdd, transformationDuring(user.id, isUser)]);
        newUsers.push(isUser);
      } else {
        newUsers.push(user);
      }
    });
    setUsers(newUsers);
    setSaving(false);
    setHasResult(false);
  }

  const onAdd = () => {
    const date: Date = new Date;
    const newId = users.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    const user: IUser = { id: (newId), dateRegistration: date, dateLastActivity: date };
    setUsers([...users, user]);
    setUsersAdd([...usersAdd, transformationDuring(newId, user)]);
    setSaving(false);
    setHasResult(false);
  }

  const onCalculate = () => {
    const result: IResult = calculate(users, ROLLING_RETENTION_DAYS);
    setBarGraphData(result.barGraphData);
    setResult(result.rollingRetention);
    setHasResult(true);
  }

  const onSave = () => {
    setHasResult(false);
    const data = { usersIds, usersAdd };
    fetch('/users', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => console.log(res))
    setUsersAdd([]);
    setSaving(true);
  }

  const buttonAdd = () => {
      return <button className='button save add' onClick={() => onAdd()}>Add</button>
  }

  return (
    <>
      <div className="container">
        <div className="users">
          <h1 className='title'>Users Table</h1>
          <div className='container-table'>
            {hasUsers ?
              <UsersList
                users={users}
                onDelete={onDelete}
                onChange={onChange}
              />
              :
              <p className="empty">The list is empty.</p>
            }
            <div className='footer-table'>
              {hasUsers ?
                <>
                  <button
                    className={saving ? 'button' : 'button disabled'}
                    disabled={!saving}
                    onClick={() => onCalculate()}>
                    Calculate
                  </button>
                  <>
                    {saving ?
                      hasResult && <div className='result'>Rolling Retention 7 day: {result} %</div>
                      :
                      <div className='result'>Need to save data</div>}
                  </>
                  {buttonAdd()}
                  <button className='button save' onClick={() => onSave()}>Save</button>
                </>
                :
                buttonAdd()
              }
            </div>
          </div>
        </div >
        <div className='container-graph'>
          {(!!hasResult && !!saving && users.length > 1) && <BarGraph data={barGraphData} />}
        </div>
      </div>
    </>
  );
}

export default App;
