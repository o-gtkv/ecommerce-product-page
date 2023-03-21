import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Menu from '../Menu/Menu'
import Cart from '../Cart/Cart'
import ProductPage from '../../pages/ProductPage'
import { cartContentSelector } from '../../store/cart'

import style from './App.module.css'
import imgLogo from '../../assets/images/logo.svg'
import imgAvatar from '../../assets/images/image-avatar.png'
import iconCart from '../../assets/images/icon-cart.svg'
import iconMenu from '../../assets/images/icon-menu.svg'

function App() {
    const headerRef = useRef(null)                             // coordinates of these two elements are...
    const cartIconWrapperRef = useRef(null)                    // ...needed to position the cart    
    const menuRef = useRef(null)
    const [cartIsVisible, setCartIsVisible] = useState(false)
    const cartContent = useSelector(cartContentSelector)       // get data from the store

    function handleCartIconClick(e) {
        setCartIsVisible(!cartIsVisible) // toggle cart visibility
        e.stopPropagation()              // because of document.addEventListener('click', handleDocumentClick) in useEffect
    }

    function handleMenuIconClick() {
        menuRef.current.classList.add('open') // open mobile menu
    }

    useEffect(() => {
        function handleDocumentKeyDown(e) {
            if (e.code === 'Escape' && cartIsVisible)
                setCartIsVisible(false)
        }

        function handleDocumentClick(e) {
            if (cartIsVisible)
                setCartIsVisible(false)
        }

        function handleWindowResize() {
            if (cartIsVisible)
                setCartIsVisible(false)
        }

        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('click', handleDocumentClick)
        document.addEventListener('keydown', handleDocumentKeyDown)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
            document.removeEventListener('click', handleDocumentClick)
            document.removeEventListener('keydown', handleDocumentKeyDown)
        }
    })

    return (
        <div className={style.container}>
            <header ref={headerRef} className={style.header}>
                <img className={style.menuIcon} src={iconMenu} alt="menu" onClick={handleMenuIconClick} />
                <img src={imgLogo} alt="logo" />
                <Menu ref={menuRef} />
                <div className={style.userBar}>
                    <div ref={cartIconWrapperRef} className={style.cartIconWrapper}>
                        {
                            cartContent.length > 0 ?
                                <div className={style.cartProductCount}>
                                    {
                                        // total product count (if there is more than one product)
                                        cartContent.reduce((total, product) => total + product.count, 0)
                                    }
                                </div>
                                :
                                null
                        }
                        <button className={style.cartIcon} onClick={handleCartIconClick}>
                            <img src={iconCart} alt="cart" />
                        </button>
                    </div>
                    <img tabIndex={0} className={style.avatarImage} src={imgAvatar} alt="avatar" />
                </div>
                {
                    cartIsVisible ?
                        <Cart
                            top={headerRef.current.offsetTop + headerRef.current.offsetHeight}
                            left={cartIconWrapperRef.current.offsetLeft + cartIconWrapperRef.current.offsetWidth}
                        />
                        :
                        null
                }
            </header>
            <main>
                <ProductPage />
            </main>
        </div >
    );
}

export default App;
