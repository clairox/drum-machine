import React from 'react';
import './assets/index.css';
import DrumMachine from './components/DrumMachine';

function App() {
	return (
		<div className="App bg-red-900 min-h-[1000px] min-w-[1000px] h-screen flex justify-center items-center">
			<DrumMachine />
		</div>
	);
}

export default App;
