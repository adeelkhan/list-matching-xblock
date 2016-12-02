/* Javascript for ListMatchXBlock. */
function ListMatchXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'check_list');

    $('#right_list', element).change(function(eventObject) {
        test_match();
    });

    $('#up',element).on("click",function(evt){
        $('select#right_list option:selected').each(function(){
           $(this).insertBefore($(this).prev());
          });
        test_match();
    });

    $('#down',element).on("click",function(evt){
        $('select#right_list option:selected').each(function(){
           $(this).insertAfter($(this).next());
          });
        test_match();
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });

    function test_match() {
        var list_state = [];
         var result = [0, 1, 2, 3];

        // getting and testing positions of options in <select>
        // and testing their order

        list_state.push( $("#right_list option[value='1']", element).index());
        list_state.push( $("#right_list option[value='2']", element).index());
        list_state.push( $("#right_list option[value='3']", element).index());
        list_state.push( $("#right_list option[value='4']", element).index());

        var right_order = true;
        for (var i = 0 ; i < result.length ; i++){
            if(list_state[i] != result[i]){
                $('#matched', element)
                .css("color","red")
                .text("No Matches");
                right_order = false;
                break;
            }
        }
        // if order matches
        if(right_order){
            $('#matched', element)
            .css("color","green")
            .text("List Matches ");
        }
    }
}
