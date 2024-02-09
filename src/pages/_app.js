// src\pages\_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from "@chakra-ui/react";
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
                    <Component {...pageProps} />
                </Provider>
            </ChakraProvider>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default UserBoard;