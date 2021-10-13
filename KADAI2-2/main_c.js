let result = document.getElementById("result");
    function edit(elem) {
      result.value = result.value + elem.value;
    }
    function calc() {
      result.value = new Function("return " + result.value)();
    }
function clearText() {
	let textForm = document.getElementById("AllClear");
  result.value = '';
}
