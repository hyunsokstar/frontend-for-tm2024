import { useState } from 'react';
import { Box, Input, Select, Button, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import React from "react";

type Props = {
    handleSearchButtonForClick: (searchOption: string, searchText: string) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    searchOption: string;
    setSearchOption: (option: string) => void;
};

const SearchInputForSkilNote = ({
    searchText,
    setSearchText,
    searchOption,
    setSearchOption,
    handleSearchButtonForClick
}: Props) => {

    return (
        <Box display="flex" alignItems="center" mx={1} width={"800px"}>
            <InputGroup>
                <InputLeftAddon width={"24vh"} px={0}>
                    <Select width={"100%"}
                        borderColor="gray.300"
                        _hover={{ borderColor: "black" }}
                        value={searchOption}
                        onChange={(event) => setSearchOption(event.target.value)}
                    >
                        <option value="email">email</option>
                        <option value="title">title</option>
                        <option value="category">category</option>
                    </Select>
                </InputLeftAddon>
                <Input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    flex="1"
                    mx={1}
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </InputGroup>
        </Box >
    );
};

export default SearchInputForSkilNote;
