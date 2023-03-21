import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/cart'
import Gallery from '../components/Gallery/Gallery'

import style from './ProductPage.module.css'

const product = {
    id: 1,
    image: {
        large: [
            '/images/image-product-1.jpg',
            '/images/image-product-2.jpg',
            '/images/image-product-3.jpg',
            '/images/image-product-4.jpg'
        ],
        thumbnail: [
            '/images/image-product-1-thumbnail.jpg',
            '/images/image-product-2-thumbnail.jpg',
            '/images/image-product-3-thumbnail.jpg',
            '/images/image-product-4-thumbnail.jpg'
        ]
    },
    brand: 'sneaker company',
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    discount: 50,
    description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.'
}

function ProductPage() {
    const [productCount, setProductCount] = useState(1)
    const dispatch = useDispatch()

    function handleAddToCartBtnClick() {
        // send data to the store (and accordingly to the cart)
        // addProduct - 'action creator' in redux terminology
        dispatch(addProduct({
            id: product.id,
            image: product.image.thumbnail[0],
            name: product.name,
            price: product.price,
            count: productCount
        }))
    }

    return (
        <div className={style.productPage}>
            <Gallery images={product.image} />
            <div className={style.productInfo}>
                <h1 className={style.productBrand}>{product.brand}</h1>
                <h2 className={style.productName}>{product.name}</h2>
                <p className={style.productDesc}>{product.description}</p>
                <div className={style.priceBlock}>
                    <div className={style.subBlock}>
                        <span className={style.price}>${product.price.toFixed(2)}</span>
                        {
                            product.discount !== undefined ?
                                <span className={style.discount}>{product.discount}%</span>
                                :
                                null
                        }
                    </div>
                    {
                        product.discount !== undefined ?
                            <div className={style.priceWithoutDiscount}>${(product.price / product.discount * 100).toFixed(2)}</div>
                            :
                            null
                    }
                </div>
                <div className={style.productAddToCartBlock}>
                    <div className={style.productCountSelector}>
                        <button
                            className={style.productCountSelectorBtnMinus}
                            disabled={productCount === 1}
                            onClick={() => setProductCount(prveCount => prveCount - 1)}>
                            <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                                <path className={style.iconCount} d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a" fill="#FF7E1B" fillRule="nonzero" />
                            </svg>
                        </button>
                        <input
                            className={style.productCountSelectorCount}
                            type="text"
                            value={productCount}
                            readOnly={true}
                        />
                        <button
                            className={style.productCountSelectorBtnPlus}
                            onClick={() => setProductCount(prveCount => prveCount + 1)}>
                            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                                <path className={style.iconCount} d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b" fill="#FF7E1B" fillRule="nonzero" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button className={style.addToCartBtn} onClick={handleAddToCartBtnClick}>
                            <svg className={style.cartIcon} width="22" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#ffffff" fillRule="nonzero" />
                            </svg>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage