

$(document).ready(() => {

    (function() {

        var accordeonTabsItems = $('.accordeon-tabs__item');
        var accordeonTabsLinks = $('.accordeon-tabs__link');
        var accordeonTabsContent = $('.accordeon-tabs__content');
        var $window = $(window);
        
        //// Click Stuff
        accordeonTabsContent.hide();
    
        accordeonTabsLinks.click(function() {
            var clickedLink = $(this);
            var activeContent = accordeonTabsContent.eq(accordeonTabsLinks.index(clickedLink));
            if ($('html').hasClass('bp600')) {
                hideElements();
                clickedLink.addClass('isActive').parent(accordeonTabsItems).addClass('isActive');
                activeContent.addClass('isActive').show();
            $('.accordeon-tabs').css('min-height', activeContent.outerHeight());
            } else {
            clickedLink.toggleClass('isActive');
            clickedLink.parent(accordeonTabsItems).toggleClass('isActive');
            activeContent.toggle().toggleClass('isActive');
            }
        });
        
        //// Helper Functions
        function hideElements() {
            accordeonTabsItems.removeClass('isActive');
            accordeonTabsLinks.removeClass('isActive');
            accordeonTabsContent.removeClass('isActive').hide(); 
        }
        function showFirst() {
            accordeonTabsItems.first().addClass('isActive');
            accordeonTabsLinks.first().addClass('isActive');
            accordeonTabsContent.first().addClass('isActive').show();
        }
    
        //// Window Resize Stuff
        $(window).on('windowResized', function (event) {
            console.log(event.isDesktop);
    
            if (event.isDesktop) {
                $('html').addClass('bp600');
                var activeElements = $('.isActive');
                // on desktop we want to have a active tab
                if (activeElements.length == 0) {
                    showFirst();
                // if we switch from mobile to dekstop and have 
                // more than one active tab, we set the first to
                //  active and hide the rest	 
                } else if (activeElements.length > 1) {
                    hideElements();
                    showFirst();
                }
            } else {
                $('html').removeClass('bp600');
            }
        });
    
    
        $window.on('load resize', function() {
            var windowResized = $.Event('windowResized', {
                'isDesktop' : $window.outerWidth() > 600
            });
            $window.trigger(windowResized);
        });
        
        
        
    
    }());



})

