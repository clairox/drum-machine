import heater1 from '../assets/audio/Heater-1.mp3';
import heater2 from '../assets/audio/Heater-2.mp3';
import heater3 from '../assets/audio/Heater-3.mp3';
import heater4 from '../assets/audio/Heater-4.mp3';
import clap from '../assets/audio/Clap.mp3';
import opnHH from '../assets/audio/OpenHH.mp3';
import kickHat from '../assets/audio/KickHat.mp3';
import kick from '../assets/audio/Kick.mp3';
import closedHH from '../assets/audio/ClosedHH.mp3';

export type AudioClip = {
	id: string;
	src: string;
};

const dir = '../assets/audio';

export const audioClips: AudioClip[] = [
	{ id: 'Heater-1', src: heater1 },
	{ id: 'Heater-2', src: heater2 },
	{ id: 'Heater-3', src: heater3 },
	{ id: 'Heater-4', src: heater4 },
	{ id: 'Clap', src: clap },
	{ id: 'OpenHH', src: opnHH },
	{ id: 'KickHat', src: kickHat },
	{ id: 'Kick', src: kick },
	{ id: 'ClosedHH', src: closedHH },
];
