import React from 'react'
import { Center, Image, Stack } from 'native-base'

const Logo = () => {

    const src = require('../../assets/Images/Logo/logo.png')

    return (
        <Center w="100%">
            <Image source={src} alt='' resizeMode='contain' style={{width: 120, height: 180}}/>
        </Center>
    )
}

export default Logo