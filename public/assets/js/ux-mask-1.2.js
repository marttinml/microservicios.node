/*
* ux-mask-1.0.js
* Miguel Ángel Rojas Medina
* 12-09-2014
* dependences :[jquery-1.8.2.min.js]
* Update by: Martin Martinez Lopez
* Update date: 6-10-2014 v1 1.2
*/ 
/*
* $('.pass').inputMask({mask:'●●●● ●●●● ●●●● ●000',type:'card'}); //para tarjeta
* $('.pass').inputMask({mask:'●●●●●●●●●●●',type:'pass'});         //para contraseña
* $('.pass').trigger('empty');
* var cardValue = $('.pass').trigger('input').data('val');
*/




(function($){ 
  $.fn.inputMask=function(options){ 
          var opts=$.extend({},$.fn.inputMask.defaults,options);
          var inputLength = $(this).length;
          for(var i = 0; i < inputLength; i++){
            $.fn.inputMask.formt($(this).eq(i),opts); 
          }
          return $(this);
  };
  
  $.fn.inputMask.formt = function(cntl,opts){

        cntl.attr('maxlength',opts.mask.length);
        cntl.on('empty',emptyTextInput);
        cntl.on('input',function(){
          $(this).data("val", opts.legalText); 
        });

        function emptyTextInput(){
          cntl.val('');
          opts.legalText    = '';
          opts.source       = '';
          opts.j            = 0;
          opts.lastLetters  = '';
        }
        function emptyText(){
          opts.legalText    = '';
          opts.source       = '';
          opts.j            = 0 ;
          opts.lastLetters  = '';
        }

        function clearInputOnebyOne(e){
          var temp = cntl.val();
          clearTimeout(opts.timer);
          opts.j--;
          opts.legalText  = opts.legalText.substring(0,opts.legalText.length-1);
          opts.source     = opts.source.substring(0,opts.source.length-1);

          console.log(opts.source+' - '+opts.legalText);

          if(temp.substring(temp.length-2,temp.length-1) == ' '){
            opts.j--;
            cntl.val(temp.substring(0,temp.length-1));
          }
          //cntl.val(cntl.val().substring(0,cntl.val().length));
        }

        switch(opts.type){
          case 'card':
        
                        clearTimeout(opts.timer);
                      cntl.bind('keydown',function(e){
                        if(!(( e.which > 47 && e.which < 58 ) || (e.which > 95 && e.which < 106) || e.which == 8) && e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 && e.which != 16 && e.which != 36 && e.which != 13 && e.which != 8 && e.which != 224 && e.which != 86) {
                            e.preventDefault();
                        }
                        if(e.which === 8){
                          clearInputOnebyOne(e);

                        }
                        
                          
                      });

                      cntl.bind('keyup',function(e){

                        if(cntl.val()==e.key){//clear when input is selected
                            emptyText();
                          }

                        var temp = cntl.val();
                        if(temp == ''){
                                opts.legalText = '';
                                cntl.val('');
                                opts.legalText = '';
                                opts.j = 0;
                            }
                            
                          if(e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 && e.which != 16 && e.which != 36 ){
                            if(( e.which > 47 && e.which < 58 ) || (e.which > 95 && e.which < 106) || e.which != 8){
                              processLetter(e);
                            }else{
                              e.preventDefault();   
                            }                            
                          }else{
                            e.preventDefault();
                          }
                          if(e.which === 8){
                            var newVal = cntl.val().substring(0, cntl.val().length-1) + opts.legalText.substring(opts.legalText.length-1, opts.legalText.length);
                            cntl.val(newVal);
                          }
                      });
            break;
          case 'pass':
                      cntl.bind('keydown',function(e){
                          clearTimeout(opts.timer);}
                      );

                      cntl.bind('keyup',function(e){
                          if(e.which === 8){
                            clearInputOnebyOne(e);
                          }
                      });

                      cntl.bind('keyup',function(e){

                        if(cntl.val()==e.key){
                            emptyText();
                          }

                        var temp = cntl.val();
                        if(temp == ''){
                                opts.legalText = '';
                                cntl.val('');
                                opts.legalText = '';
                                opts.j = 0;
                            }

                          /*if(cntl.val().length == 1){
                            emptyText();
                          }*/
                          if(e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 && e.which != 16 && e.which != 36 && e.which != 8){
                            processLetter(e);
                          }
                      });
            break;
        }

        function processLetter(e){
              var temp = cntl.val();
                opts.source = opts.source + temp.substring(opts.j,temp.length);

                if(e.which != 8){
                        if(opts.legalText.length != opts.source.length){ 
                          
                          opts.lastLetters = opts.source.replace(opts.exp1,''); 
                          opts.legalText = opts.legalText + opts.lastLetters; 
                        }
                }else{ 
                        
                }


                var formater = '';
                opts.j       = 0 ;
                opts.source  = '';

                for(var i = 0; i < opts.legalText.length; i++){

                        charText = opts.mask.substring(opts.j,opts.j+1); 
                        charTextNext = opts.mask.substring(opts.j+1,opts.j+2); 
                        opts.source = opts.source + '*';

                        if (charText == '0') {
                                formater = formater + opts.legalText.substring(i,i+1); 
                        }else{
                          if(i == (opts.legalText.length -1)){
                            formater = formater + opts.legalText.substring(i,i+1);
                          }else{
                            formater = formater + charText; 
                          }
                                
                        } 
                        if(charTextNext == ' '){ 
                                formater = formater + charTextNext; 
                                opts.j ++; 
                        } 
                        opts.j ++;
                }

                cntl.val(formater);
                
                clearTimeout(opts.timer);
                opts.timer = setTimeout(function(){

                    var formater = '';
                    opts.j            = 0 ;
                    opts.source       = '';
                    for(var i = 0; i < opts.legalText.length; i++){

                          charText = opts.mask.substring(opts.j,opts.j+1); 
                          charTextNext = opts.mask.substring(opts.j+1,opts.j+2); 
                          opts.source = opts.source + '*';

                          if (charText == '0') {
                                  formater = formater + opts.legalText.substring(i,i+1); 
                          }else{                            
                            formater = formater + charText;       
                          } 
                          if(charTextNext == ' '){ 
                                  formater = formater + charTextNext; 
                                  opts.j ++; 
                          } 
                          opts.j ++;
                  }
                  cntl.val(formater);
                },300);

        }

  }; 
  
  $.fn.inputMask.defaults={ 
      mask:'', 
      maxvalue : '',
      mask   : '',
      maxval   : 19,
      legalText: '', 
      source   : '', 
      j        : 0, 
      exp1     : /(\ )|(\*)/g,
      lastLetters : '',
      timer:null,
      type:''
  }; 
})(jQuery)