import Post from '../models/post';

console.log('======Create Post Table======');

Post.sync({ force: true })
  .then(() => console.log('Success Create Post Table'))
  .catch((error) => console.log('Error in Create Post Table:', error));
