import axios from 'axios';
import { config }  from './config.js';

const creds = {
  surname: config.roadtestcreds.surname,
  licensenumber: config.roadtestcreds.licensenumber,
  keyword: config.roadtestcreds.keyword,
};

export const login = async() => {
  try {
    const response = await axios.put('https://onlinebusiness.icbc.com/deas-api/v1/webLogin/webLogin', 
    {
      drvrLastName: creds.surname,
      licenceNumber: creds.licensenumber,
      keyword: creds.keyword
    }, 
    {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'cache-control': 'no-cache, no-store',
        'content-type': 'application/json',
        'expires': '0',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' ,
        'pragma': 'no-cache',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'Referer': 'https://onlinebusiness.icbc.com/webdeas-ui/login;type=driver',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });

    //console.log('Response headers:', response.headers);
    return response;
    // You can also write this data to a file or use it as needed

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
}


export const getNearbyOffices = async(authToken) => {
    try {
      const response = await axios.put('https://onlinebusiness.icbc.com/deas-api/v1/web/getNearestPos', 
      {
        lng:'-123.1630556',
        lat: '49.1630556',
        examType: '5-R-1',
        startDate: '2024-07-28'
      }, 
      {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'authorization':`${authToken}`,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' ,
          'pragma': 'no-cache',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'Referer': 'https://onlinebusiness.icbc.com/webdeas-ui/booking',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      });
  
      //console.log('Response headers:', response.headers);
      return response;
      // You can also write this data to a file or use it as needed
  
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  }
  
  export const getAppointmentsByID = async(authToken, posId) => {
    try {
      const response = await axios.post('https://onlinebusiness.icbc.com/deas-api/v1/web/getAvailableAppointments', 
      {
        aPosID:`${posId}`,
        examType: '5-R-1',
        examDate: '2024-07-28',
        ignoreReserveTime :false,
        prfDaysOfWeek: '[0,1,2,3,4,5,6]',
        prfPartsOfDay: '[0,1]',
        lastName: config.roadtestcreds.surname,
        licenseNumber: config.roadtestcreds.licensenumber

      }, 
      {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'cache-control': 'no-cache, no-store',
          'content-type': 'application/json',
          'authorization':`${authToken}`,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' ,
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'Referer': 'https://onlinebusiness.icbc.com/webdeas-ui/booking',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      });
  
      //console.log('Response headers:', response.headers);
      return response;
      // You can also write this data to a file or use it as needed
  
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  }
  
