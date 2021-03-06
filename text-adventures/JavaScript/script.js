var textSpeed = 30;
var console;
var input;
var xmlDoc;
var flags;
var firstNode = 'start';

function bodyLoad() {
    console = document.getElementById('story');
    input = document.getElementById('options').getElementsByTagName('form')[0];

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "XML/nodes.xml", false);
    xmlhttp.send();
    xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText, 'text/xml');

    flags = {};

    loadNode(firstNode);
}

function loadNode(nodeName) {
    input.innerHTML = "";
    var node = xmlDoc.getElementById(nodeName);
    var description = node.getElementsByTagName('description')[0].textContent;
    var options = node.getElementsByTagName('options')[0].getElementsByTagName('option');

    if (node.getElementsByTagName('flags').length > 0) {
        var nodeFlags = node.getElementsByTagName('flags')[0].getElementsByTagName('flag');

        for(var flag of nodeFlags) {
            var key = flag.getAttribute('key');
            var val = parseInt(flag.getAttribute('value'));
            if (!flags[key])
                flags[key] = val;
            else
                flags[key] += val;
        }
    }

    var validOptions = [];

    for (var i = 0; i < options.length; ++i) {
        var condition = options[i].getAttribute('condition');

        var condSat = true;
        if (condition) {
            var cond = condition.split(';');
            var condSat = allConditionsSatisfied(cond);
        }

        if (condSat) {
            validOptions.push(options[i]);
        }
        
    }

    addTextToConsole(description, validOptions);
}

function allConditionsSatisfied(cond) {
    for (var i = 0; i < cond.length; ++i) {
        if (cond[i].includes('>')) {
            var parts = cond[i].split('>');
            if (!flags[parts[0]] || flags[parts[0]] <= parseInt(parts[1]))
                return false;
        }
        else {
            var parts = cond[i].split('<');
            if (!flags[parts[0]] || flags[parts[0]] >= parseInt(parts[1]))
                return false;
        }
    }

    return true;
}

function addTextToConsole(text, options) {
    console.innerHTML = '';

    var lines = text.split('\n');
    addNextLetterToConsole(lines, 1, 0, options);
}

function addOptions(options) {
    input.innerHTML = '';

    for(var option of options) {
        input.innerHTML += '<input type="radio" name="options" value="' +
            option.getAttribute('node') + '" onchange="optionChosen()"/>';
        input.innerHTML += option.textContent + "<br>";
    }
}

function optionChosen() {
    var options = input.getElementsByTagName('input');
    for(var option of options) {
        if (option.checked) {
            loadNode(option.value);
            break;
        }
    }
}

function addNextLetterToConsole(lines, i, j, options) {
    if (j < lines[i].length) {
        console.innerHTML += lines[i][j];
        setTimeout(addNextLetterToConsole, textSpeed, lines, i, j + 1, options);
    }
    else {
        if (lines.length - 2 > i) {
            console.innerHTML += '<br>';
            addNextLetterToConsole(lines, i + 1, 0, options);
        }
        else {
            addOptions(options);
        }
    }
}