document.addEventListener("DOMContentLoaded", () => {
  const statusElem = document.getElementById("uptime-status");
  const durationElem = document.getElementById("uptime-duration");

  async function fetchUptime() {
    try {
      const resp = await fetch("https://api.benjibot.de/api/uptime");
      if (!resp.ok) throw new Error("Netzwerkfehler");
      const data = await resp.json();
      // Beispiel: data = { status: "online", uptime: "1234h 12m", ... }
      statusElem.textContent = data.status ? data.status : "–";
      durationElem.textContent = data.uptime ? data.uptime : "–";
    } catch (err) {
      console.error("Fehler beim Laden der Uptime:", err);
      statusElem.textContent = "Fehler";
      durationElem.textContent = "–";
    }
  }

  fetchUptime();
  // optional: alle 60 Sekunden neu abrufen
  setInterval(fetchUptime, 60000);
});
