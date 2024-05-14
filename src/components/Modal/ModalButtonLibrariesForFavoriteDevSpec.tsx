import {
    Button,
    Modal,
    ModalBody,
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
    Divider,
    Text,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { LibraryRowForFavoriteDevSpec } from '@/types/typeForFavoriteDevSpec';
import ModalButtonForAddLibraryInfoForFavoriteDevSpec from './ModalButtonForAddLibraryInfoForFavoriteDevSpec';

interface Props {
    idForFavoriteDevSpec: number;
    libraries: LibraryRowForFavoriteDevSpec[];
}

const ModalButtonLibrariesForFavoriteDevSpec: React.FC<Props> = ({
    idForFavoriteDevSpec,
    libraries,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                size="xs"
                variant="outline"
                onClick={onOpen}
                border={"1px solid black"}
            >
                library
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent height={"100%"}>
                    <ModalHeader>Library List</ModalHeader>
                    <ModalCloseButton />
                    <Box height={"100%"}>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <ModalButtonForAddLibraryInfoForFavoriteDevSpec
                                idForFavoriteDevSpec={idForFavoriteDevSpec}
                            />
                        </Box>

                        <Box display="flex" gap="6">
                            {Object.values(LibraryCategory).map((category) => (
                                <Box key={category} flexBasis="33.33%">
                                    <Text fontSize="2xl" fontWeight="bold" mb="4">
                                        {category}
                                    </Text>
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Library Name</Th>
                                                <Th>Description</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {libraries
                                                .filter((library) => library.category === category)
                                                .map((library) => (
                                                    <Tr key={library.id}>
                                                        <Td>{library.library}</Td>
                                                        <Td>{library.description}</Td>
                                                    </Tr>
                                                ))}
                                        </Tbody>
                                    </Table>
                                </Box>
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

export enum LibraryCategory {
    BACKEND = 'backend',
    STATE_MANAGEMENT = 'state_management',
    UI = 'ui',
}

export default ModalButtonLibrariesForFavoriteDevSpec;
