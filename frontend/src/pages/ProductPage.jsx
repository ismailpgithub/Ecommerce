import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CartData } from '@/context/CartContext';
import { ProductData } from '@/context/ProductContext'
import { UserData } from '@/context/userContext';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductPage = () => {

  const {fetchProduct, product, relatedProduct, loading} = ProductData();
  const {addToCart} = CartData()

  const {id} = useParams()

  const {isAuth} = UserData()

  useEffect(()=>{
      fetchProduct(id);
  },[id])

  const addToCartHandler = ()=>{
    addToCart(id)
  }

  const [show, setShow] = useState(false)
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState('')


  return (
    <div>
      {
        loading ? (
          <Loading/> 
        ): (
          <div>
            {product && (
              <div className='flex flex-col lg:flex-row items-start gap-14'>
                <div className="w-[290px] md:w-[430px] mx-auto"> 
                  <Carousel className="w-full relative">
                    <CarouselContent>
                      {product.images?.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <img
                              src={image.url}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-10 opacity-100" />
                    <CarouselNext className="-right-10 opacity-100" />
                  </Carousel>
                </div>
                <div className='w-full lg:w-1/2 space-y-4'>
                    <h1 className='text-2xl font-bold'>{product.title}</h1>
                    <p className='text-lg'>{product.description}</p>
                    <p className='text-xl font-semibold'>₹{product.price}</p>
                    {
                      isAuth ? (
                        <>
                          {
                          product.stock <=0 ? 
                            (<p className='text-red-600 text-2xl'>Out of Stock</p>) : (
                              <Button onClick={addToCartHandler}>Add To Cart</Button>
                            )
                          }
                        </>
                      ) : (
                        <p className='text-blue-50'>Please Login to add something in cart</p>
                      )
                    }
                </div>                
              </div>
            )}
          </div>
        )}

        {
          relatedProduct?.length > 0 && <div className='mt-12'>
            <h2 className='text-xl font-bold'>Related Products</h2>
            <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {
                relatedProduct.map((e)=>(
                  <ProductCard key={e._id} product={e}/>
                ))}
            </div>
          </div>
        }
    </div>
  )
}

export default ProductPage