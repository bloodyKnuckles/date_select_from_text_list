(function () {

    var current_time  = new Date();
    var current_year  = current_time.getFullYear();
    var current_month = current_time.getMonth() + 1;
    var current_day   = current_time.getDate();

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
                date_select_text.innerHTML.match(/^([A-Z][a-z]{2}\.?)? ?((&nbsp;|\d)\d)?(, )?(\d{4})?$/) ) {

                var select_month, select_day, select_year;
                if ( target.innerHTML.match(/^[A-Z][a-z]{2}\.?$/) ) {
                    select_month = target.innerHTML;
                    select_day   = ( date_select_values[2] )? date_select_values[2]: '';
                    select_year  = ( date_select_values[5] )? date_select_values[5]: '';
                }
                else if ( target.innerHTML.match(/^(&nbsp;|\d)\d$/) ) {
                    select_month = ( date_select_values[1] )? date_select_values[1]: '';
                    select_day   = target.innerHTML.replace('&nbsp;', '');
                    select_year  = ( date_select_values[5] )? date_select_values[5]: '';
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
                date_select_text.innerHTML = target.innerHTML;
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