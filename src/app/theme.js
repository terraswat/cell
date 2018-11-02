
// Theme and default theme overrides.

import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';

const themeData = createMuiTheme({

    // Values of the material-ui default theme are in comments.
    palette: {
        primary: indigo,
        secondary: {
            main: '#03a9f4',
        },
    },
    typography: {
       fontFamily: [
           "Myriad Set Pro",
           "Helvetica Neue",
           "Helvetica",
           "Arial",
           "Verdana",
           "sans-serif"
           /*'Open Sans',
           '-apple-system',
           'BlinkMacSystemFont',
           'Segoe UI',
           'Roboto',
           'Helvetica Neue',
           'Arial',
           'sans-serif',*/
         ].join(','), // "Roboto", "Helvetica", "Arial", "sans-serif"
        fontSize: '16', // 14
    },
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: 'transparent',
            },
        },
        MuiExpansionPanelSummary: {
            content: {
                marginBottom: '-0.2rem',
                marginTop: '0rem',
            },        },
        MuiExpansionPanelDetails: {
            root: {
                paddingBottom: '0.3rem',
                paddingTop: '0.1rem',
            },
        },
        MuiInput: {
            input: {
                fontSize: '1rem',
            },
        },

        MuiListItem: {
            root: {
                paddingTop: '0.3rem',
                paddingBottom: '0.3rem',
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: '1rem',
                lineHeight: '1rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
            },
        },
        MuiTableRow: {
            root: {
                height: '3rem', // 56px
                verticalAlign: 'top',
            },
            head: {
                height: '2rem', // 48px
            },
        },
        MuiTableCell: {
            root: {
                paddingTop: '1rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                paddingBottom: '0px',
            },
            head: {
                paddingBottom: '1rem',
            },
        },
        MuiButton: {
            sizeSmall: {
                fontSize: '0.8rem',
            },
        },
    },
});

export default themeData
