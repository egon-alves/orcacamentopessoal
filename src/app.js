class listDespesas {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class bancoDados {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem('id')
        for (let i = 1; i <= id; i++) {
            let todasDespesas = JSON.parse(localStorage.getItem(i))

            if (todasDespesas === null) {
                continue
            }
            todasDespesas.id = i
            despesas.push(todasDespesas)

        }

        return despesas
    }


    pesquisar(despesas) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        // console.log(despesasFiltradas, 'Inicio')
        // Ano 

        if (despesas.ano != '') {
            console.log('Filtro Ano ')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesas.ano)
        }
        // mes
        if (despesas.mes != '') {
            console.log('Filtro Mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesas.mes)
        }

        // dia 
        if (despesas.dia != '') {
            console.log('Filtro dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesas.dia)
        }

        // tipo 
        if (despesas.tipo != '') {
            console.log('Filtro tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesas.tipo)
        }
        // descri????o 
        if (despesas.descricao != '') {
            console.log('Filtro descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesas.descricao)
        }
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}


let itemBancoDados = new bancoDados()

function cadastrarDespesas() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesas = new listDespesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    if (despesas.validarDados()) {
        itemBancoDados.gravar(despesas)

        document.getElementById('modalTitle').innerHTML = 'Registro inserido com sucesso   '
        document.getElementById('modalSucessTitle').className = 'modal-header text-sucess '
        document.getElementById('textAlert').innerHTML = 'Despesa registrada com sucesso '
        document.getElementById('botaomodal').className = 'btn btn-primary btn-sucess'
        document.getElementById('botaomodal').innerHTML = 'Voltar '

        // dialogo de sucess
        $('#modalRegistro').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById('modalTitle').innerHTML = 'Preencha os campos corretamente  '
        document.getElementById('modalSucessTitle').className = 'modal-header text-danger '
        document.getElementById('textAlert').innerHTML = 'Erro na grava????o, verifique se todos os campos estaos preenchidos  '
        document.getElementById('botaomodal').className = 'btn btn-primary btn-danger'
        document.getElementById('botaomodal').innerHTML = 'Voltar  e corrigir '


        $('#modalRegistro').modal('show')
        //dialogo de erro 
    }
}


// area JS consulta

function carregaListaDespesas(despesas = Array(), filtro = false) {


    if (despesas.length == 0 && filtro == false) {
        despesas = itemBancoDados.recuperarTodosRegistros()
    }



    let listaDespesas = document.getElementById('listaDespesasPage')
    listaDespesas.innerHTML = ''
    despesas.forEach(function (d) {

        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch (d.tipo) {
            case '1': d.tipo = 'Alimenta????o'
                break
            case '2': d.tipo = 'Educa????o'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Sa??de'
                break
            case '5': d.tipo = 'Educa????o'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // isserir botao  
        let btn = document.createElement('button')

        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class= "fas fa-times"></i>'
        btn.id = 'idDespesa' + d.id


        btn.onclick = function () {



            let id = this.id.replace('idDespesa', '')




            if (confirm("Deseja mesmo exluir?") == true) {
                itemBancoDados.remover(id)

                window.location.reload()
            } else {

                window.location.reload()
            }



            window.location.reload()

        }
        linha.insertCell(4).append(btn)
        console.log(d);
    })
}

function pesquisarDispesa() {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesaPesquisar = new listDespesas(ano, mes, dia, tipo, descricao, valor)

    let despesas = itemBancoDados.pesquisar(despesaPesquisar)

    this.carregaListaDespesas(despesas, true)


}