/* Javascript for ListMatchXBlock. */
function ListMatchXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'check_match');

    function match_status(result){

         if(result.answer == "matched"){
            $('#matched', element)
                .css("color","green")
                .text("List Matches ");
         }else{
             $('#matched', element)
                .css("color","red")
                .text("No Matches");
         }
    }

    $('#up',element).on("click",function(evt){

        $('select#right_list option:selected').each(function(){
           $(this).insertBefore($(this).prev());
          });
        check_match()
    });

    $('#down',element).on("click",function(evt){

        $('select#right_list option:selected').each(function(){
           $(this).insertAfter($(this).next());
          });
        check_match()
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
        check_match()

    });

    function check_match(){
        var options_order= [];
        get_positions(options_order);

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                options_order: options_order
                }
            ),
            success: match_status
        });
    }

    function get_positions(list_state){

        var selector = "#right_list option[value]";
        var options = $(selector, element);

        for (var i=0; i<options.length; i++){
            list_state.push(options[i].value);
        }
    }

}
