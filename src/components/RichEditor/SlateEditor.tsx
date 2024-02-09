import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

type CustomElement = {
    type: 'paragraph' | 'image'; // 이미지 타입 추가
    children: Descendant[];
    url?: string; // 이미지 URL 추가
};

const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [{ text: 'This is editable plain text, just like a <textarea>!' }],
    },
    // {
    //     type: 'image',
    //     children: [{ text: '' }],
    //     url: 'https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg',
    // },
];

const ImageElement = ({ attributes, element, children }: { attributes: any; element: CustomElement; children: React.ReactNode }) => {
    return (
        <div {...attributes}>
            <img
                src={element.url}
                alt="Inserted Image"
                style={{ display: 'block', maxWidth: '100%', maxHeight: '20em' }}
            />
            {children}
        </div>
    );
};

const DefaultElement = ({ attributes, children }: { attributes: any; children: React.ReactNode }) => {
    return <p {...attributes}>{children}</p>;
};

const Editor = () => {
    const [value, setValue] = useState<CustomElement[]>(initialValue);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const renderElement = useCallback((props: any) => {
        switch (props.element.type) {
            case 'image':
                return <ImageElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, editor: ReactEditor) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // 파일을 업로드하고 URL을 얻는 등의 로직 수행 후
        // imageUrl을 얻었다고 가정하고 insertImage 함수 호출
        const imageUrl = 'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder-375x375.png';
        if (imageUrl) {
            insertImage(editor, imageUrl);
        }
    };

    const insertImage = (editor: ReactEditor, url: string) => {
        const image: CustomElement = { type: 'image', children: [{ text: '' }], url };
        editor.insertNode(image); // insertNode 함수 사용
    };

    return (
        <Slate
            editor={editor}
            initialValue={value} // initialValue 대신 value prop 사용
            onChange={(newValue: Descendant[]) => {
                setValue(newValue as CustomElement[]);
                console.log('newValue', newValue);
            }}
        >
            <div
                style={{ border: '1px solid #ccc', padding: '8px' }} // 테두리 스타일 적용
                onDrop={(event) => handleDrop(event, editor)}
                onDragOver={(event) => event.preventDefault()}
            >
                <Editable
                    renderElement={renderElement}
                    placeholder="Enter some plain text..."
                    style={{ backgroundColor: "skyblue" }}
                />
            </div>
        </Slate>
    );
};

export default Editor;
