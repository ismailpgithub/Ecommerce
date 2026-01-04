import { CartData } from '@/context/CartContext'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { server } from '@/main'
import axios from 'axios'
import Loading from '@/components/Loading'
import { Separator } from '@/components/ui/separator'

const Payment = () => {

    const {cart, subTotal, fetchCart} = CartData()
    const [address, setAddress] = useState('')
    const [method, setMethod] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {id} = useParams()

    async function fetchAddress() {
        try {
            const {data} = await axios.get(`${server}/api/address/${id}`, {
                headers: {
                    token: Cookies.get("token")
                }
            })
            setAddress(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchAddress()
    }, [id])

  return (
    <div>
        {
            loading ? <Loading/> : 
            <div className='Container mx-auto px-4 py-8'>
                <div className='space-y-8'>
                    <h2 className='text-3xl font-bold text-center'>Proceed to Payment</h2>

                    <div>
                        <h3 className='text-xl font-semibold'>Products</h3>
                        <Separator className='my-2'/>
                        <div className='space-y-8'>
                            {
                                cart && cart.map((e, i)=>(
                                    <div key={i} className='flex flex-col md:flex-row items-center justify-between bg-card p-4 rounded-lg shadow border dark:border-gray-700'>
                                        <img src={e.product.images[0].url} alt="xyz" className='w-16 h-16 object-cover rounded mb-4 md:mb-0' />

                                        <div className='flex-1 md:ml-4 text-center md:text-left'>
                                            <h2 className='text-lg font-medium'>{e.product.title}</h2>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Payment