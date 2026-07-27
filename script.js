const INTERVAL = 225 * 60 * 1000; // 3 horas 45 minutos

// Último cofre confirmado (hora de Chile)
const BASE = new Date("2026-07-26T05:15:00-04:00");

const countdown = document.getElementById("countdown");
const progressBar = document.getElementById("progress-bar");
const spawnList = document.getElementById("spawnList");
const countryTable = document.getElementById("countryTable");

const countries = [
    { flag:"🇲🇽", zone:"America/Mexico_City" },

    { flag:"🇬🇹", zone:"America/Guatemala" },
    { flag:"🇧🇿", zone:"America/Belize" },
    { flag:"🇭🇳", zone:"America/Tegucigalpa" },
    { flag:"🇸🇻", zone:"America/El_Salvador" },
    { flag:"🇳🇮", zone:"America/Managua" },
    { flag:"🇨🇷", zone:"America/Costa_Rica" },
    { flag:"🇵🇦", zone:"America/Panama" },
    { flag:"🇨🇴", zone:"America/Bogota" },
    { flag:"🇪🇨", zone:"America/Guayaquil" },
    { flag:"🇵🇪", zone:"America/Lima" },

    { flag:"🇨🇱", zone:"America/Santiago" },
    { flag:"🇧🇴", zone:"America/La_Paz" },
    { flag:"🇻🇪", zone:"America/Caracas" },

    { flag:"🇦🇷", zone:"America/Argentina/Buenos_Aires" },
    { flag:"🇺🇾", zone:"America/Montevideo" },
    { flag:"🇵🇾", zone:"America/Asuncion" },
    { flag:"🇧🇷", zone:"America/Sao_Paulo" },

    { flag:"🇪🇸", zone:"Europe/Madrid" }
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

const groups = {};

countries.forEach(c => {

    const hour = next.toLocaleTimeString("es-CL",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
        timeZone:c.zone
    });

    if(!groups[hour]){
        groups[hour] = [];
    }

    groups[hour].push(c.flag);

});

Object.keys(groups)
.sort()
.forEach(hour=>{

    countryTable.innerHTML += `
        <tr>
            <td style="font-size:22px;font-weight:bold;">
                🕒 ${hour}
            </td>
        </tr>

        <tr>
            <td style="font-size:28px;padding-bottom:18px;">
                ${groups[hour].join(" ")}
            </td>
        </tr>
    `;

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
