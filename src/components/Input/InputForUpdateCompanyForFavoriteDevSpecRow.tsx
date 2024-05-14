import useApiForUpdateCompanyForFavoriteDevSpec from '@/hooks/useApiForUpdateCompanyForFavoriteDevSpec';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai';

type Props = {
    idForFavoriteDevSpec: number
}

const InputForUpdateCompanyForFavoriteDevSpecRow = ({ idForFavoriteDevSpec }: Props) => {
    const [inputCompany, setInputCompany] = useState<string>('');
    const { mutate: updateCompany } = useApiForUpdateCompanyForFavoriteDevSpec();


    return (
        <div>
            <InputGroup size='xs' width={"80%"}>
                <Input
                    size={"xs"}
                    border={"1px solid green"}
                    value={inputCompany}
                    onChange={(e) => setInputCompany(e.target.value)}
                />
                <InputRightElement >
                    <IconButton
                        size="xs"
                        variant="outline"
                        colorScheme="green"
                        icon={<AiOutlineArrowUp />}
                        aria-label="Update"
                        m={1}
                        onClick={() => {
                            updateCompany({ id: idForFavoriteDevSpec, company: inputCompany });
                        }}
                    />
                </InputRightElement>
            </InputGroup>
        </div>
    )
}

export default InputForUpdateCompanyForFavoriteDevSpecRow