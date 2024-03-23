import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import useApiForGetAllParticipantsListForSubchallenges from '@/hooks/useApiForGetAllParticipantsListForSubchallenges';
import DataGridForChallengersForSubChallenges from '../DataGrid/DataGridForChallengersForSubChallenges';
import useUser from '@/hooks/useUser';
import useApiForAddParticipantForSubChallenge from '@/hooks/useApiForAddParticipantForSubChallenge';

interface Props {
    subChallengeId: number;
    subChallengeName: string;
}

const ModalButtonForAllParticipantsForSubChallenges: React.FC<Props> = ({ subChallengeId, subChallengeName }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const { isLoading, error, data: dataForChallengers } = useApiForGetAllParticipantsListForSubchallenges(subChallengeId);
    console.log("data for participants: ???", dataForChallengers);
    const [participantsEmailList, setParticipantsEmailList] = useState<string[]>([])
    const { isLoggedIn, loginUser, logout } = useUser();
    const mutationForAddParticipantForSubChallenge = useApiForAddParticipantForSubChallenge({ subChallengeId });

    const handleConfirm = () => {
        // 여기에 모달 버튼이 클릭되었을 때의 동작을 추가하세요
        console.log('Modal button clicked for subChallengeId:', subChallengeId);
        setIsOpen(false);
    };

    const handleJoinOrLeave = () => {
        if (participantsEmailList.includes(loginUser.email)) {
            // 이미 참가한 경우, 탈퇴 처리
            const noteUrl = "www.daum.net"
            if (noteUrl !== null) {
                mutationForAddParticipantForSubChallenge.mutate(noteUrl)
            }
        } else {
            // 참가한 경우, 참가 처리
            const noteUrl = prompt('참가하려면 noteUrl을 입력해주세요.');
            if (noteUrl !== null) {
                mutationForAddParticipantForSubChallenge.mutate(noteUrl)
            }
        }
    };


    useEffect(() => {
        if (dataForChallengers) {
            setParticipantsEmailList(dataForChallengers.data.participantsEmailList)
        }
    }, [dataForChallengers])

    return (
        <>
            <Button onClick={handleOpen} variant={"outline"} size={"xs"} >participants({participantsEmailList.length})</Button>
            <Modal isOpen={isOpen} onClose={handleClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{subChallengeName} 's participants</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={"flex"} justifyContent={"flex-end"} my={2}>
                            <Button variant={"outline"} size="sm" onClick={handleJoinOrLeave}>
                                {participantsEmailList.includes(loginUser.email) ? '탈퇴' : '참가'}
                            </Button>
                        </Box>

                        <DataGridForChallengersForSubChallenges subChallengeId={subChallengeId} participantsForSubChallenge={dataForChallengers ? dataForChallengers?.data.participantsForSubChallenge : []} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAllParticipantsForSubChallenges;
