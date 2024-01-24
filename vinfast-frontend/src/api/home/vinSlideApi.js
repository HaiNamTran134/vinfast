import axiosClient from '../axiosClient'

const vinSlideApi = {
    getAll: () => axiosClient.get('home/readBanner.php'),
    create: (params) => axiosClient.post('home/createBanner.php', params),
    getOne: (id) => axiosClient.get(`home/readBanner.php/${id}`),
    update: (id, params) => axiosClient.put(`home/readBanner.php/${id}`, params),
}

export default vinSlideApi