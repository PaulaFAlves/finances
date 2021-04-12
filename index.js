const $ = document.querySelector.bind(document)

let user = window.prompt("Seja bem-vindo! Qual seu nome?","Digite aqui seu nome")
if (user === null || user === 'Digite aqui seu nome') {
  user = 'Visitante'
}
const userCapitalized = user[0].toUpperCase() + user.substring(1)

const welcomeMessage = document.getElementById('welcomeMessage')
welcomeMessage.innerHTML = `Olá, ${userCapitalized}!`

function formDisplay() {
    const formEntry = document.getElementById('formEntry')
    const display = formEntry.style.display
    formEntry.style.display = display === 'block' ? 'none' : 'block'

    let newEntries = document.getElementById('newEntries')

    newEntries.innerHTML =
        newEntries.innerHTML === 'Esconder' ? 'Novo Lançamento' : 'Esconder'
}

const graphOptions = {
  responsive: true,
      title: {
        display: true,
        text: 'Dinheiro em caixa'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Dias'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Renda'
          }
        }]
      }
};

const entriesOnLocalStorage = localStorage.getItem('entries')
const entries = 
  entriesOnLocalStorage ? JSON.parse(entriesOnLocalStorage) : []
showEntries()
showGraph()

function submitForm(e) {
    e.preventDefault()

    const multiplier = $('#spent').checked ? -1 : 1

    let entry = {
        value: parseFloat($('#value').value) * multiplier,
        description: $('#description'). value,
        date: $('#date').value
    }

    entries.push(entry)
    saveOnLocalStorage()
    cleanForm()
		showEntries()
    showGraph()
    $('#value').focus()
}

function showGraph() {
  if(entries) {
    const OrderedEntries = entries.sort((a, b) => a.date - b.date)

  let dates = []
  let values = []
  let currentValue = 0

  entries.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString()
    dates.push(date)

    currentValue += entry.value
    values.push(currentValue)
  })

  const curveColor = currentValue < 0 ? 'red' : '#255d00'

  const configGraph = {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Comportamento',
        backgroundColor: curveColor,
        borderColor: curveColor,
        data: values,
        fill: false
      }]
    },
    option: graphOptions
  }

  const context = $('#graph').getContext('2d')
  new Chart(context, configGraph)
  }
}

function showEntries() {
    if(entries) {
        let htmlEntries = []
        let htmlAmount = 0

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]

            let value = entry.value
            htmlAmount += value
            const classEntry = value > 0 ? 'earned' : 'spent'
            const imgEntry = value > 0 ? 'fas fa-plus-circle' : 'fas fa-minus-circle'

            value = value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,  
              maximumFractionDigits: 2
            });

						const date = new Date(entry.date).toLocaleDateString()

            const html = ` 
							<div class="entryBlock">
                <div class="entryImage">
								  <i class="${imgEntry}"></i>
                </div>
								<div class="entryDescription">
										<span class="value ${classEntry}">R$ ${value}</span>
										<span>${date}</span>
										<span>${entry.description}</span>
								</div>
							</div>
            `
						htmlEntries += html
        }
				$('#entryArea').innerHTML = htmlEntries
        showAmount(htmlAmount)
    }
}

function showAmount(htmlAmount) {
  let amount = htmlAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })
  $('#income').innerText = `R$ ${amount}`

  let color = 'blue'
  if (htmlAmount < 0) {
    color = 'red'
  }
  $('#income').style.color = color
}

function saveOnLocalStorage() {
  localStorage.setItem('entries', JSON.stringify(entries))
}

function cleanForm() {
    $('#value').value = ''
    $('#description'). value = ''
    $('#date').value = ''
}