import React, { useEffect, useState } from 'react';

type Props = {
	content?: React.ReactNode;
	isPowerOn: boolean;
	setIsPowerOn: (v: boolean) => void;
};

const Button: React.FunctionComponent<Props> = ({ content, isPowerOn, setIsPowerOn }) => {
	const [textColorClass, settextColorClass] = useState('text-neutral-400');

	useEffect(() => {
		if (isPowerOn) {
			settextColorClass('text-lime-300 drop-shadow-[0_0px_4px_rgb(190,242,100)]');
		} else {
			settextColorClass('text-neutral-400');
		}
	}, [isPowerOn]);

	const onButtonClick = () => {
		setIsPowerOn(!isPowerOn);
	};

	return (
		<div
			className="bg-neutral-800 h-[40px] w-[50px] relative bottom-[30px] left-[40px] rounded-md"
			onClick={onButtonClick}
		>
			<div className="bg-neutral-900 scale-y-[0.55] h-[60px] w-full rounded-md relative bottom-[5px]">
				<span className={`${textColorClass} text-2xl flex h-full w-full justify-center items-center font-bold`}>
					{content}
				</span>
			</div>
		</div>
	);
};

export default Button;
