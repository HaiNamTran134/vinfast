import axiosClient from '../axiosClient'

const block4Api = {
    getAll: () => axiosClient.get('home/readBlock4.php'),
    create: (params) => axiosClient.post('home/createBlock4.php', params),
    getOne: (id) => axiosClient.get(`home/readBlock4.php/${id}`),
    update: (id, params) => axiosClient.put(`home/readBlock4.php/${id}`, params),
}

export default block4Api