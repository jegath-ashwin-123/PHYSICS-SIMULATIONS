function updateVoltage(val) {
    var value1 = document.getElementById("range1").value;
    var value2 = document.getElementById("range2").value;
    current = value1 / value2;
    document.getElementById('value1').innerHTML = "current:   " + current;
    document.getElementById('voltage').innerHTML = "volt:   " + value1;
    document.getElementById('V').style.fontSize = parseInt(value1) + 300 + "px"
    document.getElementById('I').style.fontSize = parseInt(value1) + 20 + "px"
}

function updateResistance(val) {
    var value1 = document.getElementById("range2").value;
    var value2 = document.getElementById("range1").value;
    current = value2 / value1;
    document.getElementById('resistance').innerHTML = "resistance:   " + value1;
    document.getElementById('value1').innerHTML = "current:   " + current;
    document.getElementById('R').style.fontSize = parseInt(value1) + 200 + "px"
    var inverse = (parseInt(value1) - 20)
        // console.log(inverse)
    document.getElementById('I').style.fontSize = inverse + "px"

}