import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
	Dispatch,
	SetStateAction,
	MutableRefObject,
	FunctionComponent,
	useRef,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { AudioClipLoader, ProgramItem } from '../utils/programConfig';
import Button from './Button';
import VolumeSlider from './VolumeSlider';
import powerButtonGuideSrc from '../assets/images/power-button-text.png';

const drumPadConfig = [
	{ key: 'Q', altKey: 'Numpad7', color: 'red', volume: 100 },
	{ key: 'W', altKey: 'Numpad8', color: 'orange', volume: 100 },
	{ key: 'E', altKey: 'Numpad9', color: 'yellow', volume: 100 },
	{ key: 'A', altKey: 'Numpad4', color: 'lime', volume: 100 },
	{ key: 'S', altKey: 'Numpad5', color: 'emerald', volume: 100 },
	{ key: 'D', altKey: 'Numpad6', color: 'cyan', volume: 100 },
	{ key: 'Z', altKey: 'Numpad1', color: 'blue', volume: 100 },
	{ key: 'X', altKey: 'Numpad2', color: 'purple', volume: 100 },
	{ key: 'C', altKey: 'Numpad3', color: 'pink', volume: 100 },
];

const DrumMachine: FunctionComponent = () => {
	const [isPowerOn, setIsPowerOn] = useState(false);
	const [currentDrumPadName, setCurrentDrumPadName] = useState('');
	const [dpConfig, setDpConfig] = useState(drumPadConfig);
	const [powerButtonGuide, setPowerButtonGuide] = useState(
		<div className="h-56 w-56 relative left-[40px]">
			<img src={powerButtonGuideSrc} alt="Arrow pointing to power button" />
		</div>
	);

	const _setIsPowerOn = (v: boolean) => {
		setPowerButtonGuide(<></>);
		setCurrentDrumPadName('');
		setIsPowerOn(v);
	};

	const changeDrumPadVolume = (drumPadidx: number, volume: number) => {
		const newConfig = dpConfig.map((item, idx) => {
			if (idx === drumPadidx) {
				return {
					...item,
					volume: volume,
				};
			}
			return item;
		});
		setDpConfig(newConfig);
	};

	const program: MutableRefObject<ProgramItem[]> = useRef(new AudioClipLoader().getProgram());

	return (
		<div
			id="drum-machine"
			className="bg-neutral-900 rounded-2xl gap-8 h-[400px] scale-[0.4] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 min-w-[816px]"
		>
			<div className="relative bottom-[40px] flex bg-neutral-800 p-10 rounded-2xl gap-8">
				<div id="drum-pad-container" className="grid grid-cols-3 gap-4">
					{dpConfig.map((item, idx) => {
						const props = {
							audioClip: isPowerOn ? program.current.find(progItem => progItem.idx === idx) : undefined,
							triggerKey: item.key,
							altTriggerKey: item.altKey,
							volume: item.volume,
							color: item.color,
							isPowerOn,
							setCurrentDrumPadName: isPowerOn ? setCurrentDrumPadName : undefined,
						};
						return <DrumPad {...props} key={idx} />;
					})}
				</div>
				<div className="w-96 flex flex-col">
					<Display {...{ currentDrumPadName, isPowerOn }} />
					<div id="slider-container" className="basis-2/5 h-[150px] flex gap-2 justify-center items-end">
						{dpConfig.map((item, idx) => {
							return (
								<VolumeSlider
									key={idx}
									drumPadIdx={idx}
									step={2}
									values={[item.volume]}
									min={0}
									max={100}
									changeDrumPadVolume={changeDrumPadVolume}
									color={item.color}
									isPowerOn={isPowerOn}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div>
				<Button
					content={<FontAwesomeIcon icon={faPowerOff} />}
					isPowerOn={isPowerOn}
					setIsPowerOn={_setIsPowerOn}
				/>
				{powerButtonGuide}
			</div>
		</div>
	);
};

type DrumPadProps = {
	audioClip?: ProgramItem;
	triggerKey?: string;
	altTriggerKey?: string;
	volume: number;
	color: string;
	isPowerOn: boolean;
	setCurrentDrumPadName?: Dispatch<SetStateAction<string>>;
};

const DrumPad: FunctionComponent<DrumPadProps> = ({
	audioClip,
	triggerKey,
	altTriggerKey,
	volume,
	color,
	isPowerOn,
	setCurrentDrumPadName,
}) => {
	const [padColorClass, setPadColorClass] = useState('bg-neutral-400');
	const [textColorClass, settextColorClass] = useState('text-neutral-400');

	// Tailwind can't use a variable if its a concatenation so I have to go through every case individually
	useEffect(() => {
		if (isPowerOn) {
			switch (color) {
				case 'red':
					setPadColorClass('bg-red-400 shadow-[0_2px_3px_var(--red)]');
					settextColorClass('text-red-400');
					break;
				case 'orange':
					setPadColorClass('bg-orange-400 shadow-[0_2px_3px_var(--orange)]');
					settextColorClass('text-orange-400');
					break;
				case 'yellow':
					setPadColorClass('bg-yellow-300 shadow-[0_2px_3px_var(--yellow)]');
					settextColorClass('text-yellow-300');
					break;
				case 'lime':
					setPadColorClass('bg-lime-300 shadow-[0_2px_3px_var(--lime)]');
					settextColorClass('text-lime-300');
					break;
				case 'emerald':
					setPadColorClass('bg-emerald-300 shadow-[0_2px_3px_var(--emerald)]');
					settextColorClass('text-emerald-300');
					break;
				case 'cyan':
					setPadColorClass('bg-cyan-400 shadow-[0_2px_3px_var(--cyan)]');
					settextColorClass('text-cyan-400');
					break;
				case 'blue':
					setPadColorClass('bg-blue-400 shadow-[0_2px_3px_var(--blue)]');
					settextColorClass('text-blue-400');
					break;
				case 'purple':
					setPadColorClass('bg-purple-400 shadow-[0_2px_3px_var(--purple)]');
					settextColorClass('text-purple-400');
					break;
				case 'pink':
					setPadColorClass('bg-pink-400 shadow-[0_2px_3px_var(--pink)]');
					settextColorClass('text-pink-400');
					break;
			}
		} else {
			setPadColorClass('bg-neutral-400');
			settextColorClass('text-neutral-400');
		}
	}, [color, isPowerOn]);

	const [padPosClass, setPadPosClass] = useState('h-[96px]');

	const audioEl: MutableRefObject<HTMLAudioElement | null> = useRef(null);

	useEffect(() => {
		if (audioEl.current) {
			audioEl.current.volume = volume * 0.01;
		}
	}, [volume]);

	const onDrumPadMouseDown = useCallback(() => {
		setPadPosClass('h-[90px] top-[6px]');

		if (audioEl.current && setCurrentDrumPadName && audioClip?.id && isPowerOn) {
			audioEl.current.play();
			setCurrentDrumPadName(audioClip.id);
		}
	}, [audioClip, isPowerOn, setCurrentDrumPadName]);

	const onDrumPadMouseUp = useCallback(() => {
		setPadPosClass('h-[96px]');
	}, []);

	const handleKeyDownEvent = useCallback(
		(e: KeyboardEvent) => {
			if (e.key.toLowerCase() === triggerKey?.toLowerCase() || e.code === altTriggerKey) {
				onDrumPadMouseDown();
			}
		},
		[altTriggerKey, onDrumPadMouseDown, triggerKey]
	);

	const handleKeyUpEvent = useCallback(
		(e: KeyboardEvent) => {
			if (e.key.toLowerCase() === triggerKey?.toLowerCase() || e.code === altTriggerKey) {
				onDrumPadMouseUp();
			}
		},
		[altTriggerKey, onDrumPadMouseUp, triggerKey]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDownEvent);

		window.addEventListener('keyup', handleKeyUpEvent);

		return () => {
			window.removeEventListener('keydown', handleKeyDownEvent);
		};
	}, [isPowerOn, handleKeyDownEvent, handleKeyUpEvent]);

	return (
		<div className="drum-pad-container h-[96px]">
			<div
				className={`relative drum-pad ${padColorClass} ${padPosClass} rounded-md w-24`}
				id={audioClip?.id}
				onMouseDown={onDrumPadMouseDown}
				onMouseUp={onDrumPadMouseUp}
			>
				<div className={`relative bg-neutral-900 z-100 h-[86.39px] w-[95%] left-[2px] top-[1px] rounded-md`}>
					<p className={`${textColorClass} font-bold relative text-lg top-[3px] left-[10px]`}>{triggerKey}</p>
				</div>
				<audio className="clip" src={audioClip?.src} id={triggerKey} ref={audioEl}></audio>
			</div>
		</div>
	);
};

type DisplayProps = {
	currentDrumPadName: string;
	isPowerOn: boolean;
};

const Display: FunctionComponent<DisplayProps> = ({ currentDrumPadName, isPowerOn }) => {
	const [displayColorClass, setDisplayColorClass] = useState('bg-cyan-800');

	useEffect(() => {
		if (isPowerOn) {
			setDisplayColorClass('bg-cyan-500');
		} else {
			setDisplayColorClass('bg-cyan-800');
		}
	}, [isPowerOn]);
	return (
		<div id="display" className={`${displayColorClass} rounded-md basis-3/5 flex justify-center items-center`}>
			<p className="text-cyan-200 font-bold text-4xl">{currentDrumPadName}</p>
		</div>
	);
};

export default DrumMachine;
