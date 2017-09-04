import axios from 'axios';

export function exportsHasErrored(bool, error) {
    return {
        type: 'EXPORTS_HAS_ERRORED',
        hasErrored: bool,
        error
    };
}

export function exportsIsLoading(bool) {
    return {
        type: 'EXPORTS_IS_LOADING',
        isLoading: bool
    };
}

export function exportsGetDataSuccess(exports) {
    return {
        type: 'EXPORTS_GET_DATA_SUCCESS',
        exports
    };
}


export function exportsGetData(url) {
    return (dispatch) => {
        dispatch(exportsIsLoading(true));
        axios.get(url)
            .then((response) => {
                dispatch(exportsIsLoading(false));
                return response.data;
            })
            // .then((response) => response.json())
            .then((exports) => dispatch(exportsGetDataSuccess(exports)))
            .catch((error) => dispatch(exportsHasErrored(true, error.message)));
    };
}

export function exportsPostData(url, dkpExport) {
  return (dispatch) => {
    axios.post(url, dkpExport)
      .catch(err => {
        console.log(err);
      });
  }
}
