import { apiForUncompletedTodoListForUserId } from "@/api/apiForTodos";
import { ResponseDataTypeForApiForGetTodoList } from "@/types/typeforTodos";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

interface ResponseTypeForTodoList {
    isLoading: boolean,
    error: any,
    data: ResponseDataTypeForApiForGetTodoList
}

const useApiForGetUncompletedTodoListForUserId =
    ({ pageNum, userId, todoStatusOption }: IProps): ResponseTypeForTodoList => {

        console.log("pageNum : ?????", typeof pageNum, pageNum);
        console.log("userId : ?????", typeof userId, userId);
        console.log("todoStatusOption : ?????", typeof todoStatusOption, todoStatusOption);

        const { isLoading, error, data } = useQuery({
            queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption],
            queryFn: apiForUncompletedTodoListForUserId,
        });
        return { isLoading, error, data };
    };

export default useApiForGetUncompletedTodoListForUserId;
