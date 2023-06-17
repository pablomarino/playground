const KonamiCode = function () {
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]; // ↑↑↓↓←→←→BA
  let read_pointer = 0;

  this.init = function () {
    let timerId;
    let update_event;
    const complete_event = new CustomEvent("kcComplete", {});
    const cancel_event = new CustomEvent("kcCancel", {});
    const timeout_duration = 2000;

    document.addEventListener("keydown", function (event) {
      // clear reset timeout if exists
      if (timerId) clearTimeout(timerId);
      // if key is correct, increment read pointer, else set to zero
      if (event.key == code[read_pointer]) read_pointer++;
      else read_pointer = 0;
      // dispatch update event
      update_event = new CustomEvent("kcUpdate", {
        detail: { passed: read_pointer, total: code.length, key: event.key },
      });
      this.dispatchEvent(update_event);
      // if code is complete 
      if (read_pointer == code.length) this.dispatchEvent(complete_event);
      // set timeout to reset operation after 2 seconds without input
      timerId = setTimeout(function () {
        read_pointer = 0;
        document.dispatchEvent(cancel_event);
      }, timeout_duration);
    });
  };

  return this;
};
