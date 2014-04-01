(function($, _, massrel) {

	var AwesomeBandsController = {
		init: function(options) {
			this.options = $.extend({
				$rankItemTemplate: $('#rank-item-template'),
				$rankingList: $('#awesome-bands-list')
			}, options);

			this.initVariables();
			this.bindEvents();

			this.poller = new this.options.poller(this.options.pollerOptions, $.proxy(this.pollerCallback, this));
			this.startPoller();
		},
		initVariables: function() {
			// Cache selectors
			this.$window = $(window);
			this.$rankingList = this.options.$rankingList;

			this.isPollerRunning = false;
			this.rankItemTemplate =  _.template(this.options.$rankItemTemplate.html());
		},
		bindEvents: function() {
			// Stop polling on ESC keypress
			this.$window.keyup($.proxy(function(evt) {
				if (evt.keyCode === 27) {
					if (this.isPollerRunning) {
						this.stopPoller();
					}
					else {
						this.startPoller();
					}
				}
			}, this));
		},
		startPoller: function() {
			this.isPollerRunning = true;
			this.poller.start();
		},
		stopPoller: function() {
			this.isPollerRunning = false;
			this.poller.stop();
		},
		pollerCallback: function(response) {
			// Map through the response to format the numbers
			response = response.map($.proxy(function(item) {
				return $.extend(item, {
					count: this.formatNumber(item.count)
				});
			}, this));

			// Insert new rankings into DOM
			this.$rankingList.html(this.rankItemTemplate({
				response: response
			}));

			// Stagger animate the ranking items into view
			TweenMax.staggerTo($('.rank-item'), 0.5, {opacity: 1}, 0.07);
		},
		/**
		 * Given any number, adds the commas in the number
		 * and returns the formatted number as a string.
		 * Method is from: http://stackoverflow.com/questions/14075014/jquery-function-to-to-format-number-with-commas-and-decimal
		 */
		formatNumber: function(number) {
		    //Seperates the components of the number
		    var n= number.toString().split(".");
		    //Comma-fies the first part
		    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    //Combines the two sections
		    return n.join(".");
		}
	};

	/* Initialize the awesome bands awesome controller */
	$(function() {
		AwesomeBandsController.init({
			poller: massrel.Poller,
			pollerOptions: {
				frequency: 15
			}
		});
	});

}(jQuery, _, massrel));
