const fs = require("fs/promises");

const findFiles = (dir) => {
  return fs.readdir(dir).then((files) => {
    files.forEach((file) => {
      const filePath = dir + "/" + file;
      fs.lstat(filePath, (err, stats) => {
        if (err) {
          return err;
        } else {
          if (stats.isDirectory()) {
            findFiles(filePath);
          } else {
            const fileInfo = filePath + "-------" + stats.size + "kb" + "\n";
            fs.writeFile(
              "./src/sorted_files.txt",
              fileInfo,
              { flag: "a" },
              (err) => {
                if (err) {
                  return err;
                }
              }
            );
          }
        }
      });
    });
  });
};

const args = process.argv.slice(2)[0];

findFiles(args).catch((err) => {
  console.log(err.message);
});
