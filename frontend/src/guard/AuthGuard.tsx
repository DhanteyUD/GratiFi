import { useEffect, useRef } from "react";
import { auth } from "../services/auth.service.js";
import { AppProvider } from "../context/AppContext.js";
import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		function checkForInactivity() {
			const timer = +(localStorage.getItem("timeout") || 0);
			const currentTime = Date.now();
			if (currentTime > timer) {
				localStorage.clear();
				window.location.href = "/login";
			}
		}

		intervalRef.current = setInterval(checkForInactivity, 5000);

		return () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		function updateTimer() {
			const futureTime = Date.now() + 30 * 60 * 1000;
			localStorage.setItem("timeout", futureTime.toString());
		}

		const events = ["resize", "click", "scroll", "mousemove"];
		events.forEach((event) => window.addEventListener(event, updateTimer));

		updateTimer();

		return () => {
			events.forEach((event) => window.removeEventListener(event, updateTimer));
		};
	}, []);

	return (
		<AppProvider>
			<div>{auth() ? children : <Navigate to="/login" />}</div>
		</AppProvider>
	);
}
