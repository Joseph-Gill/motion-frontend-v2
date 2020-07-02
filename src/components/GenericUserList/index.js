import React from 'react';
import GenericUserCard from '../GenericUserCard';

// This component can be reused every time we need to render a list of Users.
// The actual list of users is provided by the parent.
// You just import this GenericUserList and pass the list of users as a prop called "users"
const GenericUserList = ({ users }) => users.map((user, i) => <GenericUserCard user={user} key={'user' + user.id} />);

export default GenericUserList;


// TODO add proptypes to type check the "shape" of the users array is correct
