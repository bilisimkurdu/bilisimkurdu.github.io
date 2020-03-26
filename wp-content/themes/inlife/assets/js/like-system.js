(function( $ ) {
    'use strict';
    $(document).on('click', '.sl-button', function() {
        var button = $(this);
        var post_id = button.attr('data-post-id');
        var security = button.attr('data-nonce');
        var iscomment = button.attr('data-iscomment');
        var allbuttons;
        if ( iscomment === '1' ) { /* Comments can have same id */
            allbuttons = $('.sl-comment-button-'+post_id);
        } else {
            allbuttons = $('.sl-button-'+post_id);
        }
        if (post_id !== '') {
            $.ajax({
                type: 'POST',
                url: simpleLikes.ajaxurl,
                data : {
                    action : 'inlife_process_like',
                    post_id : post_id,
                    nonce : security,
                    is_comment : iscomment
                },
                success: function(response){
                    var icon = response.icon;
                    var count = response.count;
                    allbuttons.html(icon+count);
                    if(response.status === 'unliked') {
                        var like_text = simpleLikes.like;
                        allbuttons.prop('title', like_text);
                        allbuttons.removeClass('liked');
                        allbuttons.addClass('unliked');
                    } else {
                        var unlike_text = simpleLikes.unlike;
                        allbuttons.prop('title', unlike_text);
                        allbuttons.addClass('liked');
                        allbuttons.removeClass('unliked');
                    }
                }
            });

        }
        return false;
    });
})( jQuery );
