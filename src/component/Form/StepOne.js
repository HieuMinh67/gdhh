import React, {useEffect, useState, Fragment} from 'react'
import {
    TextField,
    FormLabel,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel, Button, Grid,
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    inputField: {
        width: "100%",
        margin: "1rem 0"
    },
    btn: {
        width: "100%",
        height: "3rem",
        color: "#fff",
        background: "red",
    }
})


const StepOne = ({handleChange, handleNext, values: {name, christianName, sex, notes, dob, address}, formErrors}) => {
    const classes = useStyles();
    const [christianNames, setChristianNames] = useState([]);
    const [gender, setGender] = useState("")
    const [valid, setValid] = useState(true);
    const isValid = name.length > 0 &&
        !formErrors.name && sex.length > 0 &&
        !formErrors.sex && notes.length > 0 &&
        !formErrors.notes && dob.length > 0 &&
        !formErrors.dob && christianName.length > 0 &&
        !formErrors.christianName && address.length > 0 &&
        !formErrors.address

    useEffect(() => {
        fetch('/api/christianNames/')
            .then(res => res.json())
            .then((result) => {
                setChristianNames(result.data)
            })
    }, [])

    const defaultDate = () => {
        let fourYearsAgo = new Date().getFullYear() - 4;
        return fourYearsAgo + "-01-01"
    }

    return (<Fragment>
            <Grid container>
                <Autocomplete
                    options={christianNames}
                    getOptionLabel={(option) => option.tieng_viet}
                    renderInput={(params) =>
                        <TextField {...params}
                                   className={classes.inputField}
                                   label={"Tên Thánh"}
                                   variant={"outlined"}
                        />
                    }/>
                <TextField
                    className={classes.inputField}
                    name='name'
                    value={name}
                    onBlur={handleChange("name")}
                    label={"Họ và tên"}
                    variant={"outlined"}/>

                <TextField
                    className={classes.inputField}
                    value={address}
                    onBlur={handleChange("dia_chi_thuong_tru")}
                    label={"Địa chỉ thường trú"}
                    variant={"outlined"}/>
                <TextField
                    className={classes.inputField}
                    value={dob}
                    variant={"outlined"}
                    label={"Ngày tháng năm sinh"}
                    type={"date"}
                    defaultValue={defaultDate()}
                    onBlur={handleChange("dob")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.inputField}
                    value={notes}
                    onBlur={() => {
                        handleChange("notes");
                        setValid(false);
                    }}
                    label={"Hiện nay đang sống với"}
                    variant={"outlined"}/>
                <FormControl component={"fieldset"} variant={"outlined"}>
                    <FormLabel component={"legend"}>Giới tính</FormLabel>
                    <RadioGroup aria-label={"gender"} name={"sex"} onBlur={handleChange('sex')} row
                                value={sex}>
                        <FormControlLabel value={"NAM"} label={"Nam"}
                                          control={<Radio checked={sex === "NAM"}/>}/>
                        <FormControlLabel value={"NỮ"} label={"Nữ"} control={<Radio checked={sex === "NỮ"}/>}/>
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button
                        className={classes.btn}
                        variant={"outlined"}
                        onClick={handleNext}>
                        "TIẾP TỤC"}
                    </Button>
                </div>
            </Grid>
        </Fragment>
    )
}

export default StepOne
