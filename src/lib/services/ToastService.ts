import { Id, toast } from "react-toastify";
    export const standardErrorMessage = 'Er is iets fout gegaan, probeer het later opnieuw!';

    export const updateToast = (
        id: Id,
        message: string,
        type: 'info' | 'warning' | 'error' | 'default' | 'success',
        autoclose:boolean = true)  => {

        toast.update(id, { render: message, type: type, isLoading: false , closeButton: true, autoClose: (autoclose ? 2000 : 0)});
    }

    export const updateErrorToast = (id: Id, message: string=standardErrorMessage, autoclose: boolean = true) => {
        updateToast(id, message, 'error', autoclose);
    }



