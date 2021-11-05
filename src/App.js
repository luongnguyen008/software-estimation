import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Result from './Result';
import ActorsPoint from './component/actorsPoint';
import UseCasePoint from './component/useCasePoint';
import TCF from './component/TCF';
import EF from './component/EF';
import AverageWage from './component/averageWage';


const steps = ['Điểm actor', 'Điểm use-case', 'Hệ số phức tạp KT-CN', 'Hệ số phức tạp môi trường', 'Mức lương bình quân'];

function App() {
	const [state, setState] = React.useState({
		taw: 0,
		tbf: 0,
		tcf: 0.6,
		ef: 1.4,
		p: 48,
		h: 0
	})
	const { dataTAW, taw, dataTBF, tbf, dataTCF, tcf, tfw, dataEF, ef, p, dataWage, h } = state
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		// return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setState({
			taw: 0,
			tbf: 0,
			tcf: 0.6,
			ef: 1.4,
			p: 48,
			h: 0
		});
		setActiveStep(0)
	};
	const setTAW = (data, taw) => {
		setState({
			...state,
			dataTAW: data,
			taw: taw
		})
	}
	const setTBF = (data, tbf) => {
		setState({
			...state,
			dataTBF: data,
			tbf: tbf
		})
	}
	const setTCF = (data, tfw, tcf) => {
		setState({
			...state,
			dataTCF: data,
			tcf: tcf,
			tfw: tfw
		})
	}
	const setEF = (data, ef, p) => {
		setState({
			...state,
			dataEF: data,
			ef: ef,
			p: p
		})
	}
	const setWage = (wage) => {
		setState({
			...state,
			h: wage
		})
	}

	console.log("state", state)
	return (
		<Box sx={{ width: '85%', padding: 10 }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					if (isStepOptional(index)) {
						labelProps.optional = (
							<Typography variant="caption">(0-5)</Typography>
						);
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<Result handleReset={handleReset} handleBack={handleBack} data={state} />
			) : (
				<React.Fragment>

					{activeStep == 0 &&
						<ActorsPoint data={dataTAW} setData={setTAW} taw={taw} />
					}
					{activeStep == 1 &&
						<UseCasePoint data={dataTBF} setData={setTBF} tbf={tbf} />
					}
					{activeStep == 2 &&
						<TCF data={dataTCF} setData={setTCF} tcf={tcf} tfw={tfw} />
					}
					{activeStep == 3 &&
						<EF data={dataEF} setData={setEF} ef={ef} p={p} />
					}
					{activeStep == 4 &&
						<AverageWage data={h} setData={setWage} />
					}
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
						>
							Back
						</Button>

						<Button onClick={handleNext}>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</Box>


				</React.Fragment>
			)}
		</Box>
	);
}


export default App;
