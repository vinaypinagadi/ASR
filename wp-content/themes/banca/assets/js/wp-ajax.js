;
(function($) {

    "use strict";

    $(document).on('click', '.load_more a:not(.loading)', function() {

        let that = $(this)
        let page = that.data('page');
        let newPage = page + 1;
        that.addClass('loading')

        console.log(newPage);

        $.ajax({
            url: load_more_btn.ajax_url,
            type: 'POST',
            data: {
                'page': page,
                'action': 'job_load_more_btn'
            },

            error: function(response) {
                console.log(response);
            },

            success: function(response) {
                that.data('page', newPage)
                $('.more_post_ajax').append(response)
                that.removeClass('loading')
            }

        });

    });

})(jQuery);