function formDisplay() {
    const formEntry = document.getElementById('formEntry')
    const display = formEntry.style.display
    formEntry.style.display = display === 'block' ? 'none' : 'block'

    let newEntries = document.getElementById('newEntries')
        
    newEntries.innerHTML =
        newEntries.innerHTML === 'Esconder' ? 'Novo Lançamento' : 'Esconder'
}