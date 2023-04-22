let sensors: Map<string, NodeJS.Timer> = new Map();

type Sensors = {
	name: string;
	id: string;
	unit: string;
};

export function registerSensor(id: string, url: string, s: Sensors, userId: string) {
	const interval = setInterval(() => {
		console.table({ id, url, s, userId });
	}, 1000 * 60);
	sensors.set(id, interval);
}
