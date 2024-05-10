import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';

interface IProps {
    data: FavoriteDevSpecRow[]
}

const TableForFavoriteDevSpecList = ({ data }: IProps) => {
    return (
        <Table variant="striped" colorScheme="teal">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Language</Th>
                    <Th>Backend</Th>
                    <Th>Frontend</Th>
                    <Th>ORM</Th>
                    <Th>CSS</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((devSpec: FavoriteDevSpecRow) => (
                    <Tr key={devSpec.id}>
                        <Td>{devSpec.id}</Td>
                        <Td>{devSpec.language}</Td>
                        <Td>{devSpec.backend}</Td>
                        <Td>{devSpec.frontend}</Td>
                        <Td>{devSpec.orm}</Td>
                        <Td>{devSpec.css}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default TableForFavoriteDevSpecList;
