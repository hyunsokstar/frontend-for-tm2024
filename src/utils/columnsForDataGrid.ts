

// function getColumns(
//     optionsForSelectRole: string[],
//     optionsForSelectGender: string[],
//     optionsForSelectLevel: number[],
//     loginUser: any,
//     pageNum: any
// ) {
//     return [
//         SelectColumnForReactDataGrid,
//         { key: 'id', name: 'ID' },
//         { key: 'email', name: 'Email' },
//         {
//             key: 'nickname',
//             name: 'Nickname',
//             renderEditCell: CommonTextEditor,
//         },
//         {
//             key: 'role',
//             name: 'Role',
//             renderEditCell: (props: {
//                 row: any;
//                 column: { key: keyof any };
//                 onRowChange: (updatedRow: any) => void;
//                 onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
//             }) => (
//                 <CommonSelectBoxEdtior
//           { ...props }
//           arrayForSelectOption={ optionsForSelectRole }
//             />
//       )
//         },
//         {
//             key: 'gender',
//             name: 'Gender',
//             renderEditCell: (props: {
//                 row: any;
//                 column: { key: keyof any };
//                 onRowChange: (updatedRow: any) => void;
//                 onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
//             }) => (
//                 <CommonSelectBoxEdtior
//           { ...props }
//           arrayForSelectOption={ optionsForSelectGender }
//             />
//       )
//         },
//         {
//             key: 'phoneNumber', name: 'Phone Number',
//             renderEditCell: CommonTextEditor,
//         },
//         // optionsForSelectLevel
//         {
//             key: 'frontEndLevel',
//             name: 'Frontend Level',
//             renderEditCell: (props: {
//                 row: any;
//                 column: { key: keyof any };
//                 onRowChange: (updatedRow: any) => void;
//                 onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
//             }) => (
//                 <CommonSelectBoxEdtior
//           { ...props }
//           arrayForSelectOption={ optionsForSelectLevel }
//             />
//       )
//         },
//         {
//             key: 'backEndLevel',
//             name: 'Backend Level',
//             renderEditCell: (props: {
//                 row: any;
//                 column: { key: keyof any };
//                 onRowChange: (updatedRow: any) => void;
//                 onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
//             }) => (
//                 <CommonSelectBoxEdtior
//           { ...props }
//           arrayForSelectOption={ optionsForSelectLevel }
//             />
//       )
//         },
//         {
//             key: 'profileImage',
//             name: 'Profile Image',
//             renderCell(props: any) {
//                 return (
//                     <Box display= { "flex"} justifyContent = { "space-between"} alignItems = { "center"} gap = { 2} height = { "100%"} border = { "1px dotted green"} >
//                         <Avatar src={ props.row.profileImage } />
//                 {
//                     loginUser.email === props.row.email ?
//                     <ModalButtonForProfileImageUpload
//                 buttonText={ 'update' }
//                     userEmail = { props.row.email }
//                     pageNum = { pageNum }
//                         />
//               : ""
//                 }
//                 </Box>
//         )
//             },
//         },
//     ]
// }