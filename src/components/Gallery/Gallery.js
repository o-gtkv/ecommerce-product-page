import { useEffect, useRef, useState } from 'react'
import { useEventHandler } from '../../hooks'

import style from './Gallery.module.css'

// returns a callback used with the 'ref' attribute to collect links to DOM elements
function refCallback(refToArray) {
    return function (currentRef) {
        if (currentRef && !refToArray.current.includes(currentRef))
            refToArray.current.push(currentRef)
    }
}

function Gallery(props) {
    const galleryRef = useRef(null)
    const imgsRef = useRef([])        // refercence to the array of DOM-elements
    const thumbnailsRef = useRef([])  // refercence to the array of DOM-elements
    const prevBtnRef = useRef(null)
    const nextBtnRef = useRef(null)
    const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(props.currentThumbnailIndex || 0)
    const [lightboxIsVisible, setLightBoxIsVisible] = useState(false)

    useEventHandler(window, 'resize', () => {
        if (lightboxIsVisible && window.matchMedia('(max-width: 768px)').matches)
            setLightBoxIsVisible(false)
    })

    useEffect(() => {
        // when the gallery is rendered as a lightbox, adjust the styles
        if (props.lightbox) {
            galleryRef.current.style.margin = 'auto auto' // place in the center (scrolling does not work with justify-content: center)
            imgsRef.current[currentThumbnailIndex].style.cursor = 'initial'
            imgsRef.current[currentThumbnailIndex].style.width = '550px'
            prevBtnRef.current.style.display = 'inline'
            nextBtnRef.current.style.display = 'inline'
            prevBtnRef.current.style.left = -prevBtnRef.current.offsetWidth / 2 + 'px'
            nextBtnRef.current.style.right = -prevBtnRef.current.offsetWidth / 2 + 'px'
        }
    })

    function selectThumbnail(targetThumbnail) {
        const thumbnails = thumbnailsRef.current
        const selectedThumbnailIndex = thumbnails.findIndex(thumbnail => thumbnail === targetThumbnail)
        setCurrentThumbnailIndex(selectedThumbnailIndex)
    }

    function handleImgClick() {
        // allow lightbox to run only when the gallery is not lightbox...
        // ...itself and the browser's viewport width is greater than 768px
        if (!props.lightbox && window.matchMedia('(min-width: 769px)').matches)
            setLightBoxIsVisible(true)
    }

    function handleThumbnailClick(e) {
        selectThumbnail(e.target)
    }

    function handleThumbnailKeyDown(e) {
        if (e.code === 'Enter')
            selectThumbnail(e.target)
    }

    function handlePrevBtnClick() {
        const thumbnails = thumbnailsRef.current
        if (currentThumbnailIndex > 0)
            setCurrentThumbnailIndex(index => index - 1)
        else
            setCurrentThumbnailIndex(thumbnails.length - 1)
    }

    function handleNextBtnClick() {
        const thumbnails = thumbnailsRef.current
        if (currentThumbnailIndex < thumbnails.length - 1)
            setCurrentThumbnailIndex(index => index + 1)
        else
            setCurrentThumbnailIndex(0)

    }

    function handleLightboxCloseBtnClick() {
        props.onCloseBtnClick()
    }

    return (
        <div ref={galleryRef} className={style.productGallery}>
            {
                // add close button in lightbox mode
                props.lightbox ?
                    <div className={style.lightBoxCloseBtnWrapper}>
                        <button className={style.lightBoxCloseBtn} onClick={handleLightboxCloseBtnClick}>
                            <svg width="14" height="15">
                                <path className={style.lightBoxCloseBtnIcon} d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fillRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    :
                    null
            }
            <div className={style.imgWrapper}>
                {
                    props.images.thumbnail.map((el, idx) => (
                        <img
                            key={idx}
                            ref={refCallback(imgsRef)}
                            className={`${style.img} ${idx === currentThumbnailIndex ? style.selected : ""}`}
                            src={props.images.large[idx]}
                            alt=""
                            onClick={handleImgClick}
                        />
                    ))
                }
                <button ref={prevBtnRef} className={`${style.slideBtn} ${style.prevSlideBtn}`} onClick={handlePrevBtnClick}>
                    <svg width="12" height="18">
                        <path className={style.slideBtnIcon} d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd" />
                    </svg>
                </button>
                <button ref={nextBtnRef} className={`${style.slideBtn} ${style.nextSlideBtn}`} onClick={handleNextBtnClick}>
                    <svg width="12" height="18">
                        <path className={style.slideBtnIcon} d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div>
                <ul className={style.thumbnails}>
                    {
                        props.images.thumbnail.map((el, idx) => (
                            <li key={idx}>
                                <div className={`${style.thumbnailWrapper} ${idx === currentThumbnailIndex ? style.selected : ""}`}>
                                    <img
                                        ref={refCallback(thumbnailsRef)}
                                        className={`${style.thumbnail} ${idx === currentThumbnailIndex ? style.selected : ""}`}
                                        src={el}
                                        alt=""
                                        onClick={handleThumbnailClick}
                                        onKeyDown={handleThumbnailKeyDown}
                                        tabIndex={0} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                // show lightbox
                lightboxIsVisible ?
                    <div className={style.lightbox}>
                        <Gallery
                            lightbox
                            images={props.images}
                            currentThumbnailIndex={currentThumbnailIndex}
                            onCloseBtnClick={() => setLightBoxIsVisible(false)}
                        />
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Gallery