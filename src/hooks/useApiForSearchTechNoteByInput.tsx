import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSearchTechNoteBySearchOptionAndSearchText } from '@/api/apiForTechNotes';


type Props = {
    setNoteRows: any
}

const useApiForSearchTechNoteByInput = ({ setNoteRows }: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSearchTechNoteBySearchOptionAndSearchText = useMutation({
        mutationFn: apiForSearchTechNoteBySearchOptionAndSearchText,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            const resultArray = result.data.searchResult.map((row: any) => {
                return {
                    id: row.id,
                    email: row.writer ? row.writer.email : "",
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    skilnotes: row.skilnotes,
                    type: "MASTER",
                    expanded: false,
                }
            })

            setNoteRows(resultArray)

            // 성공 시 처리 로직을 추가합니다.
            toast({
                title: "Update Ref Skilnote for Todo success",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            // 에러 시 처리 로직을 추가합니다.
            console.log("error : ", error);

            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSearchTechNoteBySearchOptionAndSearchText;

}

export default useApiForSearchTechNoteByInput