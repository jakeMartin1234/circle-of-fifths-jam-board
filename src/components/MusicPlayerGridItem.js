import {Grid} from "@mui/material";

const MusicPlayerGridItem = ({ children }) => {
    if (!children) {
        return null;
    }
    return (
        <Grid item
              sx={{
                  marginBottom: '16px',
                  backgroundColor: '#5a5555',
                  borderRadius: '5px',
                  padding: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  minWidth: '300px'
              }}
        >
            {children}
        </Grid>
    )
}

export default MusicPlayerGridItem;
