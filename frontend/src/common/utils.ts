// Returns an array with three colors ordered dynamicly depending on pathname
export function colorDecider(pathname: string): string[] {
  let bgColorArr: string[] = [];
  // Populating bgColorArr
  switch (pathname) {
    case "/game":
      bgColorArr = ["#FFC66C", "#FF8632", "#FF7F4A"];
      break;
    case "/profile":
      bgColorArr = ["#FF7F4A", "#FFC66C", "#FF8632"];
      break;
    default:
      bgColorArr = ["#FF8632", "#FF7F4A", "#FFC66C"];
      break;
  }

  return bgColorArr;
}

export function marginDecider(pathname: string): string {
  let margin = "";
  // Deciding margin
  switch (pathname) {
    case "/game":
      margin = "160px";
      break;
    case "/profile":
      margin = "30px";
      break;
    default:
      margin = "290px";
      break;
  }

  return margin;
}

export function titleDecider(pathname: string): string {
  let title = "";

  // Deciding title
  switch (pathname) {
    case "/game":
      title = "2048";
      break;
    case "/profile":
      title = "Profile";
      break;
    default:
      title = "Matteklubben";
      break;
  }

  return title;
}
