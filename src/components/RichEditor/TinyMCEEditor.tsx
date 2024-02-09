import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query"; // 임포트 위치 최상단

interface Props {
    initialValue?: string;
    onChange?: (content: string) => void;
    apiKey: string;
    init?: any;
}

const TinyMCEEditor: React.FC<Props> = ({
    initialValue,
    onChange,
    apiKey,
    init,
}) => {
    const handleEditorChange = (content: string) => {
        console.log('content : ', content);

        if (onChange) {
            onChange(content);
        }
    };

    return (
        <Box sx={{ height: "65vh", overflowY: 'scroll' }}>
            <Editor
                apiKey={apiKey}
                value={initialValue}
                onEditorChange={handleEditorChange}
                init={{
                    height: "100%",
                    menubar: true,
                    paste_webkit_styles: "color",
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic forecolor backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | code styleselect | help',
                    content_style: 'body { font-size: 14px; background-color: white; line-height: 1.5; }',
                    style_formats: [
                        { title: 'Inline Code', inline: 'code' },
                        { title: 'Code Block', block: 'pre', classes: 'prettyprint linenums' }
                    ],
                    images_upload_max_size: 20 * 1024 * 1024,
                    ...init,
                }}
            />
        </Box>
    );
};

export default TinyMCEEditor;
