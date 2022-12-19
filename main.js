// Form validation code
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const zip = document.getElementById("zip");
const regExp = /\d{5}-\d{4}/;
const zipError = document.querySelector("#zip + span.error");

function checkPattern(regExp, elem) {
    return regExp.test(elem.value);
}

function showError(e) {
    if (e == email) {
        if (email.validity.valueMissing) {
          // If the field is empty I remember the user it's required
          emailError.textContent = "You need to enter an e-mail address";
        } else if (email.validity.typeMismatch) {
          // If the format is invalid display the following error
          emailError.textContent = "Entered value needs to be an e-mail address";
        }
    } else if (e == zip) {
        if (zip.validity.valueMissing) {
          zipError.textContent = "You need to enter a zip code";
        } else if (!checkPattern(regExp,zip)) {
          zipError.textContent = "Entered value needs to match the pattern XXXXX-XXXX, being Xs numbers 0-9";
        }
    }
}

email.addEventListener("blur", () => {
    // When user leaves input mail, we check if the field is valid
    if (email.validity.valid) {
        // In case there is an error message visible and the field is valid yet, remove the error message
        emailError.textContent = "";
    } else {
        showError(email);
    }
});

zip.addEventListener("blur", () => {
    if (zip.validity.valid && checkPattern(regExp,zip)) {
        zipError.textContent = "";
    } else {
        showError(zip);
    }
});

/* This code is for the custom select control */

var x, i, j, l, ll, selElmnt, a, b, c;
/* look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* for each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* for each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* for each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* when an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /* when the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* if the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);