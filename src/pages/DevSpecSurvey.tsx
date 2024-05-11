import React from 'react';
import { Box, Divider, Heading } from '@chakra-ui/react';
import useApiForGetAllDevSpecList from '@/hooks/useApiForGetAllDevSpecList';
import TableForSelectDevSpec2 from '@/components/Table/TableForSelectDevSpec2';
import useApiForGetAllFavoriteDevSpecsData from '@/hooks/useApiForGetAllFavoriteDevSpecsData';
import TableForFavoriteDevSpecList from '@/components/Table/TableForFavoriteDevSpecList';
import TableForSelectDevSpec3 from '@/components/Table/TableForSelectDevSpec3';

const DevSpecSurvey = () => {
  const { isLoading, error, data } = useApiForGetAllDevSpecList();
  const { isLoading: loadingForFavoriteDevSpec, error: errorForFavoriteDevSpec, data: dataForFavoriteDevSpec } = useApiForGetAllFavoriteDevSpecsData();

  console.log("dataForFavoriteDevSpec : ", dataForFavoriteDevSpec);

  if (isLoading || loadingForFavoriteDevSpec) {
    return <div>Loading...</div>;
  }

  if (error || errorForFavoriteDevSpec) {
    return <div>Error: {error?.message || errorForFavoriteDevSpec?.message}</div>;
  }

  return (
    <Box w="80%" mx="auto">
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Heading size={"lg"} mb={4}>Dev Spec Selection</Heading>
        {data && <TableForSelectDevSpec3 data={data} />}
      </Box>
      <br />
      <Divider my={2} />
      <Heading size={"lg"} mb={4}>My Favorite Skill Set</Heading>
      {dataForFavoriteDevSpec && <TableForFavoriteDevSpecList data={dataForFavoriteDevSpec} />}
    </Box>
  );
}

export default DevSpecSurvey;
