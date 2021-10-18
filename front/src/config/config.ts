const prod = process.env.NODE_ENV === 'production';

export const backUrl = prod ? 'https://olim.com' : 'http://localhost:3065';
