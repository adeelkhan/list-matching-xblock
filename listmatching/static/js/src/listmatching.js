/* Javascript for ListMatchXBlock. */
function ListMatchXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'check_match');

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
        var order_to_match = [0, 1, 2, 3];

        get_select_positions(list_state, order_to_match);

        // and testing their order
        var right_order = true;
        for (var i = 0 ; i < order_to_match.length ; i++){

            if(list_state[i] != order_to_match[i]){

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
    function get_select_positions(list_state, order_to_match){
        for (var i=0; i<order_to_match.length; i++){
            var selector = "#right_list option[value=" + parseInt(i+1) + "]";
            var index = $(selector, element).index();
            list_state.push(index);
        }
    }
}
