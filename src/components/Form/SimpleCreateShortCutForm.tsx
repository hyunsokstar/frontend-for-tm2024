import useApiForSimpleCreateShortCut from '@/hooks/useApiForSimpleCreateShortCut';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
    shortcut: string;
    description: string;
};

interface IProps {
    pageNum: any
}

const SimpleCreateShortCutForm = ({ pageNum }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const mutationForSimpleCreateShortCut = useApiForSimpleCreateShortCut(pageNum);

    const onSubmit = (data: FormData) => {
        console.log("Submitted data:", data);
        mutationForSimpleCreateShortCut.mutate({
            shortcut: data.shortcut,
            description: data.description
        })
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" spacing={4} width={"1000px"} border={"0px solid black"} px={1} m={2}>
                    <Input
                        type="text"
                        placeholder="Shortcut"
                        {...register("shortcut", { required: "Shortcut is required" })}
                    />
                    {errors.shortcut && <span>{errors.shortcut.message}</span>}
                    <Input
                        type="text"
                        placeholder="Description"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <span>{errors.description.message}</span>}
                    <Button type="submit" variant="outline" size="md">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default SimpleCreateShortCutForm;
