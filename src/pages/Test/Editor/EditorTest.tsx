import React, { useEffect, useState } from "react";
import TinyMCEEditor from '@/components/RichEditor/TinyMCEEditor'
import { Box } from "@chakra-ui/react";
import Editor from "@/components/RichEditor/SlateEditor";

type Props = {}

const TipTapEditor = (props: Props) => {

    const [note_content_content, set_note_content_content] =
        useState<string>("");

    const handleContentChange = (value: string) => {
        set_note_content_content(value);
    };

    return (
        <Box width={"80%"} mx="auto" mt={3}>

            {/* <TinyMCEEditor
                initialValue={note_content_content}
                onChange={handleContentChange}
                apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
            /> */}
            <Editor />

        </Box>
    )
}

export default TipTapEditor