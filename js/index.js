window.showTutorial = function () {
    swal({
        title: "Tutorial"
      , html: true
      , confirmButtonText: "Got it!"
      , text: "<ul>" +
             "    <li><strong>Left click</strong>: rotate left</li>" +
             "    <li><strong>Right click</strong>: rotate right</li>" +
             "    <li><strong>CTRL + left click</strong>: flip</li>" +
             "    <li><strong>Hold left click + move</strong>: drag</li>" +
             "</ul>" +
             "<div class='made-with-heart'>" +
             "    <span class='octicon octicon-pencil'></span> with <span class='octicon octicon-heart'></span> by <a href='http://ionicabizau.net'>Ionică Bizău</a>" +
             "</div>"
    })
};
window.addEventListener("load", function () {

    var t = new SVG(document.querySelector(".graph")).size("100%", "100%")
      , winSize = {
            w: window.innerWidth
          , h: window.innerHeight
        }
      , elements = t.group().id("elements")
      , shapes = [
            elements.group()
          , elements.group()
          , elements.group()
          , elements.group()
          , elements.group()
          , elements.group()
          , elements.group()
        ]
      , size = winSize.w / 3.5
      , half = size / 2
      , quart = half / 2
      , q3 = quart * 3
      , leftTopCorner = {
            x: winSize.w / 2 - size / 2
          , y: 30
        }
      ;

    // 1. Big Triangle
    shapes[0].polygon(
        "0,0 " + half + "," + half + " " + size + ",0"
    ).fill("#e74c3c");

    // 2. Big Triangle
    shapes[1].polygon("0,0 " + half + "," + half + " 0," + size).fill("#e67e22");

    // 3. Medium Triangle
    shapes[2].polygon(size + "," + size + " " + half + "," + size + " " + size + "," + half).fill("#f1c40f");

    // 4. Small Triangle
    shapes[3].polygon(size + ",0 " + q3 + "," + quart + " " + size + "," + half).fill("#2ecc71");

    // 5. Small Triangle
    shapes[4].polygon(half + "," + half + " " + quart + "," + q3 + " " + q3 + "," + q3).fill("#3498db");

    // 6. Square
    shapes[5].polygon(half + "," + half + " " + q3 + "," + q3 + " " + size + "," + half + " " + q3 + "," + quart).fill("#9b59b6");

    // 7. Parallelogram
    shapes[6].polygon("0," + size + " " + quart + "," + q3 + " " + q3 + "," + q3 + " " + half + "," + size).fill("#34495e");

    Crossy("polygon", "transformOrigin", "center");
    Crossy("polygon", "transition", "all 500 ease");

    shapes.forEach(function (c) {
        var moved = false;
        var angle = 0;
        var cPol = c.children()[0];
        c.translate(leftTopCorner.x, leftTopCorner.y);
        c.draggy();
        c.on("dragmove", function () {
            moved = true;
        });

        cPol.on("mousedown", function () {
            moved = false;
        });

        cPol.on("contextmenu", function (e) {
            e.preventDefault();
        });

        cPol.on("mouseup", function (e) {
            if (!moved) {
                var t = this.node.style.transform;

                if (e.ctrlKey) {
                    this.node._scale = (this.node._scale || 1) === 1 ? -1 : 1;
                } else {
                    angle += (e.button === 2 ? 1 : -1) * 45;
                }

                Crossy(this.node, "transform", "rotate(" + angle + "deg) scaleX(" + (this.node._scale || 1) + ")");
            }
            moved = false;
            e.preventDefault();
        });
    });
});
