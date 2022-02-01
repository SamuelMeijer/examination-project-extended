// Returns an array with three colors ordered dynamicly depending on pathname
export function colorDecider(pathname: string): string[] {
  let bgColorArr: string[] = [];
  // Populating bgColorArr
  switch (pathname) {
    case "/game":
      bgColorArr = ["#FFC66C", "#FF8632", "#FF7F4A"];
      break;
    case "/shop":
      bgColorArr = ["#FF7F4A", "#FFC66C", "#FF8632"];
      break;
    default:
      bgColorArr = ["#FF8632", "#FF7F4A", "#FFC66C"];
      break;
  }

  return bgColorArr;
}
