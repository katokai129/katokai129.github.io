
function isNumber(val){
  var regex = new RegExp(/^[0-9]+$/);
  return regex.test(val);
}

function fizzbuzz() {

    target = document.getElementById("output");
    const end_num = document.forms.id_form1.id_textBox1.value;
    document.getElementById("output").textContent = "";
    if (isNumber(end_num) && end_num!=0) {
        
        for (let i = 1; i <= end_num; i++) {
            if (i % 3 == 0) { target.insertAdjacentHTML("beforeend", "Fizz" ); }
            if (i % 5 == 0) { target.insertAdjacentHTML("beforeend", "Buzz" ); }
            if ((i % 3 != 0) && (i % 5 != 0)) { target.insertAdjacentHTML("beforeend", i);}
           
            target.insertAdjacentHTML("beforeend", "<br>");
        }
        
    }
    else { 
        target.innerText+="正の整数を入れてね!"
    }
}

