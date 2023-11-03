import { useState, useEffect } from "react"

export const useLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;

                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
                );

                const data = await response.json();

                setLocation({
                    city: data.results[0].components.city,
                    country: data.results[0].components.country,
                });
            } catch (error) {
                console.error(error);
            }
        };

        getLocation();
    }, []);

    return location;
};

