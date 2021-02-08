import React, {useEffect, useState} from 'react'
import {
    TextField,
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    inputField: {
        width: "100%",
        margin: "1rem 0"
    }
})

const StepTwo = (props) => {
    const classes = useStyles();
    const [christianNames, setChristianNames] = useState([]);

    useEffect(() => {
        fetch('/api/christianNames/')
            .then(res => res.json())
            .then((result) => {
                setChristianNames(result.data)
            })
    }, [])

    return (<>
            <Autocomplete
                fullWidth
                options={christianNames}
                getOptionLabel={(option) => option.tieng_viet}
                onChange={props.handleChange('fatherChristianName')}
                renderInput={(params) =>
                    <TextField {...params}
                               className={classes.inputField}
                               label={"Tên Thánh bố"}
                               variant={"outlined"}
                    />
                }/>
            <TextField
                className={classes.inputField}
                onChange={props.handleChange("ho_ten_bo")}
                label={"Họ và tên bố"}
                variant={"outlined"}/>
            <TextField
                className={classes.inputField}
                onChange={props.handleChange("so_dien_thoai_bo")}
                label={"Số điện thoại bố"}
                variant={"outlined"}/>
            <Autocomplete
                options={christianNames}
                getOptionLabel={(option) => option.tieng_viet}
                onChange={props.handleChange('motherChristianName')}
                renderInput={(params) =>
                    <TextField {...params}
                               className={classes.inputField}
                               label={"Tên Thánh mẹ"}
                               variant={"outlined"}
                    />
                }/>
            <TextField
                className={classes.inputField}
                onChange={props.handleChange("ho_ten_me")}
                label={"Họ và tên mẹ"}
                variant={"outlined"}/>
            <TextField
                className={classes.inputField}
                onChange={props.handleChange("so_dien_thoai_me")}
                label={"Số điện thoại mẹ"}
                variant={"outlined"}/>
        </>
    )
}

export default StepTwo
