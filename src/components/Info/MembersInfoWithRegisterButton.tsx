import React, { useState, useEffect } from 'react';
import { Text, IconButton, Avatar, HStack, Box, useToast } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { MemberForDevTeamResponse } from '@/types/typeForDevBattle';
import useApiForAddMemeberToDevBattleTeam from '@/hooks/useApiForAddMemeberToDevBattleTeam';
import useUser from '@/hooks/useUser';

interface MemberAvatarsWithRegisterButtonProps {
    teamId: number;
    members: MemberForDevTeamResponse[];
}

const getMemberAvatar = (member: MemberForDevTeamResponse) => {
    if (member.user.profileImage) {
        return <Avatar key={member.user.email} name={member.user.email} src={member.user.profileImage} size={'xs'} />;
    }
    // member.name이 undefined인 경우, 빈 문자열을 사용합니다.
    const name = member.user.email || '';
    return <Avatar key={member.user.email} name={name.charAt(0)} size={'xs'} />;
};

const MemberAvatarsWithRegisterButton: React.FC<MemberAvatarsWithRegisterButtonProps> = ({
    teamId,
    members
}) => {
    const toast = useToast();
    const mutationForAddMemeberToDevBattleTeam = useApiForAddMemeberToDevBattleTeam();

    const { isLoggedIn, loginUser, logout } = useUser();

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        setIsMember(members.some(member => member.user.id === loginUser.id));
    }, [members, loginUser.id]);

    const handleAddMember = () => {
        mutationForAddMemeberToDevBattleTeam.mutate({ teamId, memberId: loginUser.id });
    };

    const handleRemoveMember = () => {
        // TODO: implement API to remove member from team
    };

    return (
        <Box>
            {members.length > 0 ? (
                <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                    <HStack spacing={2}>{members.slice(0, 3).map((member) => getMemberAvatar(member))}</HStack>
                    {isLoggedIn && (
                        <IconButton
                            aria-label={isMember ? "Remove member" : "Add member"}
                            icon={isMember ? <MinusIcon /> : <AddIcon />}
                            size={"xs"}
                            variant={"outline"}
                            onClick={handleAddMember}
                        />
                    )}
                </Box>
            ) : (
                <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                    <Text>no members</Text>
                    {isLoggedIn && (
                        <IconButton
                            aria-label="Add member"
                            icon={<AddIcon />}
                            size={"xs"}
                            variant={"outline"}
                            onClick={handleAddMember}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default MemberAvatarsWithRegisterButton;
