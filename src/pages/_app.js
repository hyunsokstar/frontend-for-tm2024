import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import HeaderMenus from "../components/HeaderMenus"
import store from "../store/index"

const queryClient = new QueryClient();

function UserBoard({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <Provider store={store}>
                    <HeaderMenus />
                    <Container maxW="container.lg" border="0px solid orange" minWidth={"100%"}>
                        <Component {...pageProps} />
                    </Container>
                    <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
                </Provider>
            </ChakraProvider>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default UserBoard;