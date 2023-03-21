import { forwardRef, useEffect, useRef } from 'react'

import style from './Menu.module.css'
import iconClose from '../../assets/images/icon-close.svg'

// wrap Menu in a forwardRef to be able to get a reference to it in another component (App)
const Menu = forwardRef(function (props, ref) {
    const menuUnderlineRef = useRef(null)

    useEffect(() => {
        window.addEventListener('resize', closeMenu)
        return () => {
            window.removeEventListener('resize', closeMenu)
        }
    })

    function closeMenu() {
        ref.current.classList.remove('open')
    }

    function handleMouseLeave(e) {
        const menuUnderline = menuUnderlineRef.current
        menuUnderline.style.width = 0
    }

    function handleMouseOver(e) {
        if (e.target.tagName === 'A') {
            const menuUnderline = menuUnderlineRef.current
            menuUnderline.style.width = e.target.offsetWidth + 'px'
            menuUnderline.style.left = e.target.offsetLeft + 'px'
            const header = e.target.closest('header')
            menuUnderline.style.top = header.offsetTop + header.offsetHeight - menuUnderline.offsetHeight + 'px'
        }
    }

    function handleCloseIconClick() {
        closeMenu()
    }

    return (
        <nav ref={ref} className={style.navMenu}>
            <div className={style.menuWrapper}>
                <img className={style.closeIcon} src={iconClose} alt="close" onClick={handleCloseIconClick} />
                <ul className={style.menu} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
                    <li><a href="/">collections</a></li>
                    <li><a href="/">men</a></li>
                    <li><a href="/">women</a></li>
                    <li><a href="/">about</a></li>
                    <li><a href="/">contact</a></li>
                </ul>
            </div>
            <div className={style.menuUnderline} ref={(menuUnderlineRef)}></div>
        </nav>
    )
})

export default Menu