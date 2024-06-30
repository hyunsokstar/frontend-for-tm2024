import React from 'react';
import { Image, VStack, Text } from '@chakra-ui/react';
import md5 from 'md5';
import { IUser } from '@/types/typeForUserBoard';

interface ProfileImageForUserCardProps {
    user: IUser;
    size?: string; // 크기 옵션 추가
}

const ProfileImageForUserCard: React.FC<ProfileImageForUserCardProps> = ({ user, size = '150px' }) => {
    const getProfileImage = () => {
        if (user.profileImage) {
            return user.profileImage;
        } else {
            const hash = md5(user.email.toLowerCase().trim());
            return `https://www.gravatar.com/avatar/${hash}?s=150&d=identicon&r=PG`;
        }
    };

    return (
        <>
            <Image
                src={getProfileImage()}
                alt={`${user.nickname} profile image`}
                borderRadius="full"
                boxSize={size} // 크기 옵션 사용
                mx="auto"
                mb="4"
            />
            {/* <VStack spacing="2" align="start">
                <Text>{user.email}</Text>
                <Text>Phone: {user.phoneNumber}</Text>
                <Text>Frontend Level: {user.frontEndLevel}</Text>
                <Text>Backend Level: {user.backEndLevel}</Text>
            </VStack> */}
        </>
    );
};

export default ProfileImageForUserCard;
