// Author: Poltanek
// Version: 1.0
// This is a simple script that will be used to simulate a terminal on the website.
// It will be used to display information about me, my projects, and other things.
// It will also be used to simulate a password prompt.


var before = document.getElementById('before');
var liner = document.getElementById('liner');
var command = document.getElementById('typer');
var textarea = document.getElementById('texter');
var terminal = document.getElementById('terminal');
var themes = document.getElementById('theme');

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
console.log("%cPassword: '" + password + "'Wonder what you can do with that?"), "color: grey";

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
        
        if (pwd && e.keyCode == 13) {
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

function setTheme(themeName) {
    document.body.classList.remove('dark-theme', 'light-theme', 'neontheme');
    document.body.classList.add(themeName);

    localStorage.setItem('theme', themeName);

    console.log('Theme set to ' + themeName);
}

function commander(cmd) {
    var parts = cmd.toLowerCase().split(' ');
    var command = parts[0];
    var argument = parts[1];

    switch(command) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "theme":
            if (theme[argument]) {
                setTheme(argument);
            } else {
                console.error("Theme not found: " + argument);
            }
            break;
    }
}

// switch case to handle the commands

function commander(cmd) {
    switch(cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "clear":
            setTimeout(function() {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById('before');
            }, 1);
            break;
        case "aboutme":
            loopLines(aboutme, "color2 margin", 80);
            break;
        case "whatami":
            loopLines(whatami, "color2 margin", 80);
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
            /**
             * Projects list from here:
             */
        case "crane_ai":
            addLine("loading...", "color2 margin", 80);
            loopLines(crane_ai, "color2 margin", 80)

        case "cv":
            addLine("loading...", "color2 margin", 80);
            loopLines(cv, "color2 margin", 80);
            break;
            /* Provides email link */
        case "banner":
            loopLines(banner, "", 80);
            break;
            /* Simulates a password prompt */
        case "pwd":
            addLine("visitor@localhost:~", "no-animation", 0);
            break;
            /* Displays a list of files/folders */
        case "ls":
            addLine("scripts", "no-animation", 0);
            break;
            /* Changes the directory to the scripts directory */
        case "cd scripts":
            currentDirectory = "scripts";
            addLine("visitor@localhost:~/scripts", "no-animation", 0);
            break;
            /* Changes the directory back to the root directory */
        case "cd ..":
            currentDirectory = "";
            addLine("visitor@localhost:~", "no-animation", 0);
            break;
            /* Provides a list of historic commands that the visitor/user has used */
        case "history":
            commands.forEach(function(item, index) 
            {
                addLine(item, "color2 margin", index * 80);
            });
            loopLines(history, "color2 margin", 80);
            break;
        case "secret":
            pw = true;
            liner.classList.add("password");
            addLine("Password: ", "no-animation", 0);
            break;
        case "github":
            addLine("loading...", "color2 margin", 80);
            newTab(github);
            break;
        case "linkedin":
            addLine("loading...", "color2 margin", 80);
            newTab(linkedin);
            break;
        case "fun":
            loopLines(fun, "color2 margin", 80);
            break;

            /* Themes */
        case "themes":
            loopLines(themes, "color2 margin", 80);
            break;
        case "default":
            addLine("loading...", "color2 margin", 80);
            setTheme("default-theme");
            break;
        case "light":
            addLine("loading...", "color2 margin", 80);
            setTheme("light-theme");
            break;
        case "dark":
            addLine("loading...", "color2 margin", 80);
            setTheme("dark-theme");
            break;
            
        case "request":
            break;

        case "donate":
            loopLines(donate, "color2 margin", 80);
            break;
        case "sudp":
            addLine("You are not an admin", "error", 100);
            break;
        case "skills":
            addLine("loading...", "color2 margin", 80);
            loopLines(skills, "color2 margin", 80);
            break;
        case "features":
            addLine("loading...", "color2 margin", 80);
            loopLines(features, "color2 margin", 80);
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

// Function to add lines to the terminal
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

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
        addLine(item, style, index * time);
    });
}