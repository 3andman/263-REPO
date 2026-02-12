
window.onload = function () {
  animateRows();

  // console.log("timers running");
  // for (let i = 0; i < 24; i++) {
  //   //for each x - make a column of changing y's
  //   for (let j = 0; j < 24; j++) {
  //     //create a grid cell with a div
  //     let parent = document.getElementById("parent");
  //     let d = document.createElement("div");
  //     d.classList.add("grid-cell");
  //     parent.appendChild(d);

  //     d.style.left = (i + 1) * 25 + "px";
  //     d.style.top = (j + 1) * 25 + "px";
  //   }
  // }

  // let gridCells = document.querySelectorAll(".grid-cell");

  // let divisor = 2;

  // // for (let i = 0; i < gridCells.length; i++) {
  // //   //   if (i % divisor === 0) {
  // //   //     gridCells[i].style.background = shades[0]
  // //   //   }
  // //   //   else {
  // //   //     gridCells[i].style.background = shades[1];
  // //   //   }
  // //   //}
  // //   if (i % 24 === 0) {
  // //     if (currentShadeIndex === 0) {
  // //       currentShadeIndex = 1;
  // //     }
  // //       else { currentShadeIndex = 0 }

  // //   }
  // //   gridCells[i].style.background = shades[currentShadeIndex]
  // // }

  // let changingDivisor = 0;
  // let ref = window.seInterval(animate_rows, 500);

  // window.setInterval(animate_rows, 1000);

  // function animateRows() {
  //   changingDivisor += 1;
  //   console.log(changingDivisor);
  //   drawGrid();

  //   if (changingDivisor === 12) {
  //     clearInterval();
  //   }
  // }

  // function drawGrid() {
  //   for (let index = 0; index < gridCells.length; index++) {
  //     //check what the remainder is ...
  //     if (index % changingNum === 0) {
  //       gridCells[index].style.background = shades[0];
  //     } else if (index % changingNum === 1) {
  //       gridCells[index].style.background = shades[1];
  //     } else if (index % changingNum === 2) {
  //       gridCells[index].style.background = shades[2];
  //     } else if (index % changingNum === 3) {
  //       gridCells[index].style.background = shades[3];
  //     } else if (index % changingNum === 4) {
  //       gridCells[index].style.background = shades[4];
  //     } else if (index % changingNum === 5) {
  //       gridCells[index].style.background = shades[5];
  //     } else if (index % changingNum === 6) {
  //       gridCells[index].style.background = shades[6];
  //     } else if (index % changingNum === 7) {
  //       gridCells[index].style.background = shades[7];
  //     }
  //   }
  // }
  // /* hmmm : we could just remove the if /else and write:
  // gridCells[index].style.background = shades[index%changingNum];
  // */
  // let dynamicdelay = 500;

  // window.setInterval(
  //   functional(e){
  //   let sp = document.createElement("span");
  //   sp.textContnent = "adding Text";
  //   document.querySelector("#parent").appendChild(sp)
  // }, dynamicdelay)
  
  window.setTimeout(
    changingTimeout,
    dynamicdelay)
  
  function changingTimeout() {
    let sp = document.createElement("span");
    sp.textContent = "adding Text";
    document.querySelector("#parent").appendChild(sp)
    dynamicdelay -= 10
    console.log(dynamicdelay)
    window.setTimeout(changingTimeout,dynaicdelay)
  }
}
  

