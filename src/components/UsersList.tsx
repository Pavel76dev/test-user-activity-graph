import React from 'react';
import { IUser } from '../interfaces';
import deleteSvg from '../icons/delete.svg';

type UsersListProps = {
  users: IUser[];
  onDelete(id: number): void;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  onDelete
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
      console.log({ user: user });
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td className='edit'>{user.dateRegistration.toLocaleDateString()}</td>
          <td className='edit'>{user.dateLastActivity.toLocaleDateString()}</td>
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
