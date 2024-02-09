import React, { useState } from "react";

import dynamic from 'next/dynamic'
const ContainerForUserBoard = dynamic(() => import('../components/ContainerForUserBoard'), { ssr: false })

const Users = () => {


    return (
        <>
            {/* hi */}
            <ContainerForUserBoard />
        </>
    );
};

export default Users;


