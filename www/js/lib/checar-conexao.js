/*
 - Javascript para checar e monitorar a conectividade com a Internet;
 - Necessário Materialize para colocar os Toasts em funcionamento;
 - Utilizado metodologia de load de imagem (Li que é deprecated, mas atende bem por enquanto);

*/
//HTML DE MENSAGEM PADRÃO
var $divDesconectado = $("<div id='divDesconectado' class='row'> <div class='col s12 m12'> <div class='amber accent-4 card-panel'> <span class='white-text'>Por favor, verifique sua conexão.</span></div></div></div>");
//Seta o primeiro status para conectado (true)
var ultimoStatus = true;
//Define a function para teste das conexões
function testarConexao() {
    //Function que será executada quando estiver conectado
    function conectado() {
        //Verificação para checar se o app está migrando de um estado offline para online
        //É necessário para que o usuário seja informado apenas quando a conexão VOLTAR!
        if (!ultimoStatus) {
            Materialize.toast('Conexão estabelecida.', 4000);
            ultimoStatus = true;
            jQuery("#divDesconectado").remove();
        }
    }
    //Function que será executada quando não estiver conectado
    function desconectado() {
        jQuery("body").append($divDesconectado);
        ultimoStatus = false;
    }

    /* 
        Aqui encontra-se a verificação em si, se resume em buscar uma imagem que temos certeza
        que estará online, pode ser algo do nosso servidor ou de um servidor confiável 
        - Imagem do Google por exemplo. - 
    */
    
    //Crio um obj Image
    var i = new Image();
    //Relaciono a function de sucesso para quando a imagem for carregada corretamente
    i.onload = conectado;
    //Relacionno a function de fracasso para quando ocorrer  erro no carregamento
    i.onerror = desconectado;
    //Defino o link da imagem que quero utilizar.
    i.src = 'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());
        
        //'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());
}
//Inicio um interval para testar a conexão a cada 5 segundos
var timeInterval = setInterval(testarConexao, 5000);