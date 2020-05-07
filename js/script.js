

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
                } else if (activeElements.length > 2580) {
                    hideElements();
                    showFirst();
                }
            } else {
                $('html').removeClass('bp600');
            }
        });
    
    
        $window.on('load resize', function() {
            var windowResized = $.Event('windowResized', {
                'isDesktop' : $window.outerWidth() > 1
            });
            $window.trigger(windowResized);
        });
        
        
        
    
    }());




    function TabWidget (el, selectedIndex) {

        if (!el) {
            return;
        }
    
        this.el = el;
        this.tabTriggers = this.el.getElementsByClassName('js-tab-trigger');
        this.tabPanels = this.el.getElementsByClassName('js-tab-panel');
    
        if (this.tabTriggers.length === 0 || this.tabTriggers.length !== this.tabPanels.length) {
            return;
        }
    
        this._init(selectedIndex);
    }
    
    TabWidget.prototype._init = function (selectedIndex) {
    
        this.tabTriggersLength = this.tabTriggers.length;
        this.selectedTab = 0;
        this.prevSelectedTab = null;
        this.clickListener = this._clickEvent.bind(this);
        this.keydownListener = this._keydownEvent.bind(this);
        this.keys = {
            prev: 37,
            next: 39
        };
    
        for (var i = 0; i < this.tabTriggersLength; i++) {
            this.tabTriggers[i].index = i;
            this.tabTriggers[i].addEventListener('click', this.clickListener, false);
            this.tabTriggers[i].addEventListener('keydown', this.keydownListener, false);
    
            if (this.tabTriggers[i].classList.contains('is-selected')) {
                this.selectedTab = i;
            }
        }
    
        if (!isNaN(selectedIndex)) {
            this.selectedTab = selectedIndex < this.tabTriggersLength ? selectedIndex : this.tabTriggersLength - 1;
        }
    
        this.selectTab(this.selectedTab);
        this.el.classList.add('is-initialized');
    };
    
    TabWidget.prototype._clickEvent = function (e) {
    
        e.preventDefault();
    
        if (e.target.index === this.selectedTab) {
            return;
        }
    
        this.selectTab(e.target.index, true);
    };
    
    TabWidget.prototype._keydownEvent = function (e) {
    
        var targetIndex;
    
        if (e.keyCode === this.keys.prev || e.keyCode === this.keys.next) {
            e.preventDefault();
        }
        else {
            return;
        }
    
        if (e.keyCode === this.keys.prev && e.target.index > 0) {
            targetIndex = e.target.index - 1;
        }
        else if (e.keyCode === this.keys.next && e.target.index < this.tabTriggersLength - 1) {
            targetIndex = e.target.index + 1;
        }
        else {
            return;
        }
    
        this.selectTab(targetIndex, true);
    };
    
    TabWidget.prototype._show = function (index, userInvoked) {
    
        this.tabTriggers[index].classList.add('is-selected');
        this.tabTriggers[index].setAttribute('aria-selected', true);
        this.tabTriggers[index].setAttribute('tabindex', 0);
    
        this.tabPanels[index].classList.remove('is-hidden');
        this.tabPanels[index].setAttribute('aria-hidden', false);
        this.tabPanels[index].setAttribute('tabindex', 0);
    
        if (userInvoked) {
            this.tabTriggers[index].focus();
        }
    };
    
    TabWidget.prototype._hide = function (index) {
    
        this.tabTriggers[index].classList.remove('is-selected');
        this.tabTriggers[index].setAttribute('aria-selected', false);
        this.tabTriggers[index].setAttribute('tabindex', -1);
    
        this.tabPanels[index].classList.add('is-hidden');
        this.tabPanels[index].setAttribute('aria-hidden', true);
        this.tabPanels[index].setAttribute('tabindex', -1);
    };
    
    TabWidget.prototype.selectTab = function (index, userInvoked) {
    
        if (this.prevSelectedTab === null) {
            for (var i = 0; i < this.tabTriggersLength; i++) {
                if (i !== index) {
                    this._hide(i);
                }
            }
        }
        else {
            this._hide(this.selectedTab);
        }
    
        this.prevSelectedTab = this.selectedTab;
        this.selectedTab = index;
    
        this._show(this.selectedTab, userInvoked);
    };
    
    TabWidget.prototype.destroy = function () {
    
        for (var i = 0; i < this.tabTriggersLength; i++) {
            this.tabTriggers[i].classList.remove('is-selected');
            this.tabTriggers[i].removeAttribute('aria-selected');
            this.tabTriggers[i].removeAttribute('tabindex');
    
            this.tabPanels[i].classList.remove('is-hidden');
            this.tabPanels[i].removeAttribute('aria-hidden');
            this.tabPanels[i].removeAttribute('tabindex');
    
            this.tabTriggers[i].removeEventListener('click', this.clickListener, false);
            this.tabTriggers[i].removeEventListener('keydown', this.keydownListener, false);
    
            delete this.tabTriggers[i].index;
        }
    
        this.el.classList.remove('is-initialized');
    };
    
    new TabWidget(document.getElementsByClassName('js-tabs')[0]);



});

