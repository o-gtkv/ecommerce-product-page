import { forwardRef } from 'react'
import { useEventHandler } from '../../hooks'

import style from './Menu.module.css'
import iconClose from '../../assets/images/icon-close.svg'

// wrap Menu in a forwardRef to be able to get a reference to it in another component (App)
const Menu = forwardRef(function (props, ref) {
    useEventHandler(window, 'resize', closeMenu)

    function closeMenu() {
        ref.current.classList.remove('open')
    }

    function handleCloseIconClick() {
        closeMenu()
    }

    return (
        <nav ref={ref} className={style.navMenu}>
            <div className={style.menuWrapper}>
                <button className={style.closeBtn} onClick={handleCloseIconClick}>
                    <img className={style.closeIcon} src={iconClose} alt="close" />
                </button>
                <ul className={style.menu}>
                    <li className={style.item}><a href="/">collections</a></li>
                    <li className={style.item}><a href="/">men</a></li>
                    <li className={style.item}><a href="/">women</a></li>
                    <li className={style.item}><a href="/">about</a></li>
                    <li className={style.item}><a href="/">contact</a></li>
                </ul>
            </div>
        </nav>
    )
})

export default Menu