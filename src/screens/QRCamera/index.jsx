import React, { useState, useEffect } from "react"
import { StyleSheet } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'

const QRCamera = () => {

    const [hasPermission, setHasPermission] = useState(false)
    const devices = useCameraDevices()
    const device = devices.back

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    })

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })()
    }, [])

    return (
        device != null && hasPermission && <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
        />
    )
}

export default QRCamera