// Cell type worksheet page presentational component.

import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import BubbleTooltip from 'bubble/tooltip'
import SheetList from 'cellTypeWork/sheetList'
import Worksheet from 'cellTypeWork/worksheet'
import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/ctgMain'

const buttonStyle = {
    width: '100%',
    marginTop: '1rem',
}

const Upload = ({ onClick} ) => {
    return (
        <Button
            disabled
            variant='contained'
            component='span'
            size='small'
            color='primary'
            onClick={onClick}
            style={buttonStyle}
        >
            Upload Data
        </Button>
    )
}

const Save = ({ label, show, disabled, onClick }) => {
    if (!show) {
        return null
    }
    return (
        <Button
            variant='contained'
            component='span'
            size='small'
            disabled={disabled}
            onClick={onClick}
            style={buttonStyle}
        >
            {label}
        </Button>
    )
}

const Dataset = ({ show, dataset }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Dataset: {<b>{dataset}</b>}
        </Typography>
    )
}

const ClusterSolution = ({ show, solution }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Cluster Solution: {<b>{solution}</b>}
        </Typography>
    )
}

const Buttons = (props) => {
    const { sheetOwnedByUser, show, onSaveAsClick, onSaveClick, onUploadClick }
        = props
    return (
        <div style={{marginLeft: '1rem'}} >
            <Upload onClick={onUploadClick} />
            <Save
                label='Save'
                show={show}
                disabled = {!sheetOwnedByUser}
                onClick={onSaveClick}
            />
            <Save
                label='Save as'
                show={show}
                onClick={onSaveAsClick}
            />
        </div>
    )
}

const Left = ({ props }) => {
    const { clusterSolution, dataset, sheetOwnedByUser, showEditables,
        onSaveAsClick, onSaveClick, onUploadClick } = props
    return (
        <Grid container spacing={8}>
            <Grid item xs={8} style={{width: '70%'}} >
                <SheetList />
                <Dataset dataset={dataset} show={showEditables} />
                <ClusterSolution solution={clusterSolution} show={showEditables} />
            </Grid>
            <Grid item xs={4}>
                <Buttons
                    sheetOwnedByUser={sheetOwnedByUser}
                    show={showEditables}
                    onSaveAsClick={onSaveAsClick}
                    onSaveClick={onSaveClick}
                    onUploadClick={onUploadClick}
                />
            </Grid>

            <Grid item xs={12}>
                <ScatterPlot show={showEditables} />
            </Grid>
        </Grid>
    )
}

const Presentation = (props) => {
    const { bubbleTooltip } = props
    return (
        <div style={{position: 'relative'}}>
            <Grid container spacing={16} style={{background: 'transparent'}}>
            
                <Grid item xs={5}>
                    <Left props={props} />
                </Grid>
                <Grid item xs={7}>
                    <Worksheet />
                </Grid>

                <Grid item xs={12}>
                    <GeneTable/>
                </Grid>
            </Grid>
            <BubbleTooltip data={bubbleTooltip} id='cellTypeWork' />
        </div>
    )
}

export default Presentation
