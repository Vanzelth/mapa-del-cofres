const INTERVAL = 225 * 60 * 1000; // 3 horas 45 minutos

// Último cofre confirmado (hora de Chile)
const BASE = new Date("2026-07-26T05:15:00-04:00");

const countdown = document.getElementById("countdown");
const progressBar = document.getElementById("progress-bar");
const spawnList = document.getElementById("spawnList");
const countryTable = document.getElementById("countryTable");

const countries = [
    { flag:"https://flagcdn.com/w40/mx.png", zone:"America/Mexico_City" },

    { flag:"https://flagcdn.com/w40/gt.png", zone:"America/Guatemala" },
    { flag:"https://flagcdn.com/w40/bz.png", zone:"America/Belize" },
    { flag:"https://flagcdn.com/w40/hn.png", zone:"America/Tegucigalpa" },
    { flag:"https://flagcdn.com/w40/sv.png", zone:"America/El_Salvador" },
    { flag:"https://flagcdn.com/w40/ni.png", zone:"America/Managua" },
    { flag:"https://flagcdn.com/w40/cr.png", zone:"America/Costa_Rica" },
    { flag:"https://flagcdn.com/w40/pa.png", zone:"America/Panama" },
    { flag:"https://flagcdn.com/w40/co.png", zone:"America/Bogota" },
    { flag:"https://flagcdn.com/w40/ec.png", zone:"America/Guayaquil" },
    { flag:"https://flagcdn.com/w40/pe.png", zone:"America/Lima" },

    { flag:"https://flagcdn.com/w40/cl.png", zone:"America/Santiago" },
    { flag:"https://flagcdn.com/w40/bo.png", zone:"America/La_Paz" },
    { flag:"https://flagcdn.com/w40/ve.png", zone:"America/Caracas" },

    { flag:"https://flagcdn.com/w40/ar.png", zone:"America/Argentina/Buenos_Aires" },
    { flag:"https://flagcdn.com/w40/uy.png", zone:"America/Montevideo" },
    { flag:"https://flagcdn.com/w40/py.png", zone:"America/Asuncion" },
    { flag:"https://flagcdn.com/w40/br.png", zone:"America/Sao_Paulo" },

    { flag:"https://flagcdn.com/w40/es.png", zone:"Europe/Madrid" }
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
.forEach(hour => {

    countryTable.innerHTML += `
    <tr>
        <td style="
            font-size:30px;
            padding:12px 0;
            border-bottom:1px solid #334155;
            white-space:nowrap;
        ">
           ${groups[hour]
        .map(flag => `<img src="${flag}" class="flag">`)
        .join("")}
</td>

        <td style="
            width:90px;
            text-align:right;
            vertical-align:middle;
            font-size:22px;
            font-weight:bold;
            font-family:monospace;
            border-bottom:1px solid #334155;
            white-space:nowrap;
        ">
            🕒 ${hour}
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
