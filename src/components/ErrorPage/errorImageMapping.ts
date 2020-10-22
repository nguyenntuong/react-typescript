import * as image from 'assets/images';
const ERROR_CODE_MAPPING_MEM: {
    [errorCode: string]: {
        image?: string;
        title: string;
        message: string;
    };
} = {
    404: {
        image: image._404NotFound,
        title: '404 Page Not Found',
        message: 'The requested page could not be found but may be available again in the future',
    },
};
export const ERROR_CODE_MAPPING: (
    errorCode?: string | number,
    errorTitle?: string,
    errorMessage?: string,
) => {
    image?: string;
    title: string;
    message: string;
} = (errorCode?: string | number, errorTitle?: string, errorMessage?: string) => {
    let temp = errorCode ? ERROR_CODE_MAPPING_MEM[errorCode] : null;
    if (!temp) {
        temp = {
            image: image.genericError,
            title: '---',
            message: 'Internal Server Error or Network Issue',
        };
    }
    temp.title = errorTitle ?? temp.title;
    temp.message = errorMessage ?? temp.message;
    return temp;
};
