
// Home page.

import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid/Grid";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography'

import czi from 'home/images/czi.png'
import datasets from 'home/images/datasets2.png'
import brackets from 'home/images/brackets.png'
import { About } from 'home/About'
import HomeAnalyze from 'home/HomeAnalyze'
import SearchBar from "search/SearchBar";

const imageTop = 70
const imageLeft = -50
const CziButton = () => {
    const imgStyle = {
        height: '34px',
        margin: '-15px',
    }
    const buttonStyle = {
        position: 'absolute',
        top: 160 + imageTop,
        left: 130 + imageLeft,
        backgroundColor: 'white',
    }
    const comp =
        <Button
            variant="extendedFab"
            aria-label="CZI"
            className='button'
            href='https://www.chanzuckerberg.com'
            target='_blank'
            style={buttonStyle}
        >
            <img
                src={czi}
                alt='CZI'
                style={imgStyle}
            />
        </Button>
 
    return comp
}
const YourData = () => {
    const style = {
        position: 'absolute',
        top: 240 + imageTop,
        left: 90 + imageLeft,
    }
    const comp =
        <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/upload'
            size='small'
            style={style}
        >
            Your Data
        </Button>

    return comp
}

const bigTitleLeft = 0 // 285
const bigTitleStyle = {
    marginLeft: bigTitleLeft,
}
const smallTitleStyle = {
   marginLeft: bigTitleLeft + 5,
}
const topTitleStyle = {
    ...smallTitleStyle,
}
const bottomTitleStyle = {
    ...smallTitleStyle,
    marginTop: -5
}
const datasetsStyle = {
    position: 'absolute',
    top: 135 + imageTop,
    left: 73 + imageLeft,
    height: 115,
}
const bracketsStyle = {
    position: 'absolute',
    top: 60 + imageTop,
    left: 200 + imageLeft,
    height: 300,
}
const pageBodyStyle = {
    paddingLeft: '4rem',
    paddingRight: '4rem',
    paddingBottom: '4rem',
}

const searchIconStyle = { marginTop: 10, float: 'right', height: '2rem', width: '2rem' }

const HomePres = ({redirect, onSearchSelect, onRedirect }) => {

    // If we are to be redirected to the search page, do that.
    if (redirect) {
        onRedirect()
        return (
            <Redirect to='/explore/search' />
        )
    }
    return (
        <div id='homePage' className='pageBody' style={pageBodyStyle}>
           <div style={{ position: 'relative' }}>
                <img
                    src={datasets}
                    alt='datasets'
                    style={datasetsStyle}
                />
                <img
                    src={brackets}
                    alt='brackets'
                    style={bracketsStyle}
                />
                <HomeAnalyze />
                <YourData />
            <CziButton />
            </div>
            <Grid container spacing={16}>
                <Grid item xs={5}>
                    <Typography variant='caption' style={topTitleStyle}>
                        the UC Santa Cruz, Genomics Institute, Stuart Lab
                    </Typography>
                    <Typography variant='display1' style={bigTitleStyle}>
                        CELL ATLAS
                    </Typography>
                    <Typography variant='caption' style={bottomTitleStyle}>
                        browser is...
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <SearchIcon
                        style={searchIconStyle}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SearchBar />
                </Grid>
            </Grid>
            <About />
        </div>
    )
}
export default HomePres
