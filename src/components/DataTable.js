
// Presentational component for a dataTable.

import PropTypes from 'prop-types';
import React from 'react'

import Typography from "@material-ui/core/Typography/Typography";
import MUIDataTable from 'lib/MUIDataTable/MUIDataTable'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { integerToCommaInteger } from 'app/util'

const Header = ({ header }) => {
    const headerStyle = {
        position: 'relative',
        top: '-2rem',
        left: '-22rem',
    }
    return (
        <Typography variant='body2' style={headerStyle}>
            {header}
        </Typography>
    )
}

const onCellClick = (link) => {
    // Open any link in a new tab.
    if (typeof link === 'string' && link.slice(0,4).toLowerCase() === 'http') {
        window.open(link)
    }
}

const setCellPropsFx = (value) => {
    // Make anything starting with 'http' look like a link.
    if (typeof value === 'string' && value.slice(0,4).toLowerCase() === 'http') {
        return { style: {
            textDecoration: 'underline',
            cursor: 'pointer',
            wordBreak: 'break-all',
            '&:hover': {
                color: 'blue' // doesn't work for some reason
            }
        }}
    }
    return {}
}

const formatHttpColumns = (columns) => {
    // If the columns don't have a setCellProps function defined, then define it
    // to make http links look like http links. Set it for all columns so we
    // don't have to identify those columns that have http links.
    return columns.map(col => {
        let colObj = col
        if (typeof col === 'string') {
            // Convert this name to an object.
            colObj = { name: col, options: { setCellProps: setCellPropsFx } }
        } else if (col.options === undefined) {
            colObj.options = {setCellProps: setCellPropsFx}
        } else if (col.options.setcellProps === undefined) {
            colObj.options.setCellProps = setCellPropsFx
        }
        return colObj
    })
}

const buildOptions = (data, header, optionOverrideFx) => {
    let options = {
        customToolbar: () => {
            return (
                <Header header={header} />
            )
        },
        downloadOptions: {
            filename: 'stuartCellAtlas.tsv',
            separator: '\t',
            quotes: false,
        },
        filterType: 'multiselect',
        print: false,
        responsive: 'scroll',
        rowsPerPage: 50,
        rowsPerPageOptions: [25, 50, 100],
        selectableRows: false,
        textLabels: {
            toolbar: {
                downloadCsv: 'Download TSV',
                filterTable: 'Filters',
                viewColumns: 'Columns',
            },
        },
        onCellClick: onCellClick,
    }
    if (optionOverrideFx) {
        options = optionOverrideFx(options, integerToCommaInteger(data.length))
    }
    return options
}

const Table = ({ header, props }) => {
    const { title, columns, data, optionOverrideFx } = props
    const columnObjs = formatHttpColumns(columns)
    let comp =
        <MUIDataTable
            title={title}
            columns={columnObjs}
            data={data}
            options={ buildOptions(data, header, optionOverrideFx) }
        />
    return comp
}

const WithTheme = ({ header, props }) => {
    const { themeOverrides } = props
    const getMuiTheme = () => createMuiTheme(themeOverrides)
    
    let comp =
        <MuiThemeProvider theme={getMuiTheme()}>
            <Table
                header={header}
                props={props}
            />
        </MuiThemeProvider>
    return comp
}

const DataTable = (props) => {
    const { data, header, message, show, themeOverrides } = props
    // If we should not show, then don't.
    if (!show) {
        return null
    }

    // If there is a message, render it rather than the data.
    if (message) {
        return (
            <Typography>
                {message}
            </Typography>
        )
    }
        
    // If there is data, render the table.
    if (data.length > 0) {
 
        if (themeOverrides) {
            // Render the table with the additional styling.
            return (
                <WithTheme
                    header={header}
                    props={props}
                />
            )
        } else {
            // Render the table without any additional styling.
            return (
                <div style={{position: 'relative'}}>
                    <Table
                        header={header}
                        props={props}
                    />
                </div>
            )

        }
    }
    // Otherwise render nothing.
    return null
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired, // column information
    data: PropTypes.array.isRequired, // the data

    header: PropTypes.string, // displays in middle of header
    message: PropTypes.string, // message to display rather than table
    optionOverrideFx: PropTypes.func, // function to override standard options
    show: PropTypes.bool, // show or don't show the table
    themeOverrides: PropTypes.object, // styling to override existing theme
    title: PropTypes.string, // main title string at the top
}
DataTable.defaultProps = {
    show: true,
};

export default DataTable
