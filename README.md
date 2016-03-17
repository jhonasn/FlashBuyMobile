# FlashBuyMobile

##Plugins:
 - [phonegap-plugin-barcodescanner](https://github.com/phonegap/phonegap-plugin-barcodescanner)
 - [cordova-plugin-device](https://github.com/apache/cordova-plugin-device)

##Instalação
```bash
cd [sua pasta de projetos]

git clone https://github.com/jhonasn/FlashBuyMobile.git
cd FlashBuyMobile

cordova platform add android ios windows wp8 browser
cordova plugin add phonegap-plugin-barcodescanner cordova-plugin-device

#instalação do servidor para testes no pc com atualização de código automática
#deve executar com terminal com permissão de administrador
npm install lite-server -g
#iniciar servidor:
cd [sua pasta de projetos]
cd FlashBuyMobile
cd www
lite-server
```

##[JavaScript Material de Apoio](https://github.com/jhonasn/FlashBuyMobile/blob/master/apoio/JavaScript%20Documento%20de%20Apoio%20PI.md)
