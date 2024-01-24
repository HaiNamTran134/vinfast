import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ProductView from '../../user/product-view/ProductView'
import productClientApi from '../../../api/user/productApi'

const Product = props => {

    let params = useParams();

    const [productData, setProductData] = useState([])

    const getProductBySlug = (slug) => productData.find(e => e.slug === slug)
    const product = getProductBySlug(params.slug)

    const [president2, setPresident2] = useState([])

    useEffect(() => {
        const getCarBlock3 = async () => {
            try {
                const res = await productClientApi.getCarBlock3(params.slug)
                setPresident2(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getCarBlock3()
    }, [params.slug])

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await productClientApi.getAll()
                setProductData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAllProduct() 
                    
    }, [])
    return (
        <div>
            <ProductView product={product} president2 = {president2}/>
        </div>
    )
}

export default Product
