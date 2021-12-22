const prod = process.env.NODE_ENV === 'production';

const backUrl = prod ? 'http://3.36.91.251' : 'http://localhost:3065';
const imageUrl = prod ? 'http://3.36.91.251' : 'http://localhost:3065/images';

export { backUrl, imageUrl };
