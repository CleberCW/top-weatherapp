import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

import odinImage from "./odin.png";

const image = document.createElement("img");
image.src = odinImage;

document.body.appendChild(image);

const copyright = document.createElement("p");
copyright.textContent =
  "odin PNG Designed By  from https://pt.pngtree.com/freepng/odin-clipart-viking-mascot-isolated-on-white-cartoon-vector_11076003.html?sol=downref&id=bef";

document.body.appendChild(copyright);
