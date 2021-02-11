import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function Admin() {

    const [Logins, setLogins] = React.useState([]);
    const [error, setError] = React.useState('Searching...');

    const fetchUrl = async () => {
        try {
            const response = await fetch('http://localhost:8080/user');
            const json = await response.json();
            setLogins(json);
            setError('');

        } catch(error) {
            setLogins([]);
            setError('Something went wrong :(');
        }

        React.useEffect( () => { fetchUrl() }, []);

        if (error.length > 0) {
            return(
                <Grid container spacing={3} alignItems="center" justify="center">
                    <p>{ error }</p>
                </Grid>
            );
        }
    }

    return (
        <div>
            {
                <div>
                <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={4}>
                
                <h2>ADMIN</h2>

                </Grid>
                </Grid>
                </div>
                    
                
            }
        </div>
    );
}

export default Admin