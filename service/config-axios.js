import axios from 'axios';

const axiosInstance = axios.create({
    baseURLurl: 'https://uk.api.just-eat.io/'
})

export default axiosInstance;