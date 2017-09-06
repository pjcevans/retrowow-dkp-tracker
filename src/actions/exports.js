import axios from 'axios';

export function exportsHasErrored(bool, error) {
    return {
        type: 'EXPORTS_HAS_ERRORED',
        hasErrored: bool,
        error
    };
}

export function uploadsHasErrored(bool) {
    return {
        type: 'UPLOADS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function uploadsHasSucceeded(bool) {
    return {
        type: 'UPLOADS_HAS_SUCCEEDED',
        hasSucceeded: bool
    };
}

export function uploadsClearSucceeded(bool) {
    return {
        type: 'UPLOADS_CLEAR_SUCCEEDED',
        hasSucceeded: bool
    };
}

export function uploadsClearErrored(bool) {
    return {
        type: 'UPLOADS_CLEAR_ERRORED',
        hasErrored: bool
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
            .then((exports) => dispatch(exportsGetDataSuccess(exports)))
            .catch((error) => dispatch(exportsHasErrored(true)));
    };
}

export function exportsPostData(url, dkpExport) {
  return (dispatch) => {
    axios.post(url, dkpExport)
      .then(response => {
        console.log(response)
        dispatch(uploadsHasSucceeded(true))
      })
      .catch(err => {
        console.error(err);
        dispatch(uploadsHasErrored(true))
      });
  }
}

export function addGraphMember(member) {
    return {
        type: 'ADD_GRAPH_MEMBER',
        member
    };
}

export function removeGraphMember(member) {
    return {
        type: 'REMOVE_GRAPH_MEMBER',
        member
    };
}

export function toggleGraphAverage(bool) {
    return {
        type: 'TOGGLE_GRAPH_AVERAGE',
        bool
    };
}

export function selectGraphType(graphType) {
    return {
        type: 'SELECT_GRAPH_TYPE',
        graphType
    };
}
