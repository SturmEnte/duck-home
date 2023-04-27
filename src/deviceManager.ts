import axios from "axios";

import Device from "./models/Device";
import Data from "./models/Data";

let devices: Map<string, NodeJS.Timer> = new Map();

type Sensor = {
	name: string;
	id: string;
	unit: string;
};

export function registerDevice(id: string, url: string, sensors: Sensor[], userId: string) {
	const interval = setInterval(() => {
		axios
			.get(url)
			.then((res) => {
				sensors.forEach((sensor) => {
					if (!res.data[sensor.id]) {
						console.log("Sensor id", sensor.id, "not found in data of sensor", id);
						return;
					}

					Data.create({
						deviceId: id,
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
	devices.set(id, interval);
}

// Load sensors
Device.find()
	.then((docs) => {
		docs.forEach((device) => {
			registerDevice(device.id, device.url, device.sensors, device.user_id);
		});
	})
	.catch((err) => {
		console.log("Failed to load devices: ", err);
	});
