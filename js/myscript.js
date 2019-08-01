

$(function (myTest) {
    $.get('https://jsonplaceholder.typicode.com/todos', function(data) {
        console.log(data);
        userIds=[]; 

        $.each(data, function(i, v){

            // filter stuff
            if(!userIds.includes(v.userId)) { 
                userIds.push(v.userId);  
                    $('#filterbar').append( 

                    '<li>' + v.userId + '</li>'
                    );  
                }

            // isComplete stuff
            var iscomplete = '';
            if (v.completed) {
                 iscomplete = 'Complete';

            }else {
                 iscomplete = 'Incomplete';
            }

            // create main box
            $('.mybox').append( 
                
                '<div class="container" data-user_id="' + v.userId + '">' +
                '<div class="head" > Task</div>' + 

                '<div class="user">User ' +v.userId + '</div>'  +
                '<div class="body"> ' +v.title + '</div>'  +
                '<div   class="foot '+iscomplete.toLowerCase() + ' "> ' +iscomplete + '</div>'  
               
                +'</div>' 
                              
            );
        }) // eo each

    }) //eo get data


    //click event
    $( '#mainouter').on('click', '.foot', function(e) {
        e.stopPropagation();
        console.log( "test for .click() called." );
         
        if($(this).hasClass('complete')){
                 $(this).removeClass('complete').addClass('incomplete').text('Incomplete');
        }else{
            $(this).removeClass('incomplete').addClass('complete').text('Complete');
        }
    
    });

    //Filter
    var filterArr = [];
    $( '#filterbar').on('click', 'li', function(e) {
        var myText = parseInt($(this).text() );
        console.log('myText: '+myText)

        // this is to add/remove items from filter and change class
        if ($(this).hasClass('active') ){
            console.log('yep')
            var idx = filterArr.indexOf(myText);
            console.log('idx: '+ idx)
            console.log('filterArr: '+ filterArr)
            filterArr.splice(idx, 1);
            $(this).removeClass( "active" );

        }else{
            console.log('nope')
            $(this).addClass( "active" );
            filterArr.push(myText);
        }

        // show/Hide
        if (filterArr.length == 0) {
             $('.container').show();
          } else {
            $('.container').each(function() {
              if (filterArr.indexOf($(this).data('user_id')) > -1) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }

    });

}); // eo mytest


