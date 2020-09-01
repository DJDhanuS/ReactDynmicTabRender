import {actions as toastrActions} from 'react-redux-toastr';


const toastrOptions = {
    timeOut: 3000, // by setting to 0 it will prevent the auto close
    onShowComplete: () => {},
    onHideComplete: () => {},
    onCloseButtonClick: () => {},
    showCloseButton: true
};

export function showErrorToast(dispatch, errorMessage) {
    toastrActions.clean();
    dispatch(toastrActions.add({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        options: toastrOptions
    }));
}

export function showWarningToast(dispatch, title, warningMessage) {
    toastrActions.clean();
    dispatch(toastrActions.add({
        type: 'warning',
        title: title,
        message: warningMessage,
        options: toastrOptions
    }));
}

export function showSuccessToast(dispatch, title, successMessage) {
    toastrActions.clean();
    dispatch(toastrActions.add({
        type: 'success',
        title: title,
        message: successMessage,
        options: toastrOptions
    }));
}
