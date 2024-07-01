import { apiForUncompletedTodoListForUserId } from "@/api/apiForTodos";
import { ResponseDataTypeForApiForGetTodoList } from "@/types/typeforTodos";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

interface IProps {
    pageNum: any,
    selectedUserId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

interface ResponseTypeForTodoList {
    isLoading: boolean,
    error: any,
    data: ResponseDataTypeForApiForGetTodoList
}

const useApiForGetUncompletedTodoListForUserId =
    ({ pageNum, selectedUserId, todoStatusOption }: IProps): ResponseTypeForTodoList => {

        const { isLoading, error, data } = useQuery({
            queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, todoStatusOption],
            queryFn: apiForUncompletedTodoListForUserId,
        });
        return { isLoading, error, data };
    };

export default useApiForGetUncompletedTodoListForUserId;
