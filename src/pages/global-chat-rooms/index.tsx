// src\pages\global-chat-rooms\index.tsx
import GlobalChatRoomsList from '@/components/GlobalChatRoomsList'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const GlobalChatRoom = (props: Props) => {
    return (
        <Box>
            {/* <div>GlobalChatRoom</div> */}
            <GlobalChatRoomsList />
        </Box>
    )
}

export default GlobalChatRoom
// src\pages\GlobalChatRoom.tsx