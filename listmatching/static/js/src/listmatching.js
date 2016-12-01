/* Javascript for ListMatchXBlock. */
function ListMatchXBlock(runtime, element) {

    function updateResult(result) {
        console.log(result);

        //$('#matched', element).text("matched");
    }

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


        // creating random options for select html
        var option_positions = {
            0: '1',
            1: '2',
            2: '3',
            3: '4'
        };
        var positions = [0,1,2,3];

        // test if shuffle is good
        while(!test_shuffle(shuffle(positions)));

        var option = "";
        for(var i=0; i<4; i++){
            var index = positions[i];
            var value = option_positions[index];
            option += "<option value='"+ index + "'>" + value +
                                                "</option>";
        }
        $("#right_list").html(option);
    });

    function test_match() {
        list_state = [];

        //getting positions
        list_state[0] = $("#right_list option[value='0']", element).index();
        list_state[1] = $("#right_list option[value='1']", element).index();
        list_state[2] = $("#right_list option[value='2']", element).index();
        list_state[3] = $("#right_list option[value='3']", element).index();

        var result = [0, 1, 2, 3];
        if (list_state[0] == result[0] &&
            list_state[1] == result[1] &&
            list_state[2] == result[2] &&
            list_state[3] == result[3]) {
            $('#matched', element)
                .css("color","green")
                .text("List Matches ");
        } else {
            $('#matched', element)
                .css("color","red")
                .text("No Matches");
        }
    }
    function shuffle(array) {
        // Fisher-Yates (aka Knuth) Shuffle.

        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function test_shuffle(shuffled){

        for(var i=0; i<shuffled.length; i++){
            if(shuffled[i] != i)
                return true;
        }
        return false;
    }
}
