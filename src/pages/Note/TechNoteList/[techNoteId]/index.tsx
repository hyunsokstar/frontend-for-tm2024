// src/pages/Note/TechNoteList/[techNoteId]/SkilNoteList.js
// src\pages\Note\TechNoteList\[techNoteId]\index.tsx

import { useRouter } from 'next/router';

const techNotIdCheck = () => {
    const router = useRouter();
    const { techNoteId } = router.query;

    // techNoteId를 사용하여 필요한 작업 수행

    return (
        <div>
            <h1>techNotIdCheck Page</h1>
            <p>TechNoteId: {techNoteId}</p>
            {/* 나머지 컴포넌트 코드... */}
        </div>
    );
};

export default techNotIdCheck;
