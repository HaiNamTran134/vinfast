import axiosClient from '../axiosClient'

const block3Api = {
    getAll: () => axiosClient.get('home/readBlock3.php'),
    create: (params) => axiosClient.post('home/createBlock3.php', params),
    getOne: (id) => axiosClient.get(`home/readBlock3.php/${id}`),
    update: (id, params) => axiosClient.put(`home/readBlock3.php/${id}`, params),
}

export default block3Api