import React, { useEffect, useState } from 'react';
import { Range, Direction, getTrackBackground } from 'react-range';

type Props = {
	drumPadIdx: number;
	step: number;
	min: number;
	max: number;
	values: number[];
	changeDrumPadVolume: (drumpPadidx: number, volume: number) => void;
	color: string;
	isPowerOn: boolean;
};

const VolumeSlider: React.FunctionComponent<Props> = ({
	drumPadIdx,
	step,
	min,
	max,
	values,
	changeDrumPadVolume,
	color,
	isPowerOn,
}) => {
	const [colorClass, setColorClass] = useState(`var(--${color})`);

	useEffect(() => {
		if (isPowerOn) {
			setColorClass(`var(--${color})`);
		} else {
			setColorClass(`var(--gray)`);
		}
	}, [isPowerOn, color]);
	return (
		<Range
			values={values}
			step={step}
			min={min}
			max={max}
			direction={Direction.Up}
			onChange={values => {
				changeDrumPadVolume(drumPadIdx, values[0]);
			}}
			renderTrack={({ props, children }) => (
				<div
					onMouseDown={props.onMouseDown}
					onTouchStart={props.onTouchStart}
					style={{
						...props.style,
						display: 'flex',
						justifyContent: 'center',
						height: '100px',
						width: '36px',
					}}
				>
					<div
						ref={props.ref}
						style={{
							height: '100%',
							width: '25px',
							border: `solid 7px ${colorClass}`,
							borderRadius: '4px',
							background: getTrackBackground({
								values,
								colors: ['rgb(23 23 23)', 'rgb(23 23 23)', 'rgb(23 23 23)'],
								min,
								max,
							}),
							alignSelf: 'center',
							boxShadow: `0px 2px 4px ${colorClass}`,
						}}
					>
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props, isDragged }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: '30px',
						width: '40px',
						borderRadius: '10%',
						backgroundColor: 'rgb(23 23 23)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
						outline: 'none',
					}}
				>
					<div
						style={{
							...props.style,
							height: '23px',
							width: '100%',
							border: 'solid 10px rgb(60 60 60)',
							borderRadius: '10%',
							backgroundColor: 'rgb(175 175 175)',
							outline: 'none',
							zIndex: '10',
						}}
					></div>
				</div>
			)}
		/>
	);
};

export default VolumeSlider;
