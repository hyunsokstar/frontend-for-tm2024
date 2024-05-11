import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    chakra,
} from '@chakra-ui/react';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useApiForUpdateLikeCountForFavoriteDevSpec } from '@/hooks/useApiForUpdateLikeCountForFavoriteDevSpec';
import useApiForUpdateDislikeCountForFavoriteDevSpec from '@/hooks/useApiForUpdateDisLikeCountForFavoriteDevSpec';


interface IProps {
    data: FavoriteDevSpecRow[];
}

const TableForFavoriteDevSpecList = ({ data }: IProps) => {
    const { mutate: updateLikeCount } = useApiForUpdateLikeCountForFavoriteDevSpec();
    const { mutate: updateDislikeCount } = useApiForUpdateDislikeCountForFavoriteDevSpec();

    const handleLike = (id: number) => {
        updateLikeCount(id);
    };

    const handleDislike = (id: number) => {
        updateDislikeCount(id);
    };

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table variant="striped" colorScheme="teal" size="xs"> {/* size 속성을 사용하여 테이블 크기를 조절 */}
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Language</Th>
                        <Th>Backend</Th>
                        <Th>Frontend</Th>
                        <Th>ORM</Th>
                        <Th>CSS</Th>
                        <Th>APP</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((devSpec: FavoriteDevSpecRow, index) => (
                        <Tr key={devSpec.id} height="20px"> {/* Tr 컴포넌트에 height 속성을 사용하여 행의 높이를 조절 */}
                            <Td>{index + 1}</Td>
                            <Td>{devSpec.language}</Td>
                            <Td>{devSpec.backend}</Td>
                            <Td>{devSpec.frontend}</Td>
                            <Td>{devSpec.orm}</Td>
                            <Td>{devSpec.css}</Td>
                            <Td>{devSpec.app}</Td>
                            <Td>
                                <chakra.span>
                                    <IconButton
                                        aria-label="좋아요"
                                        icon={<AiFillLike />}
                                        size="sm"
                                        colorScheme="green"
                                        mr={1}
                                        variant="outline"
                                        onClick={() => handleLike(devSpec.id)}
                                    />
                                    ({devSpec.likeCount})

                                    &nbsp;&nbsp;

                                    <IconButton
                                        aria-label="싫어요"
                                        icon={<AiFillDislike />}
                                        size="sm"
                                        colorScheme="red"
                                        variant="outline"
                                        mr={1}
                                        onClick={() => handleDislike(devSpec.id)}
                                    />
                                    ({devSpec.dislikeCount})
                                </chakra.span>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default TableForFavoriteDevSpecList;
