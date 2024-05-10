// import TableForSelectDevSpec from '@/components/Table/TableForSelectDevSpec'
// import { Box, Button, Divider, Heading } from '@chakra-ui/react'


// const selectOptionForDevSpec =
// {
//   "language": [
//     "Java",
//     "Java Script",
//     "Type Script",
//     "Go",
//     "Rust",
//     "Python"
//   ],

//   "backend": [
//     "Spring Boot",
//     "Nest.js",
//     "FastApi",
//     "LaLabel",
//     "ASP.NET",
//     "Gin"
//   ],
//   "frontend": [
//     "Next Js (front)",
//     "Next Js (full stack)",
//     "Nuxt js",
//     "SvelteKit",
//     "Thymeleaf",
//     "Angular Js"
//   ],
//   "orm": [
//     "Jpa",
//     "TypeOrm",
//     "Prisma",
//     "Sequelize",
//     "Drizzle",
//     "Mongoose"
//   ],
//   "css": [
//     "Sass",
//     "Tailwind CSS",
//     "Shaden Ul",
//     "Chakra-ui",
//     "Material Ul",
//     "BootStrap"
//   ],

// }

// const DevSpecSurvey = () => {
//   return (
//     <Box w="80%" mx="auto" p={2}>
//       <Heading size={"lg"} mb={4}>Dev Spec Survey</Heading>
//       <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} px={2}>
//         <TableForSelectDevSpec data={selectOptionForDevSpec} />
//       </Box>
//       <br />
//       <hr />

//       <h2>
//         My Favorite Skil Set
//       </h2>


//     </Box>
//   )
// }

// export default DevSpecSurvey

import React from 'react'
import ModalButtonForSelectDevSpec from '@/components/Modal/ModalButtonForSelectDevSpec'
import TableForSelectDevSpec from '@/components/Table/TableForSelectDevSpec'
import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import useApiForGetAllDevSpecList from '@/hooks/useApiForGetAllDevSpecList'
import TableForSelectDevSpec2 from '@/components/Table/TableForSelectDevSpec2'

const DevSpecSurvey = () => {
  const { isLoading, error, data } = useApiForGetAllDevSpecList()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Box w="80%" mx="auto" p={2}>
      <Heading size={"lg"} mb={4}>Dev Spec Survey</Heading>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} px={2}>
        {/* <TableForSelectDevSpec data={data ? data : []} /> */}
        {/* <TableForSelectDevSpec2 /> */}
        <TableForSelectDevSpec2 data={data} />

      </Box>
      <br />
      <hr />

      <h2>
        My Favorite Skil Set
      </h2>

      {/* <ModalButtonForSelectDevSpec /> */}

    </Box>
  )
}

export default DevSpecSurvey
