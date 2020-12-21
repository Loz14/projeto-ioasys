import React, { useState } from 'react'
import './style.css'
//import das logos
const small = require('./../../assets/logo-home.png')
const medium = require('./../../assets/logo-home@2x.png')
const large = require('./../../assets/logo-home@3x.png')

const smallNav = require('./../../assets/logo-nav.png')
const mediumNav = require('./../../assets/logo-nav@2x.png')
const largeNav = require('./../../assets/logo-nav@3x.png')


//Classe implementada para deixar imagem responsiva
const ResponsiveImage = props => {
    const {type} = props
    const [currentSrc, setCurrentSrc] = useState('')

    const onLoad = (event) => {
        setCurrentSrc(event.target.currentSrc);
    }

    let smallImg
    let mediumImg
    let largeImg
    //faz a verificação do tipo de logo que será renderizada e atribuí a correta
    if (type === 'nav') {
        smallImg = smallNav
        mediumImg = mediumNav
        largeImg = largeNav
    } else {
        smallImg = small
        mediumImg = medium
        largeImg = large
    }

    return (
        <img src={smallImg} srcSet={`${smallImg} 300w, ${mediumImg} 768w, ${largeImg} 1280w`} alt="" className="logo-home" onLoad={onLoad} />
    );
}

export default ResponsiveImage;