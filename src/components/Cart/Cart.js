import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, cartContentSelector } from '../../store/cart'

import style from './Cart.module.css'
import iconDelete from '../../assets/images/icon-delete.svg'

function Cart(props) {
    const cartRef = useRef(null)
    const dispatch = useDispatch()
    const cartContent = useSelector(cartContentSelector) // get data from the store    

    useEffect(() => {
        const cart = cartRef.current
        if (window.matchMedia('(max-width: 768px)').matches) {
            cart.style.top = props.top + 10 + 'px'
            return
        }
        cart.style.top = props.top + 'px'
        let left = props.left - cart.offsetWidth / 2

        // if the right edge of the cart is outside the browser window
        if (left + cart.offsetWidth > window.innerWidth) {
            left = props.left - cart.offsetWidth
        }
        cart.style.left = left + 'px'
    })

    function handleDeleteProductClick(e) {
        const id = Number(e.currentTarget.dataset.productid)
        // delete product from the store (and accordingly from the cart)
        // deleteProduct - 'action creator' in redux terminology
        dispatch(deleteProduct(id))
    }

    function handleCartClick(e) {
        e.stopPropagation() // to prevent a click event on the 'document' that closes the cart
    }

    return (
        <div ref={cartRef} className={style.cart} onClick={handleCartClick}>
            <div className={style.titleWrapper}>
                <span className={style.title}>cart</span>
            </div>
            {
                cartContent.length > 0 ?
                    <div className={style.content}>
                        <ul className={style.productList}>
                            {
                                cartContent.map(product => {
                                    return (
                                        <li key={product.id}>
                                            <img className={style.productImage} src={product.image} alt="product" />
                                            <ul className={style.productInfoList}>
                                                <li>{product.name}</li>
                                                <li>
                                                    {product.price.toFixed(2)} × {product.count} <strong>${(product.price * product.count).toFixed(2)}</strong>
                                                </li>
                                            </ul>
                                            <button className={style.deleteIcon} data-productid={product.id} onClick={handleDeleteProductClick}>
                                                <img src={iconDelete} alt="delete" />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <a href="/" className={style.checkoutBtn}>checkout</a>
                    </div>
                    :
                    <div className={style.emptyCart}>Your cart is empty</div>
            }
        </div>

    )
}

export default Cart