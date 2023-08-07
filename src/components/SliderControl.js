import {Slider, Typography} from "@mui/material";
import React from "react";

const SliderControl = ({ value, valueText, audioContextStarted, setValue, range, step }) => {
    return (
        <div style={{ marginTop:'9px', marginBottom: '9px' }}>
            <Typography color="primary" fontSize="15px">
                {valueText}: {value}
            </Typography>
            <Slider value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    step={step}
                    min={range[0]}
                    max={range[1]}
                    disabled={audioContextStarted}
                    sx={{ minWidth: 200 }}
            />
        </div>
    );
}

export default SliderControl;
