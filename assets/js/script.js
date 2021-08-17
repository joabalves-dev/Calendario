const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

let now = new Date();
let mes = now.getMonth();
let ano = now.getFullYear();


function getDaysCalendar(mes, ano) {
    /* Alterando a tag Mês */
    document.querySelector('#mes h1').innerHTML = meses[mes];
    /* Alterando a tag Ano */
    document.querySelector('.box-ano h1').innerHTML = ano;

    /* informa qual o primeiro dia da semanda */
    let firstDayWeek = new Date(ano, mes, 1).getDay() - 1;
   
    /* Informa qual o  dia do proximo mês */
    let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

    /* laço responsavel por povoar o calendario */
    for (let i = -firstDayWeek, index = 0; i < (42 - firstDayWeek); i++, index++) {
        let dt = new Date(ano, mes, i);
        let dtNow = new Date();
        let daytable = document.querySelectorAll('tbody td')[index];
        daytable.classList.remove('last-month');
        daytable.classList.remove('next-month');
        daytable.classList.remove('now');
        daytable.innerHTML = dt.getDate();
        if (dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() && dt.getDate() == dtNow.getDate()) {
            daytable.classList.add('now');
        }
        if (i < 1) {

            daytable.classList.add('last-month');
        }
        if (i > getLastDayThisMonth) {
            daytable.classList.add('next-month');
        }
    }
}

/* Ações dos botões responsáveis pelos meses */
let pass = document.querySelectorAll('.box-mes a');
pass.forEach(e => {
    e.addEventListener('click', (event) => {
        event.preventDefault();
        switch (e.className) {
            case 'next':
                mes++;
                if (mes > 11) {
                    mes = 0
                    ano++;
                }
                getDaysCalendar(mes, ano)
                break;
            case 'prev':
                mes--;
                if (mes < 0) {
                    mes = 11;
                    ano--;
                }
                getDaysCalendar(mes, ano)
                break;
            default:
                return false;
        }
    })
})

window.onload = () => {

    /* Exculta primera vez após pagina carregada */
    getDaysCalendar(mes, ano);

};