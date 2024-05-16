import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    chakra,
    Box,
} from '@chakra-ui/react';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';
import { AiFillLike, AiFillDislike, AiOutlineArrowUp } from 'react-icons/ai';
import { useApiForUpdateLikeCountForFavoriteDevSpec } from '@/hooks/useApiForUpdateLikeCountForFavoriteDevSpec';
import useApiForUpdateDislikeCountForFavoriteDevSpec from '@/hooks/useApiForUpdateDisLikeCountForFavoriteDevSpec';
import ModalButtonForUpdateBoilerPlate from '../Modal/ModalButtonForUpdateBoilerPlate';
import useApiForUpdateCompanyForFavoriteDevSpec from '@/hooks/useApiForUpdateCompanyForFavoriteDevSpec';
import ModalButtonLibrariesForFavoriteDevSpec from '../Modal/ModalButtonLibrariesForFavoriteDevSpec';
import InputForUpdateCompanyForFavoriteDevSpecRow from '../Input/InputForUpdateCompanyForFavoriteDevSpecRow';
import ModalButtonToolsForFavoriteDevSpec from '../Modal/ModalButtonToolsForFavoriteDevSpec';


interface IProps {
    data: FavoriteDevSpecRow[];
}

const TableForFavoriteDevSpecList = ({ data }: IProps) => {
    const [inputCompany, setInputCompany] = useState<string>('');
    const { mutate: updateLikeCount } = useApiForUpdateLikeCountForFavoriteDevSpec();
    const { mutate: updateDislikeCount } = useApiForUpdateDislikeCountForFavoriteDevSpec();
    const { mutate: updateCompany } = useApiForUpdateCompanyForFavoriteDevSpec();

    const handleLike = (id: number) => {
        updateLikeCount(id);
    };

    const handleDislike = (id: number) => {
        updateDislikeCount(id);
    };
    console.log("data : ", data);

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table variant="striped" colorScheme="teal" size="xs"> {/* size 속성을 사용하여 테이블 크기를 조절 */}
                <Thead>
                    <Tr>
                        <Th>Index</Th>
                        <Th>Company</Th>
                        <Th>Language</Th>
                        <Th>Backend</Th>
                        <Th>Frontend</Th>
                        <Th>ORM</Th>
                        <Th>CSS</Th>
                        <Th>APP</Th>
                        <Th>Librarys</Th>
                        <Th>Tools</Th>
                        <Th>Boiler Plate</Th>
                        <Th>like / dislike</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((devSpec: FavoriteDevSpecRow, index) => (
                        <Tr key={devSpec.id} height="22px"> {/* Tr 컴포넌트에 height 속성을 사용하여 행의 높이를 조절 */}
                            <Td>{index + 1}</Td>
                            <Td>
                                {devSpec.company !== "" ? devSpec.company :
                                    (
                                        <InputForUpdateCompanyForFavoriteDevSpecRow idForFavoriteDevSpec={devSpec.id} />
                                    )
                                }
                            </Td>
                            <Td>{devSpec.language}</Td>
                            <Td>{devSpec.backend}</Td>
                            <Td>{devSpec.frontend}</Td>
                            <Td>{devSpec.orm}</Td>
                            <Td>{devSpec.css}</Td>
                            <Td>{devSpec.app}</Td>
                            <Td>
                                <ModalButtonLibrariesForFavoriteDevSpec
                                    idForFavoriteDevSpec={devSpec.id}
                                    libraries={devSpec.libraries}
                                />
                            </Td>
                            <Td>
                                <ModalButtonToolsForFavoriteDevSpec
                                    idForFavoriteDevSpec={devSpec.id}
                                    tools={devSpec.tools}
                                />
                            </Td>
                            <Td>
                                <Box display={"flex"} gap={1}>
                                    <ModalButtonForUpdateBoilerPlate devSpec={devSpec} />
                                </Box>
                            </Td>
                            <Td>
                                <chakra.span>
                                    <IconButton
                                        aria-label="좋아요"
                                        icon={<AiFillLike />}
                                        size="xs"
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
                                        size="xs"
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
