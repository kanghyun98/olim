import User from '../models/user';

console.log('======Create User Table======');

User.sync({ force: true })
  .then(() => console.log('Success Create User Table'))
  .catch((error) => console.log('Error in Create User Table:', error));
