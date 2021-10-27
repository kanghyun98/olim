const prod = process.env.NODE_ENV === 'production';

const backUrl = prod ? 'https://olim.com' : 'http://localhost:3065';
const imageUrl = 'http://localhost:3065/images';

export { backUrl, imageUrl };
