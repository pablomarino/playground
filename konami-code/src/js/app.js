const callback = function(){
  console.log("I see what you did there, you cheater ;D");
  setTimeout(function(){window.location.href="https://en.wikipedia.org/wiki/Konami_Code"}, 1000);
}

const update_view = function(event){
  const elementId=`pressedKey${event.detail.passed}`;
  const element = document.getElementById(elementId);
  if (element){
    element.classList.add("pressed");
  }else{
    console.log(`Element ${elementId} not found`);
    reset_view();
  }
  document.getElementById("kcPassed").innerHTML = event.detail.passed;
  document.getElementById("kcTotal").innerHTML = event.detail.total;
  document.getElementById("kcKey").innerHTML = event.detail.key;
}

const reset_view = function(){
  console.log("Resetting view");
  const parentElement = document.getElementById('code');
  const childElements = parentElement.querySelectorAll('*');
  childElements.forEach((childElement) => {
    childElement.classList.remove("pressed");
  });
}

if(KonamiCode){
  var easternegg = KonamiCode();
  easternegg.init();
}
document.addEventListener('kcUpdate', update_view);
document.addEventListener('kcCancel', reset_view);
document.addEventListener('kcComplete', callback);