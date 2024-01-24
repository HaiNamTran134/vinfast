import React from 'react'
import VinBikeBanner from '../../user/vinfast-bike-banner/VinBikeBanner'
import SalesPower from '../../user/sales-power/SalesPower'
import PolicyPower from '../../user/policy-power/PolicyPower'
import FourEasy from '../../user/four-easy/FourEasy'
import { TabTitle } from '../../../assets/setTitle'

const Bike = () => {
    TabTitle("Xe máy điện VinFast - Bảng giá mới nhất & chương trình ưu đãi")
    return (
        <div>
            <VinBikeBanner />
            <SalesPower />
            <PolicyPower />
            <FourEasy />
        </div>
    )
}

export default Bike
