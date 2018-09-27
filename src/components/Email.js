
// An input text field for capturing the user's email addr.
 
import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'

const EmailPres = ({user, onChange}) => {
    return (
        <TextField
            label='Email address'
            style={{ width: '100%' }}
            defaultValue={user}
            onChange={onChange}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state['user.email'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            dispatch({
                type: 'user.email.login',
                user: ev.target.value,
            })
        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const Email = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailPres)

export default Email