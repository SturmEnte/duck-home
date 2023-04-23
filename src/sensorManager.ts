import axios from "axios";

import Sensor from "./models/Sensor";
import Data from "./models/Data";

let sensors: Map<string, NodeJS.Timer> = new Map();

type Sensors = {
	name: string;
	id: string;
	unit: string;
};

export function registerSensor(id: string, url: string, s: Sensors[], userId: string) {
	const interval = setInterval(() => {
		console.table({ id, url, s, userId });
		axios
			.get(url)
			.then((res) => {
				s.forEach((sensor) => {
					if (!res.data[sensor.id]) {
						console.log("Sensor id", sensor.id, "not found in data of sensor", id);
						return;
					}

					Data.create({
						sensorDocId: id,
						sensorId: sensor.id,
						data: res.data[sensor.id],
						timestamp: Date.now(),
					}).catch((err) => {
						console.log("Error while saving data for sensor", sensor.id, "of", id, ":", err);
					});
				});
			})
			.catch((err) => {
				console.log("Error while fetching sensor data for sensor with id ", id, ":", err);
			});
	}, 1000 * 60);
	sensors.set(id, interval);
}

// Load sensors
Sensor.find()
	.then((docs) => {
		console.log(docs);
		docs.forEach((sensor) => {
			registerSensor(sensor.id, sensor.url, sensor.sensors, sensor.user_id);
		});
	})
	.catch((err) => {
		console.log("Failed to load sensors: ", err);
	});
