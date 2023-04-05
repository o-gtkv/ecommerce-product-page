import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useEventHandler } from './hooks'
import Menu from './components/Menu/Menu'
import Cart from './components/Cart/Cart'
import ProductPage from './pages/ProductPage'
import { cartContentSelector } from './store/cart'

import style from './App.module.css'
import imgLogo from './assets/images/logo.svg'
import imgAvatar from './assets/images/image-avatar.png'
import iconCart from './assets/images/icon-cart.svg'
import iconMenu from './assets/images/icon-menu.svg'

function productCount(cartContent) {
    return cartContent.reduce((total, product) => total + product.count, 0)
}

function App() {
    const headerRef = useRef(null)                             // coordinates of these two elements are...
    const cartIconWrapperRef = useRef(null)                    // ...needed to position the cart    
    const menuRef = useRef(null)
    const cartContent = useSelector(cartContentSelector)       // get data from the store
    const [isCartOpen, setIsCartOpen] = useState(false)

    useEventHandler(document, 'keydown', (e) => {
        if (e.code === 'Escape' && isCartOpen)
            setIsCartOpen(false)
    })

    useEventHandler(document, 'click', (e) => {
        if (isCartOpen)
            setIsCartOpen(false)
    })

    useEventHandler(window, 'resize', (e) => {
        if (isCartOpen)
            setIsCartOpen(false)
    })

    function handleCartIconClick(e) {
        setIsCartOpen(!isCartOpen)
        e.stopPropagation()                                    // because of useEventHandler(document, 'click', (e) => { ... })
    }

    function handleMenuBtnClick() {
        menuRef.current.classList.add('open')                  // open mobile menu
    }

    return (
        <div className={style.container}>
            <header ref={headerRef} className={style.header}>
                <button className={style.menuBtn} onClick={handleMenuBtnClick}>
                    <img src={iconMenu} alt="menu" />
                </button>
                <a href="/">
                    <img src={imgLogo} alt="home page" />
                </a>
                <Menu ref={menuRef} />
                <div ref={cartIconWrapperRef} className={style.cartIconWrapper}>
                    {
                        cartContent.length ?
                            <div className={style.cartProductCount}>{productCount(cartContent)}</div> : null
                    }
                    <button className={style.cartIcon} onClick={handleCartIconClick}>
                        <img src={iconCart} alt="cart" />
                    </button>
                </div>
                <button className={style.avatarBtn}>
                    <img className={style.avatarImg} src={imgAvatar} alt="avatar" />
                </button>
                {
                    isCartOpen ?
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

export default App
