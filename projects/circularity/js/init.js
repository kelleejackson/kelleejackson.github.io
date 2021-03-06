var init = function (window) {
    'use strict';
    var
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        app = window.opspark.makeApp(),
        canvas = app.canvas,
        view = app.view,
        fps = draw.fps('#000');


    window.opspark.makeGame = function () {

        window.opspark.game = {};
        var game = window.opspark.game;

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        // document.body.style.backgroundColor = "#FFC0CB";


        // TODO 1 : Declare and initialize our variables
        var circle;
        var circles = [];

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            circle = draw.randomCircleInArea(canvas, true, false, '#999', );
            physikz.addRandomVelocity(circle, canvas, 1, 10);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var i = 0; i < 200; i++) {
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////

        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //




            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            //For TODO 4 and 5 these functions were deleted because I changed the hardcoded values so that 
            //I do not have to repeat myself 100 times to make every circle move.


            for (var i = 0; i < circles.length; i++) {
                var eachValue = circles[i];
                physikz.updatePosition(eachValue);
                game.checkCirclePosition(eachValue);
            }
            // code to repeat using eachValue
            // TODO 9 : Iterate over the array


        }

        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.


        0 is on the left
        canvas.width is on the right

        0 is on the bottom
        canvas.height is on the top
        */
        game.checkCirclePosition = function (circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (circle.x > canvas.width) {
                circle.x = 0;
            }

            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            // if the circle has gone past the Left side of the screen then place it on the Right
            if (circle.x < 0) {
                circle.x = canvas.width;
            }

            // if the circle has gone past the top side of the screen then place it on the bottom
            if (circle.y < 0) {
                circle.y = canvas.height;
            }

            // if the circle has gone past the bottom side of the screen then place it on the top
            if (circle.y > canvas.height) {
                circle.y = 0;
            }

            var rightEdge = circle.x + circle.radius;
            var leftEdge = circle.y + circle.radius;

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }

        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////

        view.addChild(fps);
        app.addUpdateable(fps);

        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
