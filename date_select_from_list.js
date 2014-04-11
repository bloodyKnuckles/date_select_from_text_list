(function () {

    var months = ['', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    var current_time  = new Date();
    var current_month = current_time.getMonth() + 1;
    var current_day   = current_time.getDate();
    var current_year  = current_time.getFullYear();

    var date_month_list_children = document.getElementById('date_select_month').getElementsByTagName('a');
    for ( var ii = 0, month_len = date_month_list_children.length; ii < month_len; ii++ ) {
        if ( months[current_month] == date_month_list_children[ii].innerHTML ) {
            date_month_list_children[ii].className += '  date_select_month_current';
        }
    }

    var date_day_list_children = document.getElementById('date_select_day').getElementsByTagName('a');
    for ( var ii = 0, day_len = date_day_list_children.length; ii < day_len; ii++ ) {
        var day_value = date_day_list_children[ii].innerHTML.replace('&nbsp;', '');
        if ( current_day == day_value ) {
            date_day_list_children[ii].className += '  date_select_day_current';
        }
    }

    var date_year_list_children = document.getElementById('date_select_year').getElementsByTagName('a');
    for ( var ii = 0, year_len = date_year_list_children.length; ii < year_len; ii++ ) {
        if ( current_year == date_year_list_children[ii].innerHTML ) {
            date_year_list_children[ii].className += '  date_select_year_current';
        }
    }

    function myHandler(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
    
        if ( target.className.match(/\bdate_year_nav\b/) ) {
            var iii = 0;
            if ( target.className.match(/\bdate_year_nav_prev\b/) ) { iii = -1; }
            else if ( target.className.match(/\bdate_year_nav_next\b/) ) { iii = 1; }
            var date_select_year_children = document.getElementById('date_select_year').getElementsByTagName('a'); 
            for ( var ii = 0, year_len = date_select_year_children.length; ii < year_len; ii++ ) {
                var year_value = parseInt(date_select_year_children[ii].innerHTML);
                if ( !isNaN(year_value) ) {
                    date_select_year_children[ii].innerHTML = year_value + iii;
                    date_select_year_children[ii].className = date_select_year_children[ii].className.replace(' date_select_year_current', '');
                    if ( current_year == year_value + iii ) {
                        date_select_year_children[ii].className += '  date_select_year_current';
                    }
                }
            }
        }

        if ( target.className.match(/\bdate_select\b/) ) {
            var date_select_text = document.getElementById('date_select_text');
            var date_select_values;
            if ( date_select_values = 
                date_select_text.innerHTML.match(/^([A-Z][a-z]{2}\.?)? ?(\d{1,2})?(, )?(\d{4})?$/) ) {

                var select_month, select_day, select_year;
                if ( target.innerHTML.match(/^[A-Z][a-z]{2}\.?$/) ) {
                    select_month = target.innerHTML;
                    select_day   = ( date_select_values[2] )? date_select_values[2]: '';
                    select_year  = ( date_select_values[4] )? date_select_values[4]: '';
                }
                else if ( target.innerHTML.match(/^(&nbsp;|\d)\d$/) ) {
                    select_month = ( date_select_values[1] )? date_select_values[1]: '';
                    select_day   = target.innerHTML.replace('&nbsp;', '');
                    select_year  = ( date_select_values[4] )? date_select_values[4]: '';
                }
                else if ( target.innerHTML.match(/^\d{4}$/) ) {
                    select_month = ( date_select_values[1] )? date_select_values[1]: '';
                    select_day   = ( date_select_values[2] )? date_select_values[2]: '';
                    select_year  = target.innerHTML;
                }
                if ( typeof select_month != 'undefined' && 
                     typeof select_day   != 'undefined' && 
                     typeof select_year  != 'undefined' ) {
                    var day_year_delim = ( ('' != select_year &&  '' != select_day) )?  ', ': '';
                    date_select_text.innerHTML = select_month + ' ' + select_day + day_year_delim + select_year;
                }
                else {
                    date_select_text.innerHTML = 'oops try again';
                }
            }
            else {
                var select_value = target.innerHTML.replace('&nbsp;', '');
                date_select_text.innerHTML = select_value;
            }
            return true;
        }
    }

    if (document.body.addEventListener) {
            document.body.addEventListener('click',myHandler,false);
    }
    else {
        document.body.attachEvent('onclick',myHandler);
    }

}());