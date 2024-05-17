import { useQuery } from "@tanstack/react-query";
import { findAllDevRelays } from "@/api/apiForDevRelay";
import { DevAssignmentRow } from "@/types/typeForDevRelay";

const useApiForFindAllDevAssignments = () => {
    const { isLoading, error, data } = useQuery<DevAssignmentRow[]>({
        queryKey: ['apiForGetFindAllDevRelays'],
        queryFn: findAllDevRelays
    });

    return { isLoading, error, data };
};

export default useApiForFindAllDevAssignments;