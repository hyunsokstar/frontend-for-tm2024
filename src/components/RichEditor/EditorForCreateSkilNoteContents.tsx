import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Grid, HStack, Input, InputGroup, InputLeftAddon, Text, VStack } from '@chakra-ui/react';
import TinyMCEEditor from "./TinyMCEEditor";
import { useForm, SubmitHandler } from 'react-hook-form';
import useApiForCreateSkilNoteContent from "@/hooks/useApiForCreateSkilNoteContent";
// import SrcButtonForEditor from "../Button/SrcButtonForEditor";

type Props = {
    skilNoteId: any,
    pageNum: any;
}

type FormData = {
    title: string;
    file: string;
};


// 1122
const EditorForCreateSkilNoteContents = ({ skilNoteId, pageNum }: Props) => {

    const [show, setShow] = useState(false);

    const [note_content, set_note_content] =
        useState<string>("");

    const handleContentChange = (value: string) => {
        set_note_content(value);
    };

    const handleReset = () => {
        setInputValueForFile("")
        setInputValueForTitle("")
    }


    // const { register, handleSubmit, reset } = useForm<any>();
    const { register, handleSubmit, reset, setValue: setValueInForm } = useForm<any>();

    const mutationForCreateSkilNoteContent = useApiForCreateSkilNoteContent(skilNoteId, pageNum, reset, handleReset); // 훅 사용
    const [inputValueForFile, setInputValueForFile] = useState('');
    const [inputValueForTitle, setInputValueForTitle] = useState('');

    const onSubmit = (data: FormData) => {
        console.log(data);
        console.log("note_content : ", note_content);

        const data_for_create_note_content = {
            skilNoteId,
            pageNum,
            title: inputValueForTitle,
            file: inputValueForFile,
            content: note_content
        }

        mutationForCreateSkilNoteContent.mutate(data_for_create_note_content);
        reset()
        set_note_content("")

    };

    const handleChangeForFile = (event: any) => {
        setInputValueForFile(event.target.value);
    };

    const handleChangeForTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as any;

        // Update the local state
        setInputValueForTitle(newValue);

        // Use setValue from react-hook-form to update the form state
        setValueInForm("title", newValue);
    };




    const transformFilePath1 = (filePath: string) => {
        // 정규표현식을 사용하여 필요한 부분을 추출
        const match = filePath.match(/src[\\/](.+)$/i);
        if (match) {
            // Include "src" in the transformed value
            return `src/${match[1].replace(/[\\/]/g, '/')}`;
        }
        return filePath;
    };

    const transformFilePath2 = (filePath: string) => {
        // 정규표현식을 사용하여 필요한 부분을 추출
        const match = filePath.match(/src[\\/](.+)$/i);
        if (match) {
            // Split the path using '/' or '\' and get the last part
            const pathParts = match[1].split(/[\\/]/);
            const lastPart = pathParts[pathParts.length - 1];
            // Include "src" in the transformed value
            return `${lastPart}`;
        }
        return filePath;
    };

    const handleClick = () => {
        // 'src' 버튼 클릭 시 입력값 변환 함수 적용
        const transformedValue1 = transformFilePath1(inputValueForFile);
        const transformedValue2 = transformFilePath2(inputValueForFile);

        console.log("transformedValue1 : ", transformedValue1);
        setInputValueForFile(transformedValue1)
        if (!inputValueForTitle) {
            setInputValueForTitle(transformedValue2)
        }
    };

    return (
        <>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" display={"flex"} flexDirection={"column"} gap={2} key="editorForCreateSkilNoteContents">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box p={2} border={"2px solid blue"} height={"100%"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} mb={2}>
                            <Text>
                                <Button variant={"outlined"} size={"md"} border={"1px"}>
                                    C
                                </Button>
                            </Text>
                            <Input
                                {...register("title", { onChange: (value) => value })}
                                placeholder="Title"
                                value={inputValueForTitle}
                                onChange={handleChangeForTitle}
                            />

                            {/* <Input
                                {...register("file")}
                                placeholder="file name"
                            /> */}
                            {/* hi */}
                            <InputGroup size='md'>
                                <InputLeftAddon width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'changed' : 'src'}
                                    </Button>
                                </InputLeftAddon>
                                <Input
                                    {...register("file")}
                                    pr='2.5rem'
                                    placeholder='file name'
                                    value={inputValueForFile}
                                    onChange={handleChangeForFile}
                                />
                            </InputGroup>
                        </Box>

                        <Box
                            border={"1px dotted black"}
                            height={"100%"}
                        >
                            <TinyMCEEditor
                                initialValue={note_content}
                                onChange={handleContentChange}
                                apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                            />
                        </Box>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} mt={2.5}>
                            <Button variant="outline" width="100%" type="submit">
                                Submit
                            </Button>
                            <Button variant={"outline"} width={"100%"}>Initialize</Button>
                        </Box>
                    </Box>
                </form>

            </Box>
        </>
    )
}

export default EditorForCreateSkilNoteContents