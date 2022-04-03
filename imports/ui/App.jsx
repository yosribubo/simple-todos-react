import { Meteor } from 'meteor/meteor';
import React, {useState, Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? {userId: user._id} : {};

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(userFilter, { sort: { createdAt: -1 } }).fetch()
  });

  const logout = () => Meteor.logout();

  return (
    <div>
      <h1>Welcome to Meteor</h1>

      { user ? (
        <Fragment>
          <div onClick={logout}>
            {user.username} Logout
          </div>
          <TaskForm user={user}/>

          <ul>
          { tasks.map(task => <Task key={ task._id } task={ task }></Task>) }
          </ul>
        </Fragment>
      ) : (
        <LoginForm />
      )
      }

      
    </div>
  );
}
