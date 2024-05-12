import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApiForCreateDevSpec from '@/hooks/useApiForCreateDevSpec';

interface FormValues {
    spec: string;
}

interface Props {
    category: string;
}

const ModalButtonForAddDevSpec = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const createDevSpecMutation = useApiForCreateDevSpec();

    const onSubmitForm = (values: FormValues) => {
        createDevSpecMutation.mutate({ ...values, category: props.category });
        onClose();
    };

    return (
        <>
            <Button size="xs" variant="outline" onClick={onOpen}>+</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Dev Spec</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <ModalBody>
                            <Text fontWeight="bold">Category: {props.category}</Text>
                            <FormControl isInvalid={Boolean(errors.spec)} mb={6}>
                                <FormLabel>Spec</FormLabel>
                                <Input type="text" {...register("spec", { required: "Spec is required" })} />
                                {errors.spec && <span>{errors.spec.message}</span>}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter justifyContent="space-between" pt={4}>
                            <Button type="submit" colorScheme="green" variant="outline" _hover={{ bg: "green.100", borderColor: "green.100" }} mr={3} flexGrow={1}>
                                Submit
                            </Button>
                            <Button variant="outline" _hover={{ bg: "red.100", borderColor: "red.100" }} onClick={onClose} flexGrow={1}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddDevSpec;