/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams, $compile) {

        // $scope.toDetail = false;
        // $scope.detail = {};
        $scope.spin = false;

        $scope.showDetail = function(item, id){

            $scope.item = item;
            $scope.career;
            var element = document.getElementById(id);
            var elementCloned =  element.cloneNode(true);
            elementCloned.classList.add('wrapper-item-cloned');
            elementCloned.setAttribute('id', id + 'cloned');
            elementCloned.removeAttribute('ng-repeat');
            elementCloned.childNodes[1].setAttribute('ng-click','hideDetail("'+id+'cloned'+'", '+element.offsetTop+')');
            elementCloned.style.top = (element.offsetTop - 10) + 'px';

            var linkFn = $compile(angular.element(elementCloned));
            var content = linkFn($scope);
            var elementContent = angular.element(document.getElementById("contentItems")).append(content);
            
            // Animation
            setTimeout(() => {
                elementCloned.classList.add('transition');
                // window.scrollTo(0,0);
                $("HTML, BODY").animate({ scrollTop: 0 }, 200);
            }, 100);

        };

        $scope.showConsumos = function(id){
            var element = document.getElementById(id);
            var elementCloned =  element.cloneNode(true);
            elementCloned.classList.add('wrapper-item-cloned');
            elementCloned.setAttribute('id', id + 'cloned');
            elementCloned.childNodes[1].setAttribute('ng-click','hideConsumos("'+id+'cloned'+'", '+element.offsetTop+')');
            elementCloned.style.top = (element.offsetTop - 10) + 'px';

            var linkFn = $compile(angular.element(elementCloned));
            var content = linkFn($scope);
            var elementContent = angular.element(document.getElementById("contentItems")).append(content);
            
            // console.log(elementCloned.childNodes[5].childNodes[1]);
            // elementCloned.childNodes[5].childNodes[5].childNodes[1].setAttribute('id','myChartCloned');
            
            var element = document.getElementById('contentConsumos');
            var elementContent = angular.element(elementCloned).append(element);
            // Animation
            setTimeout(() => {
                elementCloned.classList.add('transition');
                $scope.factoryBar($scope.chart);
                // window.scrollTo(0,0);
                $("HTML, BODY").animate({ scrollTop: 0 }, 200);
            }, 100);
        };

        $scope.factoryBar = function(obj){
            var ctx = document.getElementById('myChart').getContext('2d');
                Chart.defaults.global.defaultFontSize = 8;
                var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: obj.labels,
                    datasets: [{
                        label: "",
                        backgroundColor: $scope.carrer,
                        borderColor: 'none',
                        data: obj.data,
                    }]
                },

                // Configuration options go here
                options: {
                    responsive: true, 
                    maintainAspectRatio: false, 
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }

                }
            });
        };

        $scope.hideDetail = function(id, top){
            var el = document.getElementById(id);
            el.classList.remove('transition');
        
            setTimeout(() => {
                $scope.item = {};
                el.remove();
            }, 300);
        };

        $scope.hideConsumos = function(id, top){
            var el = document.getElementById(id);
            el.classList.remove('transition');
        
            setTimeout(() => {
                var element = document.getElementById('contentConsumos');
                var elementContent = angular.element(document.getElementById('wrappersContents')).append(element);
                el.remove();
            }, 300);
        };

        $scope.getColums = function(obj){
            var col = 0;
            col += obj.limitado ? 1 : 0;
            col += obj.ilimitado ? 1 : 0;
            col += obj.bolsas ? 1 : 0;
            col += obj.saldo ? 1 : 0;
            col += obj.beneficios ? 1 : 0;
            col += obj.monedas ? 1 : 0;
            return 'col-' + col;
        };

        $scope.resetTabs = function(tabs){
            for(var i in tabs){
                tabs[i] = false;
            }
        };
        $scope.resetConsumosTabs = function(tab){
            for(var i in $scope.consumos){
                $scope.consumos[i].active = false;
            }
            $scope.chart = tab.chart;
            $scope.consumosTable = tab;
            $scope.factoryBar($scope.chart);
            tab.active = true;
        };
        $scope.changePeriodo = function(index){
            for(var i in $scope.radioPeriodo){
                $scope.radioPeriodo[i].active = false;
            }
            $scope.radioPeriodo[index].active = true;
        }

        $scope.consumos = {
            internet: {   
                icono: 'att-consumo-internet',
                tipo: 'Internet',
                titulos: ['Fecha', 'MB'],
                contenido: [
                    ['1 Sep', '8'],
                    ['2 Sep', '8'],
                    ['3 Sep', '8'],
                    ['4 Sep', '8'],
                    ['5 Sep', '8'],
                    ['6 Sep', '8'],
                    ['7 Sep', '8'],
                    ['8 Sep', '8'],
                    ['9 Sep', '0'],
                    ['10 Sep', '8'],
                    ['11 Sep', '8'],
                    ['12 Sep', '8'],
                    ['13 Sep', '8'],
                    ['15 Sep', '8'],
                    ['16 Sep', '8'],
                    ['17 Sep', '8'],
                    ['18 Sep', '8'],
                    ['19 Sep', '8'],
                    ['20 Sep', '20'],
                    ['21 Sep', '8'],
                    ['22 Sep', '8'],
                    ['23 Sep', '50'],
                    ['25 Sep', '8'],
                    ['26 Sep', '8'],
                    ['27 Sep', '8'],
                    ['28 Sep', '30'],
                    ['29 Sep', '8'],
                    ['30 Sep', '8'],
                ]
            },
            llamadas: {
                icono: 'att-consumo-llamadas',
                tipo: 'Llamadas',
                titulos: ['Número', 'Fecha', 'Minutos', 'Hora','Compañia','Localidad','Costo'],
                contenido: [
                    ['556787001', '1 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '2 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '3 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '4 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '5 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '6 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '7 Sep', '0', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '8 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '9 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '10 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '11 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '12 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '13 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '14 Sep', '20', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '15 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '16 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '17 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '18 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '19 Sep', '10', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '20 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '21 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '22 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '23 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '24 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '25 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '26 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '27 Sep', '10', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '28 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '29 Sep', '5', '5:80','IUSACELL','CDMX','$5,00'],
                    ['556787001', '30 Sep', '5', '5:80','IUSACELL','CDMX','$5,00']
                ]
            },
            mensajes:{
                icono: 'att-consumo-mensajes',
                tipo: 'Mensajes',
                titulos: [],
                contenido: []
            }
        };
       $scope.cartera = {
        "color":"yellow",
        "titulo":"CARTERA",
        "career":"UNEFON",
        "fechaCorte": "07 de Octubre",
        "proximaAsignacion": "27 días",
        "grupos": [
            {
                "icon": "att-money-slim",
                "nombre": "Saldo Total",
                "disponible": "$220",
                "saldo": {
                    "saldo": "$20",
                    "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
                },
                "beneficios": {
                    "saldo": "$200",
                    "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
                }
            },
            {
                "icon": "att-a-slim",
                "nombre": "Monedas",
                "disponible": "$0",
                "monedas": {
                    "saldo": "$0",
                    "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
                }
            },
            {
            "icon": "att-internet-slim",
            "nombre": "Internet",
            "disponible": "6 GB",
            "limitado": {
                "incluido": "14 GB",
                "consumido": "7 GB",
                "disponible":"6 GB",
                "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
            },
            "bolsas":[{
                    "nombre": "Internet Incluido en plan",
                    "incluido": "4 GB",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                },
                {
                    "nombre": "Internet Promoción",
                    "incluido": "4 GB",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                }
            ]
        },
        {
            "icon": "att-group-slim",
            "nombre": "Redes Sociales",
            "disponible": "···",
            "ilimitado": {
                "incluido": "Ilimitado",
                "consumido": "1 GB",
                "descripcion": "Esta bolsa te la puedes gastar en FB TW WA SP INS UB",
            },
            "limitado": {
                "incluido": "2 GB",
                "consumido": "0 GB",
                "disponible":"2 GB",
                "descripcion": "Esta bolsa te la puedes gastar en FB TW WA SP INS UB",
            },
            "bolsas":[{
                    "nombre": "Redes Sociales incluidas",
                    "incluido": "2 GB",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                },
                {
                    "nombre": "Redes sociales",
                    "incluido": "Ilimitado",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                }
            ]
        },
        {
            "icon": "att-messaging-slim",
            "nombre": "Mensajes",
            "disponible": "Ilimitado",
            "ilimitado": {
                "incluido": "Ilimitado",
                "consumido": "42 SMS",
                "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
            },
            "bolsas":[{
                    "nombre": "Internet Incluido en plan",
                    "incluido": "4 GB",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                },
                {
                    "nombre": "Internet Promoción",
                    "incluido": "4 GB",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                }
            ]
        },
        {
            "icon": "att-caller-history-slim",
            "nombre": "Llamadas",
            "disponible": "Ilimitadas",
            "ilimitado": {
                "incluido": "Ilimitado",
                "consumido": "42 min",
                "descripcion": "Saldo otorgado al realizar una recarga que sirve para adquirir cualquier servicio durante la vigencia de la recarga",
            },
            "bolsas":[{
                    "nombre": "Minutos incluidos comunidad AT&T",
                    "incluido": "Ilimitado",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                },
                {
                    "nombre": "Minutos incluidos otros destinos",
                    "incluido": "Ilimitado",
                    "fechaExpiracion": "21/10/2019",
                    "congelado": false
                }
            ]
        }]
    };

    for(var i in $scope.cartera.grupos){
        var obj = $scope.cartera.grupos[i];
        obj.tabs = { limitado: false, illimitado: false, bolsas: false, saldo: false, beneficios: false, monedas: false  };

        if(obj.ilimitado){
            obj.tabs.ilimitado = true;
        }else{
            if(obj.limitado){
                obj.tabs.limitado = true;
            }else{
                if(obj.bolsas){
                    obj.tabs.bolsas = true;
                }else{
                    if(obj.saldo){
                        obj.tabs.saldo = true;
                    }else{
                        if(obj.beneficios){
                            obj.tabs.beneficios = true;
                        }else{
                            if(obj.monedas){
                                obj.tabs.monedas = true;
                            }
                        }
                    }
                }
            }
        }
    };
    

        
    var internet = $scope.consumos.internet;
    var llamadas = $scope.consumos.llamadas;
    var mensajes = $scope.consumos.mensajes;
    internet.chart = { labels: [], data: []};
    llamadas.chart = { labels: [], data: []};
    mensajes.chart = { labels: [], data: []};

    for(j in internet.contenido){
        var jtem = internet.contenido[j];
        internet.chart.labels.push(jtem[0]);
        internet.chart.data.push(Number(jtem[1]));
    }
    for(j in llamadas.contenido){
        var jtem = llamadas.contenido[j];
        llamadas.chart.labels.push(jtem[1]);
        llamadas.chart.data.push(Number(jtem[2]));
    }
    for(j in mensajes.contenido){
        var jtem = mensajes.contenido[j];
        mensajes.chart.labels.push(jtem[0]);
        mensajes.chart.data.push(jtem[0]);
    }

    
    $scope.radioPeriodo = [{active: true},{active: false}];
    
    internet.active = true;
    $scope.consumosTable = internet;
    $scope.chart = internet.chart;
    $scope.carrer = $scope.cartera.color === 'yellow'? 'rgba(255,198,0,.8)' : 'rgba(0,159,219,.8)';

    setTimeout(function(){
        $scope.spin = true;
        $scope.$apply();
    },1000);
    
    };
    controller.$inject = ['$scope','$rootScope','$routeParams', '$compile'];
    angular.module('app').controller('CarteraController', controller);

})();