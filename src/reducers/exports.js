export function exportsHasErrored(state = false, action) {
    switch (action.type) {
        case 'EXPORTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function exportsIsLoading(state = false, action) {
    switch (action.type) {
        case 'EXPORTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function exports(state = [], action) {
    switch (action.type) {
        case 'EXPORTS_GET_DATA_SUCCESS':
            return action.exports;

        default:
            return state;
    }
}
