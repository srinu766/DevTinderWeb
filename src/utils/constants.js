// export const BASE_URL = process.env.BASE_URL;

export const BASE_URL = 
location.hostname === 'localhost' ? 'http://localhost:7777' :  '/api';
