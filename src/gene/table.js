
// The gene page table logic.

import { connect } from 'react-redux'
import React from 'react'

import { Bubble } from 'gene/bubble'
import DataTable from 'components/DataTable'
import data from 'gene/data'
import { colorRef, getColor, maxBubbleDiameter, sizeRef, sizeToRadius }
    from 'gene/util'

const addColumnOptions = (names) => {
    // Create column options returning a list of column objects.
    const cols = names.map(name => {
        let col = { name }
        if (Object.keys(colorRef).includes(name)) {
            // The color_by column is not filterable nor searchable.
            col.name = colorRef[name].label
            col.options = {
                //display: 'excluded',
                filter: false,
                searchable: false,
            }
        } else if (Object.keys(sizeRef).includes(name)) {
            // The size_by column is not filterable nor searchable.
            col.name = sizeRef[name].label
            col.options = {
                filter: false,
                searchable: false,
            }
        } else if (name === '') {
            // Columns without a header label are not filterable, searchable
            // nor sortable.
            col.options = {
                //column: false,
                filter: false,
                searchable: false,
                sort: false,
            }
        }
        return col
    })
    return cols
}

const transform = (data, state) => {
    // Transform the data received from the server
    // into the structure needed for a dataTable.
    const colorNegMag = state['gene.colorNegMag']
    const colorPosMag = state['gene.colorPosMag']
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    let cData = data.cluster_solutions.map((solution, i) => {
        // Inner loop handles each cluster in the solution.
        let row = [solution.dataset_name, solution.cluster_solution_name]
        solution.clusters.forEach((c, j) => {
            row.push(
                <Bubble
                    cell_count={c.cell_count}
                    color={c.color}
                    color_by={data.color_by}
                    colorRgb={getColor(c.color, colorNegMag, colorPosMag)}
                    name={c.name}
                    radius={sizeToRadius(c.size)}
                    size={c.size}
                    size_by={data.size_by}
                />
            )
            maxClusterCount = Math.max(j + 1, maxClusterCount)
        })
        return row
    })
    
    // Build the column header.
    let header = [
        'Dataset',
        'Cluster Solution',
        //data.color_by,
        //data.size_by,
    ].concat(new Array(maxClusterCount).fill(''))
    
    return { data: cData, columns: header }
}

const optionOverrideFx = (options, matchesFound) => {
    // Override some standard DataTable options.
    //options.customToolbar = null
    options.elevation = 0
    return options
}

const mapStateToProps = (state) => {
    const transformed = transform(data, state)
    const columns = addColumnOptions(transformed.columns)
    return {
        columns,
        data: transformed.data,
        header: ' ',  // to force enough vertical space in the header
        optionOverrideFx,
        style: {
            cell: {
                borderBottom: 0,
                height: maxBubbleDiameter,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                verticalAlign: 'middle',
            },
            row: {
                height: maxBubbleDiameter,
                verticalAlign: 'middle',
            },
        },
        status: state['gene.fetchStatus'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Table = connect(
    mapStateToProps, mapDispatchToProps
)(DataTable)

export default Table
