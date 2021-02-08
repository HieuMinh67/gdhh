import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Stepper, Step, StepLabel, Typography} from "@material-ui/core";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Success from "./Success";
import formInitialValues from "../FormModel/formInitialValues";

const useStyles = makeStyles({
    mainContainer: {
        display: "grid",
        justifyContent: "center",
        position: "relative",
        zIndex: 5,
        paddingBottom: "2rem"
    },
    formContainer: {
        position: "relative",
        width: "95%",
        justifySelf: "center"
    },
    header: {
        color: "#999",
        textAlign: "center"
    },
    root: {
        "& .MuiStepIcon-root.MuiStepIcon-active": {
            color: "red"
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed": {
            color: "red"
        }
    }
})
const ProfileForm = () => {
    const STEP_LENGTH = 2
    const [activeStep, setActiveStep] = useState(0);
    const [values, setValues] = useState(formInitialValues);
    const isLastStep = activeStep === STEP_LENGTH;

    const onChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value
        });
    }

    const handleNext = () => {
        setActiveStep(step => step + 1)
    }

    const handlePrev = () => {
        setActiveStep(step => step - 1)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        alert(JSON.stringify(values, null, 2));
        setActiveStep(activeStep + 1);
    }

    function getSteps() {
        let content = [];
        for (let i = 0; i < 3; i++) {
            content.push(<Step key={i}><StepLabel/></Step>)
        }
        return content;
    }

    function getStepsContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <StepOne
                    values={values}
                    handleChange={onChange}
                    handleNext={handleNext}
                />
            case 1:
                return <StepTwo
                    values={values}
                    handleChange={onChange}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            default:
                return <StepThree
                        handle/>
        }
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {getSteps()}
            </Stepper>
            <Typography variant={"h6"} className={classes.header}>
                ĐƠN ĐĂNG KÍ HỌC GIÁO LÝ
            </Typography>
            {activeStep > STEP_LENGTH ? (
                <Success/>
            ) : (
                <div className={classes.mainContainer}>
                    <div className={classes.formContainer}>
                        <form>
                            {getStepsContent(activeStep)}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileForm
