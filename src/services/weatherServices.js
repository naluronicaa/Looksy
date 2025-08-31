import axios from 'axios';

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get('https://api.hgbrasil.com/weather', {
      params: {
        key: 'b4ea1b65',
        lat,
        lon,
        user_ip: 'remote',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('ERRO AO CHAMAR A API DO CLIMA');
    if (error.response) {
      console.log('response.data:', error.response.data);
      console.log('response.status:', error.response.status);
    } else if (error.request) {
      console.log('request:', error.request);
    } else {
      console.log('message:', error.message);
    }
    throw new Error('Erro ao buscar clima');
  }
};
