// Fetch the list of open interviews at a location in a given date period
export const fetchOpenSlots = (result) => {
    return new Promise((resolve, reject) => {
        console.log(result);

        const { locationId, startDate, endDate } = result;
        const appointmentUrl = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startDate}T00:00:00&endTimestamp=${endDate}T00:00:00`;

        fetch(appointmentUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => resolve(data.filter((slot) => slot.active > 0)))
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
