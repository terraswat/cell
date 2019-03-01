// Dataset page state.

const defaultTableOrder = { property: 'species', direction: 'asc' }

const datasetState = {
    'dataset.table': (state = { order: defaultTableOrder, data: [] },
        action) => {
        switch(action.type) {
        case 'dataset.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'dataset.table.uiSetOrder':
            return { ...state, order: action.order }
        default:
            return state
        }
    },
    'dataset.tableHead': (state = [], action) => {
        if (action.type === 'dataset.tableHead.load') {
            return action.value
        } else {
            return state
        }
    },
    // Fetch status for the table.
    // Valid stati: quiet, requesting, renderReady
    'dataset.tableStatus': (state = 'quiet', action) => {
        if (action.type === 'database.tableStatus.set') {
            return action.value
        } else {
            return state
        }
    },
};

export default datasetState
