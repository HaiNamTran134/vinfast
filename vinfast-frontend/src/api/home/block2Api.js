import axiosClient from '../axiosClient'

const block2Api = {
    getAll: () => axiosClient.get('home/readBlock2.php'),
    create: (params) => axiosClient.post('home/createBlock2.php', params),
    getOne: (id) => axiosClient.get(`home/readBlock2.php/${id}`),
    update: (id, params) => axiosClient.put(`home/readBlock2.php/${id}`, params),
}

export default block2Api