import React from 'react'
import { TabTitle } from '../../../assets/setTitle'

import VinCarBanner from '../../user/vinfast-car-banner/VinCarBanner'
import VinCarDeposit from '../../user/vinfast-car-deposit/VinCarDeposit'
const Car = () => {
    TabTitle("Đặt Cọc Mua Xe Ô Tô VinFast")
    return (
        <>
            <div className='page__deposit'>
                <VinCarBanner />
                <VinCarDeposit  />
            </div>
        </>
    )
}

export default Car
