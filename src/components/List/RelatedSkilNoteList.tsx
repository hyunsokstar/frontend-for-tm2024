import { TypeForRelatedSkilNoteRow } from "@/types/typeForSkilNoteContents";
import { Box, Button, Flex } from "@chakra-ui/react";

interface RelatedSkilNoteListProps {
    relatedSkilnoteList?: TypeForRelatedSkilNoteRow[] | null;
}

const RelatedSkilNoteList: React.FC<RelatedSkilNoteListProps> = ({ relatedSkilnoteList }) => {
    return (
        <>
            {relatedSkilnoteList ? (
                relatedSkilnoteList.map((skilnote, index) => (
                    <Flex key={skilnote.id} mb={2} alignItems="center">
                        <Button variant={"outline"} size={"xs"}>{index + 1}</Button>
                        <Box marginLeft={2}>{skilnote.title}</Box>
                        <Button
                            as="a"
                            href={`/Note/SkilNoteContents/${skilnote.id}/1`}
                            marginLeft="auto"
                            colorScheme="blue"
                            variant={"outline"}
                            size={"xs"}
                        >
                            이동
                        </Button>
                    </Flex>
                ))
            ) : (
                <Box>no contents</Box>
            )}
        </>
    );
};

export default RelatedSkilNoteList;
