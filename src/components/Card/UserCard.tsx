import React from 'react';
import { Box, Image, Text, VStack, HStack, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { FiUser, FiClipboard } from 'react-icons/fi';
import { FaRunning, FaMeh, FaSmile, FaUmbrellaBeach } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";
import { MdOutlineTimeline } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';
import SwitchButtonForOnlineStatus from '../Button/SwitchButtonForOnlineStatus';
import ModalButtonForTaskHistoryForUser from '../Modal/ModalButtonForTaskHistoryForUser';
import ModalButtonForUserTaskStatistics from '../Modal/ModalButtonForUserTaskStatics';

interface Todo {
    id: number;
    task: string;
    status: string;
    startTime: string | null;
    completedAt: string | null;
    deadline: string | null;
    elapsedTime: string | null;
    manager: {
        id: number;
        email: string;
        profileImage?: string;
    };
}

const todoList: Todo[] = [
    {
        "id": 2,
        "task": "alt + s 누르면 save 되도록 하기",
        "status": "complete",
        "startTime": null,
        "completedAt": "2024-03-09T03:22:37.056Z",
        "deadline": "2024-03-01T09:00:00.000Z",
        "elapsedTime": "474990시간 22분",
        "manager": {
            "id": 1,
            "email": "terecal1@daum.net",
            "profileImage": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/8685e812-e10c-488a-63ee-6e085f67af00/public"
        }
    },
    {
        "id": 22,
        "task": "dev-spec-survey 앱 추가 + 기능 구현",
        "status": "complete",
        "startTime": null,
        "completedAt": "2024-06-28T14:01:53.987Z",
        "deadline": "2024-05-08T09:00:00.000Z",
        "elapsedTime": "477664시간 1분",
        "manager": {
            "id": 1,
            "email": "terecal1@daum.net",
            "profileImage": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/8685e812-e10c-488a-63ee-6e085f67af00/public"

        }
    },
    {
        "id": 21,
        "task": "note 에 필요한 추가 기능",
        "status": "complete",
        "startTime": "2024-05-02T22:13:38.532Z",
        "completedAt": "2024-06-28T16:01:54.004Z",
        "deadline": null,
        "elapsedTime": "1361시간 48분",
        "manager": {
            "id": 1,
            "email": "terecal1@daum.net",
            "profileImage": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/8685e812-e10c-488a-63ee-6e085f67af00/public"
        }
    },
    {
        "id": 9,
        "task": "챌린지에서 고쳐야할것들",
        "status": "complete",
        "startTime": "2024-05-02T10:26:07.196Z",
        "completedAt": "2024-06-28T17:31:10.011Z",
        "deadline": "2024-03-29T09:00:00.000Z",
        "elapsedTime": "1373시간 35분",
        "manager": {
            "id": 1,
            "email": "terecal1@daum.net",
            "profileImage": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/8685e812-e10c-488a-63ee-6e085f67af00/public"
        }
    }
];

type UserCardProps = {
    user: IUser;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();

    const statusIcon = () => {
        switch (user.role) {
            case 'ninja':
                return <FaRunning />;
            case 'stressed':
                return <FaMeh />;
            case 'away':
                return <FaSmile />;
            case 'vacation':
                return <FaUmbrellaBeach />;
            default:
                return <FiUser />;
        }
    };

    const handleClipboardClick = () => {
        window.open(`/UserProfile/${user.id}`, '_blank');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <Image src={user.profileImage} alt={`${user.nickname} profile image`} borderRadius="full" boxSize="150px" mx="auto" mb="4" />
            <VStack spacing="2" align="start">
                <Text fontSize="xl" fontWeight="bold">{user.nickname}</Text>
                <Text>{user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Gender: {user.gender}</Text>
                <Text>Phone: {user.phoneNumber}</Text>
                <Text>Frontend Level: {user.frontEndLevel}</Text>
                <Text>Backend Level: {user.backEndLevel}</Text>
            </VStack>
            <HStack spacing="4" mt="4" justify="center">
                <Tooltip label="Task List" placement="top" hasArrow>
                    <IconButton
                        aria-label="Task"
                        icon={<FiClipboard />}
                        variant="outline"
                        colorScheme="teal"
                        onClick={handleClipboardClick}
                    />
                </Tooltip>
                <Tooltip label="Task History" placement="top" hasArrow>
                    {/* <IconButton aria-label="task history" icon={<IoMdTime />} variant="outline" colorScheme="teal" /> */}

                    <ModalButtonForTaskHistoryForUser user={user} />

                </Tooltip>
                <Tooltip label="Task Statics" placement="top" hasArrow>
                    {/* <IconButton aria-label="Timeline" icon={<MdOutlineTimeline />} variant="outline" colorScheme="teal" /> */}
                    <ModalButtonForUserTaskStatistics user={user} />
                </Tooltip>
                <Tooltip label="Chatting" placement="top" hasArrow>
                    <IconButton aria-label="Chat" icon={<IoChatbubblesOutline />} variant="outline" colorScheme="teal" />
                </Tooltip>
            </HStack>
            <HStack spacing="4" mt="4" justify="center">
                <Stack direction="row" align="center">
                    <IconButtonForShowUserTaskCondition />
                </Stack>
                <Stack direction="row" align="center">
                    <SwitchButtonForOnlineStatus />
                </Stack>
            </HStack>
        </Box>
    );
};

export default UserCard;