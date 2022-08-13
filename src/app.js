class despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
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

}
let itemBancoDados = new bancoDados()



function cadastrarDespesas() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesas = new despesa(
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
    } else {

        document.getElementById('modalTitle').innerHTML = 'Preencha os campos corretamente  '
        document.getElementById('modalSucessTitle').className = 'modal-header text-danger '
        document.getElementById('textAlert').innerHTML = 'Erro na gravação, verifique se todos os campos estaos preenchidos  '
        document.getElementById('botaomodal').className = 'btn btn-primary btn-danger'
        document.getElementById('botaomodal').innerHTML = 'Voltar  e corrigir '

        
     $('#modalRegistro').modal('show')
        //dialogo de erro 
    }

}



