import Hashtag from '../models/hashtag';

console.log('======Create Hashtag Table======');

Hashtag.sync({ force: true })
  .then(() => console.log('Success Create Hashtag Table'))
  .catch((error) => console.log('Error in Create Hashtag Table:', error));
