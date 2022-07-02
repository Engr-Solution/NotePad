import React from "react";

function CategoryColor(category ) {
  switch (category) {
    case "tutorial":
      return "red";
    case "project":
      return "blue";
    case "work":
      return "green";
    case "other":
      return "purple";
    default:
      return;
  }
}

export default CategoryColor;
