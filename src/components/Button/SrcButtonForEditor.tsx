'use client'
import { useState } from 'react'
import { Button, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'

interface IProps {
    register: any
}

export default function SrcButtonForEditor({ register }: IProps) {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState(register.value || '');

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        // 'src' 버튼 클릭 시 입력값 변환 함수 적용
        const transformedValue = transformFilePath(inputValue);

        console.log("transformedValue : ", transformedValue);


        // register 함수를 호출하여 값 설정
        // register.onChange(transformedValue);
    };

    const transformFilePath = (filePath: string) => {
        // 정규표현식을 사용하여 필요한 부분을 추출
        const match = filePath.match(/src[\\/](.+)$/i);
        if (match) {
            return match[1].replace(/[\\/]/g, '/');
        }
        return filePath;
    };

    return (
        <form>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    placeholder='file name'
                    value={inputValue}
                    onChange={handleChange}
                />
                <InputLeftAddon width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'changed' : 'src'}
                    </Button>
                </InputLeftAddon>
            </InputGroup>
        </form>
    )
}
