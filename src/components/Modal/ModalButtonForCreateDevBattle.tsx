import React from "react";
import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    FormLabel,
    FormControl,
    Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import useApiForCreateDevBattle from "@/hooks/useApiForCreateDevBattle";
import { CreateDevBattleDto } from "@/types/typeForDevBattle";

type Props = {};

const ModalButtonForCreateDevBattle: React.FC<Props> = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateDevBattleDto>();
    const mutationForCreateDevBattle = useApiForCreateDevBattle();

    const onSubmit = (data: CreateDevBattleDto) => {
        console.log("data : ", data);

        const createDevBattleDto = {
            subject: data.subject

        }

        mutationForCreateDevBattle.mutate({ createDevBattleDto }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <IconButton
                aria-label="Create DevBattle"
                icon={<AddIcon />}
                size="xs"
                variant="outline"
                _hover={{ bg: "blue.100" }}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create DevBattle</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={!!errors.subject}>
                                <FormLabel>Subject</FormLabel>
                                <Input type="text" {...register("subject", { required: "Subject is required" })} />
                                <span role="alert">
                                    {errors.subject && typeof errors.subject.message === 'string' && errors.subject.message}
                                </span>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreateDevBattle;
