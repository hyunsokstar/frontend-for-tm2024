import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Box,
    Text,
    Tr,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ToolCategory, ToolsRowForFavoriteDevSpec } from '@/types/typeForFavoriteDevSpec';

interface Props {
    idForFavoriteDevSpec: number;
    tools: ToolsRowForFavoriteDevSpec[];
}

const ModalButtonToolsForFavoriteDevSpec: React.FC<Props> = ({
    idForFavoriteDevSpec,
    tools,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button size="xs" variant="outline" onClick={onOpen} border={"1px solid black"}>
                tools ({tools.length})
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent height={"100%"}>
                    <ModalHeader>Tool List</ModalHeader>
                    <ModalCloseButton />
                    <Box height={"100%"} mx={5}>
                        <Box display="flex" gap="6" mt={2}>
                            {Object.values(ToolCategory).map((category) => (
                                <VStack key={category} flexBasis="33.33%" spacing={0} alignItems="stretch" bg="gray.100" p={2}>
                                    <Text fontSize="2xl" fontWeight="bold" mb="4">
                                        {category}
                                    </Text>
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Tool Name</Th>
                                                <Th>Description</Th>
                                                <Th>Site URL</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {tools
                                                .filter((tool) => tool.category === category)
                                                .map((tool) => (
                                                    <Tr key={tool.id}>
                                                        <Td>{tool.tool}</Td>
                                                        <Td>{tool.description}</Td>
                                                        <Td>{tool.siteUrl}</Td>
                                                    </Tr>
                                                ))}
                                        </Tbody>
                                    </Table>
                                </VStack>
                            ))}
                        </Box>
                    </Box>
                    <ModalFooter bg="white" borderTop="1px solid gray.300">
                        <Button variant="outline" w="100%" colorScheme="red" size="lg" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonToolsForFavoriteDevSpec;
