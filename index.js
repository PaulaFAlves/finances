const $ = document.querySelector.bind(document)

function formDisplay() {
    const formEntry = document.getElementById('formEntry')
    const display = formEntry.style.display
    formEntry.style.display = display === 'block' ? 'none' : 'block'

    let newEntries = document.getElementById('newEntries')

    newEntries.innerHTML =
        newEntries.innerHTML === 'Esconder' ? 'Novo Lançamento' : 'Esconder'
}

const entries = []

function submitForm(e) {
    e.preventDefault()

    let entry = {
        value: parseFloat($('#value').value),
        description: $('#description'). value,
        date: $('#date').value
    }

    entries.push(entry)
    console.log(entries)
    cleanForm()
		showEntries()
    $('#value').focus()
}

function showEntries() {
    if(entries) {
        let htmlEntries = []

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]

            let value = entry.value
            const classEntry = value > 0 ? 'earned' : 'spent'
            const imgEntry = value > 0 ? 'fas fa-plus-circle' : 'fas fa-minus-circle'

            value = value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,  
              maximumFractionDigits: 2
            });
            console.log(typeof value)

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
    }
}

function cleanForm() {
    $('#value').value = ''
    $('#description'). value = ''
    $('#date').value = ''
}