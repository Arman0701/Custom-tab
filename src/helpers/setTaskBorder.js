export default function setTaskBorder(priority) {
	switch (priority) {
		case "None":
			return "rgba(255,255,255, 0.73)";

		case "High":
			return "rgba(220,20,60, 0.73)";

		case "Medium":
			return "rgba(127,255,212, 0.73)";

		case "Low":
			return "rgba(0,255,255, 0.73)";
	}
}