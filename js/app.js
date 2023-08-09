let point = false;
let result = 0;
let resultInMem = "0";
let action = "";
let operations = document.querySelector("#operations");
let digits = document.querySelector("#digits");
let buttons = document.querySelector(".buttons");

document.addEventListener("mousedown", function (event) {
    event.preventDefault();
})

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            addNumber(+event.key);
            break;
        case "*":
        case "-":
        case "+":
        case "/":
            addOperator(event.key);
            break;
        case "Backspace":
            addOperator(" BS");
            break;
        case "Enter":
            addOperator("=");
            break;

        default:
            break;
    }
})

buttons.addEventListener("click", (event) => {
    if (!event.target.tagName === "TD") { return; }
    if (event.target.dataset.number) {
        addNumber(+event.target.dataset.number);
    } else if (event.target.dataset.operator) {
        addOperator(event.target.dataset.operator);
    } else if (event.target.dataset.point) {
        addPoint();
    }
})

function addPoint() {
    if (point) { return }
    let str = digits.textContent + ".";
    point = true;
    showResult(str);
}

function addNumber(digit) {
    if ((digit === 0) && (result === 0)) { return; }
    if ((result === 0) && (!point)) {
        digits.textContent = "";
    }
    let str = digits.textContent + digit;
    result = +str;
    showResult(str);
}

function addOperator(operator) {
    let str = digits.textContent;
    switch (operator) {
        case "%":
            if ((result === 0) || (resultInMem === "") || (!action)) { return }
            let res = +(resultInMem.slice(0, resultInMem.length - 1));
            result = res / 100 * result;
            addOperator("=");
            str = result.toString();
            point = (str.includes(".")) ? true : false;
            break;

        case "1/x":
            if (result === 0) { return }
            result = 1 / result;
            addOperator("=");
            str = result.toString();
            point = (str.includes(".")) ? true : false;
            break;

        case "x^2":
            if (result === 0) { return }
            result = Math.pow(result, 2);
            addOperator("=");
            str = result.toString();
            point = (str.includes(".")) ? true : false;
            break;

        case "SQRT":
            if (result === 0) { return }
            result = Math.sqrt(result);
            //result = resultInMem = Math.sqrt(result);
            //showResultInMem();
            addOperator("=");
            str = result.toString();
            point = (str.includes(".")) ? true : false;
            break;
        case "=":
            if (result === 0) { return }
            if (action) { calculate() }
            action = "";
            str = result.toString();
            point = (str.includes(".")) ? true : false;
            showResultInMem();
            break;
        case "-":
        case "/":
        case "*":
        case "+":
            if (result === 0) { return }
            if (action) { calculate() }
            action = operator;
            resultInMem = result.toString() + action;
            str = "0";
            result = 0;
            point = false;
            showResultInMem();
            break;
        case " BS":
            if (result === 0) { return }
            str = str.slice(0, str.length - 1);
            result = +str;
            if (str.length === 0) {
                str = "0";
                if (!action) {
                    resultInMem = "0";
                    showResultInMem();
                }
            }
            break;
        case "C":
            str = "0";
            action = "";
            result = 0;
            resultInMem = 0;
            point = false;
            showResultInMem();
            break;
        case "NEGATE":
            if (str.includes("-")) {
                str = str.slice(1);
            } else {
                str = "-" + str;
            }
            result = +str;
            break;

        default:
            break;
    }
    if (result > 999999999999) {
        result = 0;
        str = "ERROR"
        alert("Превышена пазрядность калькулятора");
    }
    showResult(str);
}

function showResultInMem(params) {
    operations.textContent = resultInMem;
}

function showResult(str) {
    digits.textContent = str.slice(0, 16);
}

function calculate() {
    let calc = 0;
    switch (action) {
        case "/":
            calc = +resultInMem.slice(0, resultInMem.length - 1) / result;
            resultInMem = result = calc;
            break;
        case "*":
            calc = +resultInMem.slice(0, resultInMem.length - 1) * result;
            resultInMem = result = calc;
            break;
        case "+":
            calc = +resultInMem.slice(0, resultInMem.length - 1) + result;
            resultInMem = result = calc;
            break;
        case "-":
            calc = +resultInMem.slice(0, resultInMem.length - 1) - result;
            resultInMem = result = calc;
            break;

        default:
            break;
    }
}