const INTERVAL = 225 * 60 * 1000; // 3h 45m

// Hora base en Chile (05:15)
const BASE = new Date("2026-07-27T05:15:00-04:00");

const countdown = document.getElementById("countdown");
const progressBar = document.getElementById("progress-bar");
const spawnList = document.getElementById("spawnList");
const countryTable = document.getElementById("countryTable");

const countries = [
    { flag: "🇨🇱", name: "Chile", zone: "America/Santiago" },
    { flag: "🇦🇷", name: "Argentina", zone: "America/Argentina/Buenos_Aires" },
    { flag: "🇺🇾", name: "Uruguay", zone: "America/Montevideo" },
    { flag: "🇧🇷", name: "Brasil", zone: "America/Sao_Paulo" },
    { flag: "🇵🇾", name: "Paraguay", zone: "America/Asuncion" },
    { flag: "🇧🇴", name: "Bolivia", zone: "America/La_Paz" },
    { flag: "🇵🇪", name: "Perú", zone: "America/Lima" },
    { flag: "🇨🇴", name: "Colombia", zone: "America/Bogota" },
    { flag: "🇪🇨", name: "Ecuador", zone: "America/Guayaquil" },
    { flag: "🇲🇽", name: "México", zone: "America/Mexico_City" },
    { flag: "🇺🇸", name: "New York", zone: "America/New_York" },
    { flag: "🇪🇸", name: "España", zone: "Europe/Madrid" }
];

function getNextSpawn() {
    const now = new Date();

    let next = new Date(BASE);

    while (next <= now) {
        next = new Date(next.getTime() + INTERVAL);
    }

    return next;
}

function update() {

    const now = new Date();

    const next = getNextSpawn();

    const diff = next - now;

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    countdown.textContent =
        `${String(h).padStart(2,'0')}:` +
        `${String(m).padStart(2,'0')}:` +
        `${String(s).padStart(2,'0')}`;

    const previous = new Date(next.getTime() - INTERVAL);

    const percent =
        ((now - previous) / INTERVAL) * 100;

    progressBar.style.width =
        Math.max(0, Math.min(100, percent)) + "%";

    countryTable.innerHTML = "";

    countries.forEach(c => {

        const hour =
            next.toLocaleString("es-CL",{
                hour:"2-digit",
                minute:"2-digit",
                hour12:false,
                timeZone:c.zone
            });

        countryTable.innerHTML +=
        `<tr>
            <td>${c.flag} ${c.name}</td>
            <td style="text-align:right">${hour}</td>
        </tr>`;

    });

    spawnList.innerHTML="";

    for(let i=0;i<10;i++){

        const d =
            new Date(next.getTime()+INTERVAL*i);

        const txt =
            d.toLocaleString("es-CL",{
                weekday:"short",
                day:"2-digit",
                month:"2-digit",
                hour:"2-digit",
                minute:"2-digit",
                hour12:false
            });

        spawnList.innerHTML += `<li>${txt}</li>`;

    }

}

update();

setInterval(update,1000);
