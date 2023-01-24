export type AudioClip = {
	id: string;
	src: string;
};

const dir = '/audio';

export const audioClips: AudioClip[] = [
	{ id: 'Heater-1', src: dir + '/Heater-1.mp3' },
	{ id: 'Heater-2', src: dir + '/Heater-2.mp3' },
	{ id: 'Heater-3', src: dir + '/Heater-3.mp3' },
	{ id: 'Heater-4', src: dir + '/Heater-4.mp3' },
	{ id: 'Clap', src: dir + '/Clap.mp3' },
	{ id: 'OpenHH', src: dir + '/OpenHH.mp3' },
	{ id: 'KickHat', src: dir + '/KickHat.mp3' },
	{ id: 'Kick', src: dir + '/Kick.mp3' },
	{ id: 'ClosedHH', src: dir + '/ClosedHH.mp3' },
];
