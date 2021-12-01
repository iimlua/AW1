function acharestado(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`);
}

function suspeitos(uf) {
    return fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`);
}

const form = document.querySelector('#form');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

async function doSubmit() {
    const suspeitas = document.querySelector("#suspects")
    const cep = document.querySelector('#cep')

    suspeitas.innerHTML = '<div class="suspects"</div>'

    const buscarCEP = await acharestado(cep.value);
    const dataCEP = await buscarCEP.json();
    const suspects = await suspeitos(dataCEP.uf);
    const dataSuspects = await suspects.json();
    console.log(dataSuspects)
    suspeitas.innerHTML = `Casos: ${dataSuspects.cases}, Suspeitas: ${dataSuspects.suspects}, Mortes: ${dataSuspects.deaths}  `
}

const masks = {
    cep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    },
}

document.querySelectorAll('#cep').forEach($input => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})