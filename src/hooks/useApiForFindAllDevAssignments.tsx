import { useQuery } from "@tanstack/react-query";
import { findAllDevRelays } from "@/api/apiForDevRelay";
import { DevRelayResponse } from "@/types/typeForDevRelay";

const useApiForFindAllDevAssignments = () => {
    const { isLoading, error, data } = useQuery<DevRelayResponse[]>({
        queryKey: ['apiForGetFindAllDevRelays'],
        queryFn: findAllDevRelays
    });

    return { isLoading, error, data };
};

export default useApiForFindAllDevAssignments;