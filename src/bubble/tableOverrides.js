
// Global dataTable option and theme overrides.

import { maxDiameter } from 'bubble/util'

/*
const pad = '0.5rem'
const firstCols = {
    minWidth: 'auto',
    maxWidth: '5rem',
    paddingRight: pad,
}
*/
/*
const wideCell = {
    minWidth: '5rem',
    paddingRight: '0.5rem',
}

const narrowCell = {
    paddingRight: '0.5rem',
    //maxWidth: '30px',
}
*/
const bubbleThemeOverrides = () => {
    const style = {
        cell: {
            width: '0.5rem',
            padding: 0,
            /*
            '&:nth-child(2)': wideCell,
            '&:nth-child(4)': wideCell,
            '&:nth-child(6)': narrowCell,
            '&:nth-child(8)': narrowCell,
            */
            /*
            '&:nth-child(1)': firstCols,
            '&:nth-child(2)': {
                minWidth: 'auto',
                maxWidth: '2rem',
                paddingRight: pad,
            },
            '&:nth-child(3)': firstCols,
            */
        },
        row: {
            height: maxDiameter,
        },
    }
    let theme = {
        overrides: {
            MUIDataTableBodyCell: {
                root: {...style.cell, borderBottom: 0 },
            },
            MUIDataTableBodyRow: {
                root: style.row,
            },
            MUIDataTableHeadCell: {
                root: style.cell,
            },
            MUIDataTableHeadRow: {
                root: style.row,
            },
            MUIDataTable: {
                responsiveScroll: {
                    maxHeight: 'none',
                },
            },
            MuiPaper: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
            MuiToolbar: {
                gutters: {
                    paddingLeft: 300,
                },
            },
        }
    }
    return theme
}

const bubbleOptionOverrideFx = (options) => {
    // Override some standard DataTable options.
    options.elevation = 0
    options.download = false
    options.viewColumns = false
    return options
}

export { bubbleOptionOverrideFx, bubbleThemeOverrides }
