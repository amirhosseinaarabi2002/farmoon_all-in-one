import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config';
const getPlatesApi = async () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  const response = await axios.get('https://www.penalty.vsrv.ir/api/plates', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-api-key': config.X_API_KEY,
    },
  });

  return response.data;
};

export const getCarPlates = async () => {
  try {
    const data = await getPlatesApi();
    const platesList = [];
    const platesListInstance = data.plates;

    for (const element of platesListInstance) {
      const plate = Plate.fromjson(element);
      if (plate.type === 2) {
        platesList.push(plate);
        
      }
    }

    console.log(platesList)
    return platesList;
  } catch (error) {
    throw error;
  }
};

class Plate {
  constructor(json) {
    this.id = json.id;
    this.userId = json.user_id;
    this.plateInfo = json.type === 1 ? new CarPlateInfo(json.plate) : new MotorPlateInfo(json.plate);
    this.mobileNumber = json.mobile_number;
    this.nationalCode = json.national_code;
    this.lastInquriy = json.last_inquiry;
    this.type = json.type;
  }

  static fromjson(json) {
    return new Plate(json);
  }
}

class CarPlateInfo {
  constructor(json) {
    this.digit2 = json['2digit'];
    this.alphabet = json.alphabet;
    this.digit3 = json['3digit'];
    this.iranNum = json.iran;
  }
}

class MotorPlateInfo {
  constructor(json) {
    this.digit3 = json['3digit'];
    this.digit5 = json['5digit'];
  }
}
