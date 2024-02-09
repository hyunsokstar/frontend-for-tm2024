import { apiForGetAllTodoList } from "@/api/apiForTodos";
import { ITypeForToDosList } from "@/types/typeforTodos";
import { useQuery } from "@tanstack/react-query";


const useGetAllTodos = (pageNum: number) => {
    // console.log("pageNum at api : ", pageNum);

    const { isLoading, error, data: dataForTodos } = useQuery<ITypeForToDosList>({
        queryKey: ['apiForGetAllTodoList', pageNum],
        queryFn: apiForGetAllTodoList,
    });


    return { isLoading, error, dataForTodos };

};

export default useGetAllTodos;
