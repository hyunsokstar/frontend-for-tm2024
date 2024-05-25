// src/components/DevRelay.tsx
import React, { useEffect, useState } from 'react';
import { Flex, Box, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import useApiForGetAllCategoriesForDevAssignments from '@/hooks/useApiForGetAllCategoriesForDevAssignments';
import CategoryListForDevAssignment from '@/components/List/CategoryListForDevAssignment';
import DevAssignmentListForCategory from '@/components/List/DevAssignmentListForCategory';
import ModalButtonForCreateCategoryForDevAssignment from '@/components/Modal/ModalButtonForCreateCateogryForDevAssignment';
import ModalButtonForCreateDevAssignmentForCategory from '@/components/Modal/ModalButtonForCreateDevAssignmentForCategory';
import { useRouter } from 'next/router';
import useApiForGetAllSubjects from '@/hooks/useApiForGetAllSubjects';
import ModalButtonForCreateSubject from '@/components/Modal/ModalButtonForAddSubject';
import useApiForDeleteSubject from '@/hooks/useApiForDeleteSubject';

const DevRelay: React.FC = () => {
    const router = useRouter();
    const { isLoading: isSubjectsLoading, error: subjectsError, data: subjects } = useApiForGetAllSubjects();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<number>();
    const { isLoading, error, data } = useApiForGetAllCategoriesForDevAssignments(selectedSubject);
    const deleteSubjectMutation = useApiForDeleteSubject();

    const bgColor = useColorModeValue('gray.200', 'gray.700');
    const iconColor = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        const categoryId = router.query.categoryId;
        if (categoryId) {
            setSelectedCategory(parseInt(categoryId as string));
        }

        if (!selectedSubject && subjects) {
            setSelectedSubject(subjects[0].id);
        }
    }, [router.query.categoryId, selectedSubject, subjects]);

    if (isLoading || isSubjectsLoading) return <div>Loading...</div>;
    if (error || subjectsError) return <div>Error: {error?.message || subjectsError?.message}</div>;

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    const handleSubjectClick = (subjectId: number) => {
        setSelectedSubject(subjectId);
        setSelectedCategory(null);
    };

    const handleDeleteSubject = (subjectId: number) => {
        deleteSubjectMutation.mutate(subjectId);
    };

    return (
        <>
            <Flex align="center" justify="center" bg="gray.100" py={4}>
                {subjects?.map((subject) => (
                    <Box
                        key={subject.id}
                        p={1}
                        mx={2}
                        bg={selectedSubject === subject.id ? 'blue.500' : 'white'}
                        color={selectedSubject === subject.id ? 'white' : 'gray.700'}
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => handleSubjectClick(subject.id)}
                        transition="all 0.2s"
                        _hover={{ bg: 'blue.600', color: 'white' }}
                        display={"flex"}
                        gap={2}
                    >
                        <Text fontWeight="bold">{subject.name}</Text>
                        <IconButton
                            aria-label="Delete Subject"
                            icon={<MinusIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSubject(subject.id);
                            }}
                            size="xs"
                            colorScheme="red"
                        />
                    </Box>
                ))}
                <ModalButtonForCreateSubject />
            </Flex>
            <Flex h="100vh">
                <Box
                    left={0}
                    top={'80px'}
                    marginLeft={'-10px'}
                    borderRightColor={'blue.200'}
                    borderRightWidth={1}
                    w={{ base: '100%', md: '20%' }}
                    overflowY="auto"
                    p={2}
                >
                    <Box display="flex" justifyContent="flex-end" pr={0} mb={2}>
                        <ModalButtonForCreateCategoryForDevAssignment />
                    </Box>
                    <CategoryListForDevAssignment
                        categories={data || []}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryClick}
                    />
                </Box>
                <Box flex="1" p={4}>
                    <Box flex="1" p={4} display="flex" justifyContent="flex-end">
                        <ModalButtonForCreateDevAssignmentForCategory categoryId={selectedCategory} />
                    </Box>

                    {selectedCategory !== null && <DevAssignmentListForCategory categoryId={selectedCategory} />}
                </Box>
            </Flex>
        </>
    );
};

export default DevRelay;