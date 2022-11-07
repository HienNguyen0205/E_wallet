import React from 'react'
import { Modal ,HStack, Spinner, Heading } from 'native-base'
import { useSelector } from 'react-redux'

const Loading = () => {

    const loadingState = useSelector(state => state.loading.value)

    return (
        <Modal isOpen={loadingState} size='full' _backdrop={{bg: '#272a3f'}} bg='#272a3f'>
            <HStack space={2} justifyContent="center" alignItems='center'>
                <Spinner accessibilityLabel="Loading" size='lg'/>
                <Heading color="primary.500" fontSize="2xl">
                    Loading
                </Heading>
            </HStack>
        </Modal>
    )
}

export default Loading