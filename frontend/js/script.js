async function checkBackend() {
    const result = document.getElementById("result");

    try {
        const response = await fetch("http://localhost:8001/api/health");
        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 4);
    } catch (error) {
        result.textContent = "Backend connection error: " + error;
    }
}