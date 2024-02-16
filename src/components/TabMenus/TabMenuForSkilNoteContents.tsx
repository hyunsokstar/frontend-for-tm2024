import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavigatorForScrollContents from '../Navigator/NavigatorForScrollContents'
import { responseTypeForGetSkilNoteContents } from '@/types/typeForSkilNoteContents'
import NavigatorForPages from '../Navigator/NavigatorForSkilNotePages'
import BookMarksForInfoForSkilNoteContents from '../Info/BookMarksForInfoForSkilNoteContents'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import NavigaterForSkilNotePages2 from '../Navigator/NavigaterForSkilNotePages2'

interface IProps {
    // itemsInfo: Item[]
    skilNoteId: any
    pageNum: any
    scrollToCard: (index: number) => void
    checkedRows: number[];
    setCheckedRows: any;
    scrollCardToEditor: () => void
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
}

const TabMenuForSkilNoteContents = ({
    skilNoteId,
    pageNum,
    dataForskilNoteContent,
    scrollToCard,
    checkedRows,
    setCheckedRows,
    scrollCardToEditor
}: IProps) => {
    const [countForSkilNoteContents, setCountForSkilNoteContents] = useState<any>()
    const [countForSkilNotePages, setCountForSkilNotePages] = useState<any>()
    const [totalBookMarkCount, setTotalCountForBookMarkCount] = useState<any>()
    const loginUser = useSelector((state: RootState) => state.user.loginUser);

    useEffect(() => {

        const countForSkilNotePages = dataForskilNoteContent?.skilnotePagesCount;
        console.log("skilnotePagesCount : ", dataForskilNoteContent?.skilnotePagesCount);

        const countForSkilNoteContents = dataForskilNoteContent?.skilnoteContents.length
        const skilnoteContents = dataForskilNoteContent?.skilnoteContents
        let totalCountForBookMark = 0
        const myBookMarCount = skilnoteContents?.map((skilnote) => {
            let countForBookMark = skilnote.bookMarks.filter((bookmark) => {
                if (bookmark.user.email === loginUser.email) {
                    console.log("check for bookmark");
                    totalCountForBookMark++
                }
            })
            return totalCountForBookMark
        })
        setTotalCountForBookMarkCount(totalCountForBookMark)

        setCountForSkilNoteContents(countForSkilNoteContents)
        setCountForSkilNotePages(countForSkilNotePages)
    }, [dataForskilNoteContent])

    return (
        <Tabs isFitted variant='enclosed' size={"sm"}>
            <TabList mb='1em'>
                <Tab _selected={{ color: 'black.500', bg: 'blue.300' }}>Contents({countForSkilNoteContents})</Tab>
                <Tab _selected={{ color: 'black.500', bg: 'red.300' }}>Pages ({countForSkilNotePages})</Tab>
                <Tab _selected={{ color: 'black.500', bg: 'green.200' }}>
                    BookMarks ({totalBookMarkCount})
                </Tab>
                <Tab _selected={{ color: 'yellow.300', bg: 'brown' }}>
                    Q & A
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0}>
                    <NavigatorForScrollContents
                        skilNoteId={skilNoteId}
                        pageNum={pageNum}
                        dataForskilNoteContent={dataForskilNoteContent}
                        scrollToCard={scrollToCard}
                        checkedRows={checkedRows}
                        setCheckedRows={setCheckedRows}
                        scrollCardToEditor={scrollCardToEditor}
                    />
                </TabPanel>
                <TabPanel>
                    {/* <NavigatorForPages
                        skilNoteId={skilNoteId}
                        dataForskilNoteContent={dataForskilNoteContent}
                    /> */}
                    <NavigaterForSkilNotePages2 skilNoteId={skilNoteId} pageNum={pageNum} dataForskilNoteContent={dataForskilNoteContent} />
                </TabPanel>
                <TabPanel>
                    <Box overflowY="scroll" height={"100vh"} border={"5px solid pink"}>
                        <BookMarksForInfoForSkilNoteContents
                            skilNoteId={skilNoteId}
                            dataForskilNoteContent={dataForskilNoteContent}
                        />
                    </Box>
                </TabPanel>
                <TabPanel>
                    qa
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabMenuForSkilNoteContents