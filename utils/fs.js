import fs from "node:fs";
import path from "node:path";

const write = (dir, data) => {
  fs.writeFileSync(
    path.resolve(".", "database", `${dir}.json`),
    JSON.stringify(data, null, 4)
  );
};

const read = (dir) => {
  return JSON.parse(
    fs.readFileSync(path.resolve(".", "database", `${dir}.json`))
  );
};

// console.log(path.resolve(".", "database", `users.json`))

export { write, read };
