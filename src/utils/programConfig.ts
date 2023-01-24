import { audioClips } from './audioClips';

export type ProgramItem = {
	id?: string;
	src?: string;
	idx: number;
};

export interface IAudioClipLoader {
	loadAudioFiles(): void;
	setDefaultProgram(program: ProgramItem[]): void;
	setCurrentProgram(program: ProgramItem[]): void;
	getProgram(): ProgramItem[];
}

export class AudioClipLoader implements IAudioClipLoader {
	private defaultProgram: ProgramItem[] = [
		{ id: 'Heater-1', idx: 0 },
		{ id: 'Heater-2', idx: 1 },
		{ id: 'Heater-3', idx: 2 },
		{ id: 'Heater-4', idx: 3 },
		{ id: 'Clap', idx: 4 },
		{ id: 'OpenHH', idx: 5 },
		{ id: 'KickHat', idx: 6 },
		{ id: 'Kick', idx: 7 },
		{ id: 'ClosedHH', idx: 8 },
	];
	private currentProgram: ProgramItem[] = [];

	constructor() {
		this.loadAudioFiles();
	}

	loadAudioFiles(): void {
		this.defaultProgram = this.defaultProgram.map(item => {
			return {
				...item,
				src: audioClips.find(ac => ac.id === item.id)?.src,
			};
		});
	}

	setDefaultProgram(program: ProgramItem[]): void {
		this.defaultProgram = program;
	}
	setCurrentProgram(program: ProgramItem[]): void {
		this.currentProgram = program;
	}
	getProgram(): ProgramItem[] {
		const length = this.currentProgram.length;
		return length ? this.currentProgram : this.defaultProgram;
	}
}
