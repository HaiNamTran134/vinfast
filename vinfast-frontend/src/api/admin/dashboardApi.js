import axiosClient from '../axiosClient'

const dashboardApi = {
    getCustomerAll: (from, to) => axiosClient.get(`admin/fromDayToDay.php?from=${from}&to=${to}`),
    getAccountAll: (from, to) => axiosClient.get(`admin/fromDayToDayAccount.php?from=${from}&to=${to}`),
}

export default dashboardApi