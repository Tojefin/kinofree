function a(){let t=JSON.parse(localStorage.getItem("watch_history"));return t||(localStorage.setItem("watch_history",JSON.stringify([])),t=[]),t}export{a as g};
