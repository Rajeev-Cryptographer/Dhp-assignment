document.addEventListener("DOMContentLoaded", function () {
    fetch("https://rajeev1.pythonanywhere.com/data")  // Ensure this matches your backend URL
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Debugging

            if (!data || Object.keys(data).length === 0) {
                console.error("No data available");
                document.body.innerHTML += "<p style='color:red;'>No data available.</p>";
                return;
            }

            const years = Object.keys(data);  // Extract years (2023, 2024, etc.)
            const tags = Object.keys(data[years[0]] || {}); // Extract top 10 tags safely

            const datasets = tags.map(tag => ({
                label: tag,
                data: years.map(year => data[year]?.[tag] || 0),  // Safe data access
                borderColor: getRandomColor(),
                fill: false
            }));

            const ctx = document.getElementById("lineChart").getContext("2d");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Top 10 Topics Over the Years" }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: "Percentage (%)" }
                        },
                        x: {
                            title: { display: true, text: "Year" }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.body.innerHTML += "<p style='color:red;'>Error loading data.</p>";
        });

    function getRandomColor() {
        return `hsl(${Math.random() * 360}, 70%, 50%)`;
    }
});
