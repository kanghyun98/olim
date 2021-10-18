import Comment from '../models/comment';

console.log('======Create Comment Table======');

Comment.sync({ force: true })
  .then(() => console.log('Success Create Comment Table'))
  .catch((error) => console.log('Error in Create Comment Table:', error));
