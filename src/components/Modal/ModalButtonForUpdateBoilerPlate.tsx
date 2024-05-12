import React, { useState } from 'react';
import { Input, Stack, FormLabel, FormControl, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { FaGithub, FaRegStickyNote } from 'react-icons/fa';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';
import { useForm } from 'react-hook-form';
import useApiForUpdateBoilerPlateInfoForFavoriteDevSpec from '@/hooks/useApiForUpdateBoilerPlateInfoForFavoriteDevSpec';

interface IProps {
    devSpec: FavoriteDevSpecRow;
}

const ModalButtonForUpdateBoilerPlate = ({ devSpec }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const mutationForUpdateRelatedProjectInfo = useApiForUpdateBoilerPlateInfoForFavoriteDevSpec(); // 변경된 부분

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const handleAddLink = (value: string) => {
        if (value.trim() !== '') {
            window.open(value, '_blank');
        }
    };

    const onSubmit = async (data: any) => {
        console.log("data for update: ", data);
        await mutationForUpdateRelatedProjectInfo.mutateAsync({ id: devSpec.id, data }); // 변경된 부분
        // 업데이트 중 에러 발생 시 수행할 작업 추가
    };

    return (
        <>
            <Button variant="outline" colorScheme="blue" size="xs" onClick={onOpen}
                _hover={{ bg: "blue.100", borderColor: "orange.50" }}>boiler plate</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update BoilerPlate</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl mb={1}>
                                    <FormLabel>Authentication</FormLabel>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("authGithub")} defaultValue={devSpec.authGithub} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.authGithub)}>
                                                <FaGithub />
                                            </Button>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("authNote")} defaultValue={devSpec.authNote} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.authNote)}>
                                                <FaRegStickyNote />
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                                <FormControl mb={1}>
                                    <FormLabel>Board</FormLabel>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("boardGithub")} defaultValue={devSpec.boardGithub} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.boardGithub)}>
                                                <FaGithub />
                                            </Button>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("boardNote")} defaultValue={devSpec.boardNote} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.boardNote)}>
                                                <FaRegStickyNote />
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                                <FormControl mb={1}>
                                    <FormLabel>Chatting</FormLabel>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("chatGithub")} defaultValue={devSpec.chatGithub} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.chatGithub)}>
                                                <FaGithub />
                                            </Button>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("chatNote")} defaultValue={devSpec.chatNote} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.chatNote)}>
                                                <FaRegStickyNote />
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                                <FormControl mb={1}>
                                    <FormLabel>Payment</FormLabel>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("paymentGithub")} defaultValue={devSpec.paymentGithub} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.paymentGithub)}>
                                                <FaGithub />
                                            </Button>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("paymentNote")} defaultValue={devSpec.paymentNote} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.paymentNote)}>
                                                <FaRegStickyNote />
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                                <FormControl mb={1}>
                                    <FormLabel>DevOps</FormLabel>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("devOpsGithub")} defaultValue={devSpec.devOpsGithub} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.devOpsGithub)}>
                                                <FaGithub />
                                            </Button>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <Input size="sm" {...register("devOpsNote")} defaultValue={devSpec.devOpsNote} />
                                            <Button size="xs" variant="outline" colorScheme="blue" onClick={() => handleAddLink(devSpec.devOpsNote)}>
                                                <FaRegStickyNote />
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </FormControl>
                                <Button type="submit" colorScheme="green" size="sm">
                                    제출
                                </Button>
                            </Stack>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Box display="flex" gap={1} width={"100%"}>
                            <Button
                                colorScheme="red"
                                size="sm"
                                onClick={onClose}
                                flex="1"
                            >
                                취소
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUpdateBoilerPlate;
