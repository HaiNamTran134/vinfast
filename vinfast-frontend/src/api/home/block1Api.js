import axiosClient from '../axiosClient'

const block1Api = {
    getAll: () => axiosClient.get('home/readBlock1.php'),
    create: (params) => axiosClient.post('home/createBlock1.php', params),
    getOne: (id) => axiosClient.get(`home/readBlock1.php/${id}`),
    update: (id, params) => axiosClient.put(`home/readBlock1.php/${id}`, params),
}

export default block1Api