import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const MusicPlayerGridItem = ({ children }) => {
    const theme = useTheme();
    if (!children) {
        return null;
    }
    return (
        <Grid item
              sx={{
                  marginBottom: '16px',
                  backgroundColor: theme.palette.secondary.main,
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
