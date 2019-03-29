
// Gene page state.

const state = {
    // Fetch status.
    'gene.expanded': (state = false, action) => {
        switch(action.type) {
        case 'gene.expanded.toggle':
            return !state
        default:
            return state
        }
    },
    'gene.color_by': (state = 'log2_change_vs_next', action) => {
        switch(action.type) {
        case 'gene.color_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.fetchMessage': (state = ' ', action) => {
        switch(action.type) {
        case 'gene.fetchMessage.set':
            //console.trace('### set to ' + action.value)
            return action.value
        case 'gene.fetchMessage.clear':
            //console.trace('### cleared')
            return null
        default:
            return state
        }
    },
    'gene.fetchStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'gene.fetchStatus.request':
            return 'request'
        case 'gene.fetchStatus.waiting':
            return 'waiting'
        case 'gene.fetchStatus.quiet':
            return 'quiet'
        default:
            return state
        }
    },
    'gene.name.errorMessage': (state = null, action) => {
        switch(action.type) {
        case 'gene.name.errorMessage.set':
            return action.value
        case 'gene.name.errorMessage.clear':
            return null
        default:
            return state
        }
    },
    'gene.name': (state = 'Tlr11', action) => {
        switch(action.type) {
        case 'gene.name.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.size_by': (state = 'sensitivity', action) => {
        switch(action.type) {
        case 'gene.size_by.uiSet':
            return action.value
        default:
            return state
        }
    },
};

export default state