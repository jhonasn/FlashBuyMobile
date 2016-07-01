/*
 - Javascript para checar e monitorar a conectividade com a Internet;
 - Necessário Materialize para colocar os Toasts em funcionamento;
 - Utilizado metodologia de load de imagem (Li que é deprecated, mas atende bem por enquanto);

*/
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
        }
    }
    //Function que será executada quando não estiver conectado
    function desconectado() {
        Materialize.toast('Verifique sua conexão com a Internet.', 4000);
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
}
//Inicio um interval para testar a conexão a cada 5 segundos
var timeInterval = setInterval(testarConexao, 5000);
