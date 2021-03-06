import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function User() {

    const [user, setUser] = React.useState([]);

    const getData = async () => {
        fetch('http://localhost:8080/user')
        .then(res => res.text())
        .then(res => setUser({message: res}));
    }

    return (
        <div>
            {
                user.map( user =>{
                    return(
                        <div>
                        <Grid container spacing={3} alignItems="center" justify="center">
                        <Grid item xs={4}>
                            
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>
                                    {user.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container alignItems="center" justify="center">
                                <Grid item xs={11}>
                                    <Typography>
                                        Health: { user.health }
                                    </Typography>
                                </Grid>
                            
                                <Grid item xs={1}>
                                    <IconButton aria-label="edit" >
                                        <EditIcon style={{ color: '#FFFFFF' }}/>
                                    </IconButton>
                                </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </Grid>
                        </Grid>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default User