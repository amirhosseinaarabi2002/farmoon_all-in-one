import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config/config';
export const deletePlatesApi = async (id) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  const response = await axios.delete(`https://www.penalty.vsrv.ir/api/plates/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-api-key': config.X_API_KEY,
    },
  });

  return response.data;
};