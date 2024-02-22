import React, { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps } from 'react-data-grid';
import useApiForGetAllUsersData from '@/hooks/useApiForGetAllUsersData';
import { IUser } from '@/types/typeForUserBoard';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import CommonTextEditor from '@/components/GridEditor/TextEditor/CommonTextEditor';
import CommonSelectBoxEdtior from '@/components/GridEditor/SelectBox/CommonSelectBoxEdtior';

type Props = {};

function getColumns(
  optionsForSelectRole: string[],
  optionsForSelectGender: string[],
  optionsForSelectLevel: number[]
) {
  return [
    SelectColumnForReactDataGrid,
    { key: 'id', name: 'ID' },
    { key: 'email', name: 'Email' },
    {
      key: 'nickname',
      name: 'Nickname',
      renderEditCell: CommonTextEditor,
    },
    {
      key: 'role',
      name: 'Role',
      renderEditCell: (props: {
        row: any;
        column: { key: keyof any };
        onRowChange: (updatedRow: any) => void;
        onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
      }) => (
        <CommonSelectBoxEdtior
          {...props}
          arrayForSelectOption={optionsForSelectRole}
        />
      )
    },
    {
      key: 'gender',
      name: 'Gender',
      renderEditCell: (props: {
        row: any;
        column: { key: keyof any };
        onRowChange: (updatedRow: any) => void;
        onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
      }) => (
        <CommonSelectBoxEdtior
          {...props}
          arrayForSelectOption={optionsForSelectGender}
        />
      )
    },
    {
      key: 'phoneNumber', name: 'Phone Number',
      renderEditCell: CommonTextEditor,
    },
    // optionsForSelectLevel
    {
      key: 'frontEndLevel',
      name: 'Frontend Level',
      renderEditCell: (props: {
        row: any;
        column: { key: keyof any };
        onRowChange: (updatedRow: any) => void;
        onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
      }) => (
        <CommonSelectBoxEdtior
          {...props}
          arrayForSelectOption={optionsForSelectLevel}
        />
      )
    },
    {
      key: 'backEndLevel',
      name: 'Backend Level',
      renderEditCell: (props: {
        row: any;
        column: { key: keyof any };
        onRowChange: (updatedRow: any) => void;
        onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
      }) => (
        <CommonSelectBoxEdtior
          {...props}
          arrayForSelectOption={optionsForSelectLevel}
        />
      )
    },
    { key: 'profileImage', name: 'Profile Image' },
  ]
}

const UserlistByDataGrid = (props: Props) => {
  const toast = useToast();

  const [userRows, setUserRows] = useState<IUser[]>([]);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
  const optionsForSelectRole = ["leader", "cto", "frontend", "backend", "fullstack", "tester"]
  const optionsForSelectGender = ["man", "woman"];
  const optionsForSelectLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const columns = getColumns(
    optionsForSelectRole,
    optionsForSelectGender,
    optionsForSelectLevel
  )

  const pageNum = 1;
  const { isPending, error, userList } = useApiForGetAllUsersData(pageNum);

  console.log("userList : ", userList);

  const handleSave = () => {
    const userRowsToSave = userRows?.filter(row => selectedRows.has(row.id)) || [];
    console.log('userRowsToSave : ', userRowsToSave);

  };

  const handleDelete = () => {
    // Handle delete logic here
    toast({
      title: 'Delete button clicked',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddRow = () => {
    // Handle add row logic here
    toast({
      title: 'Add Row button clicked',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };


  useEffect(() => {
    if (userList) {
      const mappedUserRows = userList.map((user: IUser) => ({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        frontEndLevel: user.frontEndLevel,
        backEndLevel: user.backEndLevel,
        profileImage: user.profileImage,
      }));
      setUserRows(mappedUserRows);
    }
  }, [userList]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Box width={'100%'} m={'auto'}>

      <Box display={"flex"} justifyContent={"flex-end"} m={2}>
        <Button onClick={handleSave} size="md" variant="outline" mr={2}>
          Save
        </Button>
        <Button onClick={handleDelete} size="md" variant="outline" mr={2}>
          Delete
        </Button>
        <Button onClick={handleAddRow} size="md" variant="outline">
          Add Row
        </Button>
      </Box>

      {userRows.length > 0 ? (
        <DataGrid
          columns={columns}
          rows={userRows}
          onRowsChange={setUserRows}
          rowKeyGetter={(row) => row.id}
          renderers={{ renderCheckbox }}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}

        />
      ) : (
        <div>No data available</div>
      )}
    </Box>
  );
};

function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }
  return <input type="checkbox" {...props} onChange={handleChange} />;
}

export default UserlistByDataGrid;
