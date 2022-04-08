import React from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IUser } from '../interfaces';
import deleteSvg from '../icons/delete.svg';

type UsersListProps = {
  users: IUser[];
  onDelete(id: number): void;
  onChange(id: number, date: Date, active: boolean): void;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  onDelete,
  onChange
}) => {
  const deleteHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    onDelete(id);
  }

  const renderHeader = () => {
    let headerElement = ['UserID', 'Date Registration', 'Date Last Activity', ''];
    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  const renderBody = () => {
    return users.map(user => {
      // let dateReg: Date = 
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td className='edit'>
            <DatePicker
              selected={user.dateRegistration}
              onChange={(date: Date) => onChange(user.id, date, false)}
              dateFormat="dd/MM/yyyy"
              maxDate={user.dateLastActivity} />
          </td>
          <td className='edit'>
            <DatePicker
              selected={user.dateLastActivity}
              onChange={(date: Date) => onChange(user.id, date, true)}
              dateFormat="dd/MM/yyyy"
              minDate={user.dateRegistration}
              maxDate={new Date()} />
          </td>
          <td className='opration'>
            <div className='button-delete' onClick={(e) => deleteHandler(e, user.id)}>
              <img src={deleteSvg} alt='' />
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <React.Fragment>
      <table className='table-users'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>
    </React.Fragment>
  )
}
