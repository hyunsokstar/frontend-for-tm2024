import { apiForUncompletedTodoList, apiForUncompletedTodoListForUserId } from "@/api/apiForTodos";
import { ResponseDataTypeForApiForGetTodoList } from "@/types/typeforTodos";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

interface IProps {
    pageNum: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

interface ResponseTypeForTodoList {
    isLoading: boolean,
    error: any,
    data: ResponseDataTypeForApiForGetTodoList
}

const useApiForGetUncompletedTodoList =
    ({ pageNum, todoStatusOption }: IProps): ResponseTypeForTodoList => {

        // console.log("userId : ?????", typeof userId, userId);

        const { isLoading, error, data } = useQuery({
            queryKey: ['uncompletedTodoList', pageNum, todoStatusOption],
            queryFn: apiForUncompletedTodoList,
        });
        return { isLoading, error, data };
    };

export default useApiForGetUncompletedTodoList;
