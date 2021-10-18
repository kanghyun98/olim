import Image from '../models/image';

console.log('======Create Image Table======');

Image.sync({ force: true })
  .then(() => console.log('Success Create Image Table'))
  .catch((error) => console.log('Error in Create Image Table:', error));
