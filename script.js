var before = document.getElementById('before');
var liner = document.getElementById('liner');
var command = document.getElementById('command');
var textarea = document.getElementById('textarea');
var terminal = document.getElementById('terminal');

var git = 0;
var pw = false;
var pwd = false;
var commands = [];

let currentDirectory = "";

setTimeout(function() {
    loopLines(banner, "", 80);
    textarea.focus();

}, 100);

window.addEventListener('keyup', enterKey);

console.log(
    "%cYou hacked my password! You're a hacker!",
    "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - Wonder what you can do with that?"),
    "color: grey; font-weight: bold; font-size: 24px;";

textarea.value = "";
command.innerHTML = textarea.value;
function enterKey(e) {
    if (e.keyCode == 181) {
        document.ATTRIBUTE_NODE.location.reload(true);
    }
    if (pw) {
        let et = "*";
        let w = textarea.value.length;
        command.innerHTML = et.repeat(w);
        if (textarea.value === password) {
            pwd = true;
        }
        
        if (pwd && e.keycCode == 13) {
            loopLines(secret, "color2 margin", 120);
            command.innerHTML = "";
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLine ("Wrong password", "error", 0);
            command.innerHTML = "";
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }

    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;

            if (currentDirectory === "scripts") {
                addLine("visitor@localhost:~/" + command.innerHTML, "no-animation", 0);
            } else {
                addLine("visitor@localhost:~" + command.innerHTML, "no-animation", 0);
            }

            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
        }

        if (e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.value = commands[git];
            command.innerHTML = textarea.value;
        }
        if (e.keyCode == 40 && git < commands.length) {
            git += 1;
            if (commands[git] === undefined) {
                textarea.value = "";
            } else {
                textarea.value = commands[git];
            }
            command.innerHTML = textarea.value; 
        }
    }
}

// Linux Commands

function commander(cmd) {
    switch(cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;

            default:
                addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>", "error", 100);
    }
}

function newTab(link) {
    setTimeout(function() {
        window.open(link, "_blank");
    }, 500);
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === "" && text.charAt(i + 1) == "") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function() {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);
        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(array, style, time) {
    for (let i = 0; i < array.length; i++) {
        addLine(array[i], style, i * time);
    }
}