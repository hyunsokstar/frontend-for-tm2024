// src/pages/global-chat-rooms/[id]/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import useApiForGetGlobalChatRoomById from '@/hooks/useApiForGetGlobalChatRoomById'; // useApiForGetGlobalChatRoomById custom hook import

const ChatRoomPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // 동적 매개변수(ID) 가져오기

    const { data, isLoading, isError } = useApiForGetGlobalChatRoomById(id as string); // id는 항상 문자열이라고 가정

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error fetching chat room!</div>;
    }

    return (
        <div>
            <h1>{data.title}</h1>
            <p>Owner: {data.owner.email}</p>
            {/* 기타 필요한 정보 렌더링 */}
        </div>
    );
};

export default ChatRoomPage;
