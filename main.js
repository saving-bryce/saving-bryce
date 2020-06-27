async function getClient() {
	client = await matrixcs.createClient({
		baseUrl: "https://matrix.org",
		userId: "@saving-bryce:matrix.org",
		accessToken: "MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJiY2lkIHVzZXJfaWQgPSBAc2F2aW5nLWJyeWNlOm1hdHJpeC5vcmcKMDAxNmNpZCB0eXBlID0gYWNjZXNzCjAwMjFjaWQgbm9uY2UgPSBSO2w0NmZTTl5qPWFJS0VYCjAwMmZzaWduYXR1cmUguvY8hc8plhgsG_LrQZ82-xKg3fy1N14yzZu3sqP67ywK",
	});
	
	await client.startClient();
	return client;
}

function addMessageHandler(client) {
	client.on("Room.timeline", function(event, room, toStartOfTimeline) {
		if (event.getType() !== "m.room.message") {
			return; // only use messages
		} else {
			let text = event.event.content.body;
			let split = text.split(" ");
			switch (split[0].toLowerCase()) {
				case "clear":
					document.getElementById("next-shift-date").innerHTML = "";
					document.getElementById("next-shift-day").innerHTML = "";
					document.getElementById("next-shift-time").innerHTML = "";
					document.getElementById("next-shift-hours").innerHTML = "";
					document.getElementById("next-shift-pay").innerHTML = "";
					document.getElementById("next-shift-time-until").innerHTML = "";
					break;
				case "next-date":
					document.getElementById("next-shift-date").innerHTML = split[1];
					break;
				case "next-day":
					document.getElementById("next-shift-day").innerHTML = split[1];
					break;
				case "next-time":
					document.getElementById("next-shift-time").innerHTML = split[1];
					break;
				case "next-hours":
					document.getElementById("next-shift-hours").innerHTML = split[1];
					break;
				case "next-pay":
					document.getElementById("next-shift-pay").innerHTML = split[1];
					break;
				case "next-time-until":
					document.getElementById("next-shift-time-until").innerHTML = split[1];
					break;
				default:
					console.log(text);
					break;
			}
		}
	});
}

getClient().then(addMessageHandler);
