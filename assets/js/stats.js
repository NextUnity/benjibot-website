document.addEventListener("DOMContentLoaded", () => {
  const statusElem = document.getElementById("uptime-status");
  const durationElem = document.getElementById("uptime-duration");

  async function fetchUptime() {
    try {
      const response = await fetch("https://api.benjibot.de/api/uptime");
      if (!response.ok) throw new Error("API nicht erreichbar");

      const data = await response.json();

      // Uptime anzeigen
      durationElem.textContent = data.uptime || "unbekannt";

      // Status als "Online", wenn uptime_seconds > 0
      const isOnline = data.uptime_seconds > 0;
      statusElem.textContent = isOnline ? "🟢 Online" : "🔴 Offline";

    } catch (error) {
      console.error("Fehler beim Abrufen der Uptime:", error);
      statusElem.textContent = "⚠️ Fehler";
      durationElem.textContent = "–";
    }
  }

  // Initial laden
  fetchUptime();

  // Wiederhole alle 60 Sekunden
  setInterval(fetchUptime, 60000);
});
