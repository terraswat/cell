
// Cell type sheet page state.

const defaultColormap = []
const defaultData = {
    barColors: [],
    cellTypes: [],
    clusters: [],
    colors: [],
    genes: [],
    sizes: [],
}
const defaultDims = {
    bubblesHeight: 0,
    bubblesWidth: 0,
    cellTypeHeight: 80,
    cellTypeLength: 80,
    cellTypes: [],
    colWidth: 14,
    fontSize: 11,
    geneWidth: 100,
    labelFontSize: 16,
    legendWidth: 100,
    rowHeight: 14,
}
export const defaultSheetList = [
    { value:'heart of cells #1', name: 'heart of cells #1' },
    { value:'#2', name: '#2' },
]
const defaultSheetSelected = defaultSheetList[0].value

const State = (
    state = {
        colormap: defaultColormap,
        data: defaultData,
        dims: defaultDims,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: true,
        showChart: false,
        showSave: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.colormap.default':
            return {
                ...state,
                colormap: defaultColormap
            }
        case 'cellTypeWork.colormap.create':
            return {
                ...state,
                colormap: action.value
            }
        case 'cellTypeWork.data.default':
            return {
                ...state,
                data: defaultData
            }
        case 'cellTypeWork.data.load':
            return {
                ...state,
                data: action.value
            }
        case 'cellTypeWork.data.cellTypeReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    cellTypes: [...action.value]
                }
            }
        case 'cellTypeWork.data.clusterReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    clusters: [...action.value]
                }
            }
        case 'cellTypeWork.dims.default':
            return {
                ...state,
                dims: defaultDims
            }
        case 'cellTypeWork.dims.set':
            return {
                ...state,
                dims: action.value
            }
        case 'cellTypeWork.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeWork.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeWork.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeWork.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeWork.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
            }
        case 'cellTypeWork.data.geneReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    genes: [...action.value]
                }
            }
        case 'cellTypeWork.sheetList.load':
            return {
                ...state,
                sheetList: action.value
            }
        case 'cellTypeWork.sheetSelected.loadPersist':
        case 'cellTypeWork.sheetSelected.uiSelect':
            return {
                ...state,
                sheetSelected: action.value
            }
        case 'cellTypeWork.showChart.loading':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeWork.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'cellTypeWork.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeWork.showSave.hide':
            return {
                ...state,
                showSave: false
            }
        case 'cellTypeWork.showSave.show':
            return {
                ...state,
                showSave: true
            }
        case 'cellTypeWork.tableColumn.load':
            return {
                ...state,
                tableColumn: action.value
            }
        case 'cellTypeWork.tableData.load':
            return {
                ...state,
                tableData: action.data
            }
        default:
            return state
        }
    }

export default State
