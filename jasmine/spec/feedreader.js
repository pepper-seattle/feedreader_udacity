/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All tests appear within $(function()) to ensure the DOM is fully loaded 
 * before any tests are run. 
 */
$(function() {
    // Declaring feed variable for use in multiple test suites below
    let feed = document.querySelector('.feed');
    /* Tests below cover the RSS Feed's allFeeds() functionality
    */
    describe('RSS Feeds', function() {
        /* Ensures the allFeeds() function is defined and produces content
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Checks that the feeds produced by allFeeds() contain a URL
         */
        it('feeds have defined URLs', function() {
            for(let feed of allFeeds){
               expect(feed.url).toBeDefined(); 
               expect(feed.url.length).not.toBe(0);
            }
        });

        /* Checks that the feeds produced by allFeeds() contain a title/name
         */
        it('feed name is defined', function() {
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Hamburger menu test suite */
    describe('The menu', function() {
        // Pulling body element for use in Menu suite
        const body = document.querySelector('body');

        /* Ensures the menu starts out as hidden
         */
        it('menu defaults to hidden', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* Ensures the menu changes visibilty when clicked
          */
         it('menu visibility changes on click', function() {
            const menuButton = document.querySelector('.menu-icon-link');
            // Menu opened
            menuButton.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // Menu closed
            menuButton.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });
    });

    /* Asynch functionality test */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* Ensures loadFeed() runs as expected and produces an output
         */
        it('loadFeed() produces elements to feed container', function() {
            const feedItems = feed.querySelectorAll('.entry');
            expect(feedItems.length > 0).toBe(true);
    });

    /* New Feed Selection testing */
    describe('New Feed Selection', function() {
        // Declare feed1 to hold first feed entries
        const feed1 = [];

        // Run beforeEach to get two sets of feeds from loadFeed
        // for comparison in test below
        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                feed1.push(entry.innerText);
            });
            loadFeed(1,done);
        });
        /* Ensure new feeds produce new content
         */
        it('content changes with each new feed', function() {
            Array.from(feed.children).forEach(function(entry, index) {
               expect(entry.innerText === feed1[index]).toBe(false); 
            });
        });
    });
    });
}());
