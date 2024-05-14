import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, Box } from '@chakra-ui/react';
import React from 'react';
import { LibraryRowForFavoriteDevSpec } from '@/types/typeForFavoriteDevSpec';
import ModalButtonForAddLibraryInfoForFavoriteDevSpec from './ModalButtonForAddLibraryInfoForFavoriteDevSpec';

interface Props {
    idForFavoriteDevSpec: number;
    libraries: LibraryRowForFavoriteDevSpec[];
}

const ModalButtonLibrariesForFavoriteDevSpec: React.FC<Props> = ({ idForFavoriteDevSpec, libraries }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    return (
        <>
            <Button
                size="xs"
                variant="outline"
                onClick={() => setIsOpen(true)}
                border={"1px solid black"}
            >
                library
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Library List</ModalHeader>
                    <ModalCloseButton />
                    <Box>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            {/* <Button
                                size="sm"
                                colorScheme="teal"
                                textAlign={"end"}
                                variant="outline"
                                mr={2}
                            >
                                +
                            </Button> */}
                            <ModalButtonForAddLibraryInfoForFavoriteDevSpec idForFavoriteDevSpec={idForFavoriteDevSpec} />
                        </Box>

                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Library Name</Th>
                                    <Th>description</Th>
                                    <Th>Site URL</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {libraries.map((library) => (
                                    <Tr key={library.id}>
                                        <Td>{library.id}</Td>
                                        <Td>{library.library}</Td>
                                        <Td>{library.description}</Td>
                                        <Td>{library.siteUrl}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonLibrariesForFavoriteDevSpec;
