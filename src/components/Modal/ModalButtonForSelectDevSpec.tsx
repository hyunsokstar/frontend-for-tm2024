import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import TableForSelectDevSpec from '../Table/TableForSelectDevSpec'

const selectOptionForDevSpec =
{
    "backend": [
        "Spring Boot",
        "Nest.js",
        "FastApi",
        "LaLabel",
        "ASP.NET",
        "Gin"
    ],
    "frontend": [
        "Next Js (front)",
        "Next Js (full stack)",
        "Nuxt js",
        "SvelteKit",
        "Thymeleaf",
        "Angular Js"
    ],
    "orm": [
        "Jpa",
        "TypeOrm",
        "Prisma",
        "Sequelize",
        "Drizzle",
        "Mongoose"
    ],
    "css": [
        "Sass",
        "Tailwind CSS",
        "Shaden Ul",
        "Chakra-ui",
        "Material Ul",
        "BootStrap"
    ]
}

const ModalButtonForSelectDevSpec = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button size="sm" onClick={onOpen} variant="outline">
                Open Modal
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select a Developer Spec</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Add your content here */}
                        <TableForSelectDevSpec
                            data={{
                                language: [],
                                backend: [],
                                frontend: [],
                                orm: [],
                                css: []
                            }} />
                    </ModalBody>

                    <ModalFooter>
                        <Button size="sm" colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button size="sm" variant="outline" onClick={onClose}>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalButtonForSelectDevSpec
