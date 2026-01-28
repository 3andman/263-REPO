// HI!!!!! At first I was pasting the console outputs but it got wayyyy to long so now i'm just explaining what they are, if that's wrong i'm sorry.

// - Dylan

window.onload = setup;

/** function setup */
function setup() {
  console.log("we are a go!");
  /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
  /*** START PART ONE ACCESS */
  /* 1: all paragraph elements */
  /***CODE */
  let paragraphs = document.getElementsByTagName("p");
  console.log(paragraphs);
  /***OUTPUT:
   * a list of all paragraph elements
   */

  /*************************************** */
  /* 2: only the first paragraph element */
  /***CODE */
  let firstParagraph = paragraphs[0];
  console.log(firstParagraph);
  /***OUTPUT:
   * just the first <p>
   */

  /*************************************** */
  /* 3: all elements with the class inner-container */
  /***CODE */
  let innerContainers = document.getElementsByClassName("inner-container");
  console.log(innerContainers);
  /***OUTPUT:
   * a list of all the "inner-container"s
   */

  /*************************************** */
  /* 4: the last image element inside the element that has the class img-container */
  /***CODE */
  let imgContainers = document.getElementsByClassName("img-container");
  let images = imgContainers[0].getElementsByTagName("img");
  let lastImage = images[images.length - 1];
  console.log(lastImage);
  /***OUTPUT:
   * just the last <img> in the .img-container
   */

  /*************************************** */
  /* 5A: all h2 elements */
  /* 5B: length of the list in 5A */
  /* 5C: the text content of the first element in the list from 5A */
  /***CODE */
  let h2Elements = document.getElementsByTagName("h2");
  console.log(h2Elements);

  let h2Length = h2Elements.length;
  console.log(h2Length);

  let firstH2Text = h2Elements[0].innerText;
  console.log(firstH2Text);
  /***OUTPUT:
   * collection of h2 elements
   * number of h2 elements
   * the inside of the first h2
   */

  /*************************************** */
  /* 6: the element with id name parent */
  /***CODE */
  let parentElement = document.getElementById("parent");
  console.log(parentElement);
  /***OUTPUT:
   * the image section
   */

  /*************************************** */
  /*** END PART ONE ACCESS */

  /*************************************** */
  /*** START PART TWO MODIFY */
  /*************************************** */
  /* 1: Select the first paragraph and replace the text within the paragraph... */
  /***CODE */
  let today = new Date().toLocaleDateString();
  paragraphs[0].innerText = "stinky stinky stinky: " + today;
  /*************************************** */

  /* 2: Select all elements in the HTML that have the class name content-container
 and change the background color ... of first and second ...*/
  /***CODE */
  let contcont = document.getElementsByClassName("content-container");
  contcont[0].style.backgroundColor = "#458499ff";
  contcont[1].style.backgroundColor = "#f63636ff";
  /*************************************** */

  /* 3: Change the src element of the first image element on the page to be ...
  /***CODE */
let imgs = document.getElementsByTagName("img");
imgs[0].src = "task-2-images/seven.png";
  /*************************************** */

  /* 4: Select the third paragraph element on the page and
replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
/***CODE */
  let h22 = document.createElement("h2");
  h22.innerText = "TEST 123";

  paragraphs[2].innerHTML = "";
  paragraphs[2].appendChild(h22);

  /*************************************** */

  /* 5: Select the fourth paragraph element on the page and
add to the existing content an h2 element containing the text `TEST 123`
/***CODE */
  let new2 = document.createElement("h2");
  new2.innerText = "TEST 123";

  paragraphs[3].appendChild(new2);

  /*************************************** */

  /* 6: Select the fifth paragraph element on the page and add to the existing content
an img element that holds `one.png`, and add the class newStyle to said paragraph element.
/***CODE */
  let p5img = document.createElement("img");
  p5img.src = "task-2-images/one.png";

  paragraphs[4].appendChild(p5img);
  paragraphs[4].className += " task-2-styles";

  /*************************************** */

  /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];,
then access all elements with class name inner-container and save to a variable called `innerContainers`. 
Next, iterate over the colors array, and for each color: 
assign the element from innerContainers variable with the same index 
(i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
a background using that color.
/***CODE */

  // i don't know :{

  /*************************************** */
  /*** END PART TWO MODIFY */

  /*************************************** */
  /*** START PART THREE CREATE */
  /*************************************** */
  /* 1: NEW PARAGRAPHS */
  /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
  let allPTagsThree = document.getElementsByTagName("p");
  /* 1B: Create a function:function customCreateElement(parent){ //body } */
  function customCreateElement(parent) {
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    let newP = document.createElement("p");
    /* 1D:  Set the text of this element to be : `using create Element`*/
    newP.innerText = "using create Element";
    /* 1E:  Set the background of this paragraph element to be green */
    newP.style.backgroundColor = "#ffff";
    /* 1F:  Set the color of the text in this paragraph element to be white */
    newP.style.color = "white";
    /* 1G: Append this new element to the parent variable within the function. */
    parent.appendChild(newP);
  }

  /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */
    for (let i = 0; i < allPTagsThree.length; i++) {
        customCreateElement(allPTagsThree[i]);
    }

  /***EXPLANATION::
   * all <p> are in a variable
   *function to generate new <p>
  * new paragraph gets styling and text
  * appends to parent
  * for loop to go through each <p>
  * loop keeps adding more
   */

  /*************************************** */
  /* 2: GRID OF BOXES */
  /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
  /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
  /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
  /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

  /***CODE */

  /***EXPLANATION::
   *
   *
   */

  /*************************************** */
  /* 3: GRID OF BOXES II */

  /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
  /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
  /* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
  /*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

  /***CODE */

  /***EXPLANATION::
   *
   *
   */

  /*************************************** */
  /*** END PART THREE CREATE */
  /*************************************** */
}
