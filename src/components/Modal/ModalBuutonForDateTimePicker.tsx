import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import DateTimePicker from 'react-datetime-picker';
import { useRowSelection } from 'react-data-grid';

interface ModalButtonForDateTimePickerProps {
    modalText: string;
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: any;
}

const ModalButtonForDateTimePicker: React.FC<ModalButtonForDateTimePickerProps>
    = ({ modalText, row, column, onRowChange, onClose: onCloseEditor }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isRowSelected, onRowSelectionChange] = useRowSelection();
        const [selectedDate, setSelectedDate] = useState<Date>(row[column.key]);

        const onClose = () => {
            setIsOpen(false);
        };


        const onChangeHandler = (date: any) => {
            console.log("date for onchange : ", date);
            // onRowChange({ ...row, [column.key]: date })
            setSelectedDate(date)
        }

        const submitHandler = () => {
            onRowChange({ ...row, [column.key]: selectedDate })
            onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
            onClose();
        }

        const openModal = () => {
            setIsOpen(true);
        };

        return (
            <>
                <Button onClick={openModal} h='1.5rem' size='sm' variant={"outlined"} border={"1px solid blue"}>{modalText}</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{modalText}</ModalHeader>
                        <ModalBody>
                            <DateTimePicker onChange={onChangeHandler} value={selectedDate} />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={submitHandler}>Submit</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };

export default ModalButtonForDateTimePicker;
