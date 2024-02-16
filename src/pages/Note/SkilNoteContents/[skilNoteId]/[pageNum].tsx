import CardForSkilNoteContent from '@/components/Card/CardForSkilNoteContent';
import NavigatorForScrollContents from '@/components/Navigator/NavigatorForScrollContents';
import EditorForCreateSkilNoteContents from '@/components/RichEditor/EditorForCreateSkilNoteContents';
import TabMenuForSkilNoteContents from '@/components/TabMenus/TabMenuForSkilNoteContents';
import useApiForDeleteSkilNoteContentsForCheckedIds from '@/hooks/useApiForDeleteSkilNoteContentsForCheckedIds';
import useApiForGetSkilNoteContentsForSkilNoteId from '@/hooks/useApiForGetSkilNoteContentsForSkilNoteId';
import { Box, Button, Grid, HStack, Input, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

type Item = {
    id: string;
    order: string;
};

// 1122
const SkilNoteContents = () => {
    const router = useRouter();
    const { skilNoteId, pageNum } = router.query;
    const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const [orderInfos, setOrderInfos] = useState<Item[]>();
    const [checkedRows, setCheckedRows] = useState<number[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data: dataForskilNoteContent } = useApiForGetSkilNoteContentsForSkilNoteId(skilNoteId, pageNum);

    // console.log("dataForskilNoteContent : ", dataForskilNoteContent);

    const handlerForEditModeClick = () => {
        setIsEditMode(prevEditMode => !prevEditMode);
        console.log("handlerForEditModeClick");
    }

    const deleteForSkilNoteContentsForCheckedIdsMutation = useApiForDeleteSkilNoteContentsForCheckedIds(skilNoteId, pageNum);

    const scrollToCard = (order: number) => {
        const selectedCard = cardRefs.current[order];
        if (selectedCard) {
            // smooth scroll
            // selectedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // smooth scroll 끝난 후 정확한 위치로 추가 스크롤
            // selectedCard.scrollIntoView({ behavior: 'instant', block: 'start' });

            selectedCard.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                selectedCard.scrollIntoView({ behavior: 'instant', block: 'start' });
            }, 500); // 애니메이션 시간 고려

        }
    };

    const editorRef = useRef<HTMLDivElement | null>(null); // 참조 추가

    const handleBeforeClick = () => {
        const currentUrl = window.location.href;
        console.log('currentUrl : ', currentUrl);

        // 정규식을 사용하여 URL에서 마지막 숫자를 추출
        const regex = /\/(\d+)$/; // URL에서 맨 뒤의 연속된 숫자를 찾기 위한 정규식
        const match = currentUrl.match(regex);

        if (match) {
            const lastNumber = parseInt(match[1]); // 맨 뒤의 숫자 추출
            const newLastNumber = lastNumber - 1; // 변경할 숫자 계산

            if (newLastNumber === 0) {
                alert("1 페이지 보다 커야 합니다")
                return
            }

            const newUrl = currentUrl.replace(regex, `/${newLastNumber}`); // 새로운 URL 생성
            console.log('새로운 URL : ', newUrl);
            router.push(newUrl); // 새로운 URL로 페이지 이동

        } else {
            console.log('URL에서 변경할 숫자를 찾을 수 없습니다.');
        }

    };



    const handleNextClick = () => {
        const currentUrl = window.location.href;
        console.log('currentUrl : ', currentUrl);

        // 정규식을 사용하여 URL에서 마지막 숫자를 추출
        const regex = /\/(\d+)$/; // URL에서 맨 뒤의 연속된 숫자를 찾기 위한 정규식
        const match = currentUrl.match(regex);

        if (match) {
            const lastNumber = parseInt(match[1]); // 맨 뒤의 숫자 추출
            const newLastNumber = lastNumber + 1; // 변경할 숫자 계산

            if (newLastNumber === 101) {
                alert("100 페이지 보다 작아야 합니다")
                return
            }

            const newUrl = currentUrl.replace(regex, `/${newLastNumber}`); // 새로운 URL 생성
            console.log('새로운 URL : ', newUrl);
            router.push(newUrl); // 새로운 URL로 페이지 이동

        } else {
            console.log('URL에서 변경할 숫자를 찾을 수 없습니다.');
        }
    };


    // useEffect(() => {
    //     if (dataForskilNoteContent) {
    //         const ordersArray = dataForskilNoteContent?.skilnoteContents.map((row) => {
    //             return {
    //                 id: `${row.id}`,
    //                 order: `${row.order}`,
    //                 title: `${row.title}`,
    //                 file: `${row.file}`
    //             }
    //         })
    //         setOrderInfos(ordersArray)
    //     }
    // }, [dataForskilNoteContent])

    const allCheckHandler = () => {

        const AllIdsForSkilNoteContents = dataForskilNoteContent?.skilnoteContents.map((row) => {
            return row.id
        })

        if (checkedRows.length === AllIdsForSkilNoteContents?.length) {
            setCheckedRows([])
        } else {
            if (AllIdsForSkilNoteContents) {
                setCheckedRows(AllIdsForSkilNoteContents)
            }
        }
    }

    const scrollCardToEditor = () => {
        // data-order 값 가져오기
        const orderAttribute = editorRef.current?.getAttribute('data-order');

        console.log("orderAttribute : ", orderAttribute);

        if (orderAttribute === 'last') {
            // 스크롤 이동
            editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const deleteHandlerForCheckedRows = () => {
        deleteForSkilNoteContentsForCheckedIdsMutation.mutate(checkedRows)
        setCheckedRows([])
    }

    // console.log("dataForskilNoteContent : ", dataForskilNoteContent);


    // 2244
    return (
        <>
            <Head>
                <title>{dataForskilNoteContent?.title}</title>
            </Head>

            <Box>
                {/* fix 0216 */}
                <Box display={"flex"} border={"2px dotted black"} mx={2} p={0} gap={2}>
                    <Text>title: {dataForskilNoteContent?.title}</Text>
                    <Text>writer: {dataForskilNoteContent?.writer.email}</Text>
                    <Text>noteId: {skilNoteId}</Text>
                    <Text>pageNum: {pageNum}</Text>
                </Box>
                <Box mx={2} pt={1} pl={0} display={"flex"} gap={2} justifyContent={"space-between"}>
                    <Box display={"flex"} gap={2}>
                        <Button onClick={allCheckHandler} border={checkedRows.length === dataForskilNoteContent?.skilnoteContents.length ? "1px solid red" : ""}>
                            {checkedRows.length === dataForskilNoteContent?.skilnoteContents.length ? "all " : ""}
                            check  {"( " + checkedRows.length + " ) "}
                        </Button>
                        <Button onClick={handlerForEditModeClick}>Edit Mode</Button>
                        <Button onClick={deleteHandlerForCheckedRows}>delete</Button>
                    </Box>

                    <Box display={"flex"} gap={2} >
                        <Button width={"50%"} size={"md"} onClick={handleBeforeClick}>Before</Button>
                        <Button width={"50%"} size={"md"} onClick={handleNextClick}>Next</Button>
                    </Box>

                </Box>

            </Box>

            <Box display={"flex"} border={"0px dotted black"} overflowY={"scroll"} height={"100%"} mt={1} mx={2} width={"100%"}>
                <Box flex={6} border={"0px dotted red"} maxWidth={"60%"}>
                    <Box border="0px dashed red" p={0} display={"flex"} flexDirection={"column"} gap={2} overflowY={"scroll"} height={"80vh"} mt={0}>
                        {dataForskilNoteContent?.skilnoteContents.map((row, index) => (
                            <div data-order={row.order} key={row.id} ref={(ref) => (cardRefs.current[row.order] = ref)}>
                                <CardForSkilNoteContent
                                    key={row.id}
                                    skilNoteId={skilNoteId}
                                    noteObj={row}
                                    index={index + 1}
                                    data-order={row.order}
                                    pageNum={pageNum}
                                    checkedRows={checkedRows}
                                    setCheckedRows={setCheckedRows}
                                    isEditMode={isEditMode}
                                    bookMarks={row.bookMarks}
                                />
                            </div>
                        ))}
                        <Box
                            border="0px dashed red"
                            ref={editorRef}
                            height={"80vh"}
                            width={"100%"}
                            data-order={"last"}
                        >
                            <EditorForCreateSkilNoteContents
                                skilNoteId={skilNoteId}
                                pageNum={pageNum}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box flex={4} border={"2px dotted red"} position="sticky" top={0} mt={0} height={"80vh"}>

                    <TabMenuForSkilNoteContents
                        skilNoteId={skilNoteId}
                        pageNum={pageNum}
                        dataForskilNoteContent={dataForskilNoteContent}
                        scrollToCard={scrollToCard}
                        checkedRows={checkedRows}
                        setCheckedRows={setCheckedRows}
                        scrollCardToEditor={scrollCardToEditor}
                    />

                </Box>
            </Box >
        </ >
    );
};

export default SkilNoteContents;
