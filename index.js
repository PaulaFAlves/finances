const $ = document.querySelector.bind(document)

function formDisplay() {
    const formEntry = document.getElementById('formEntry')
    const display = formEntry.style.display
    formEntry.style.display = display === 'block' ? 'none' : 'block'

    let newEntries = document.getElementById('newEntries')

    newEntries.innerHTML =
        newEntries.innerHTML === 'Esconder' ? 'Novo Lançamento' : 'Esconder'
}

const entriesOnLocalStorage = localStorage.getItem('entries')
const entries = 
  entriesOnLocalStorage ? JSON.parse(entriesOnLocalStorage) : []
showEntries()

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
    $('#value').focus()
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