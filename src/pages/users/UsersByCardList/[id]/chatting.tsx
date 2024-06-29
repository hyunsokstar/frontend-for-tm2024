import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const Chatting = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {id ? `id: ${id}의 채팅방` : '채팅방을 로드 중입니다...'}
        </div>
    );
}

export default Chatting;
