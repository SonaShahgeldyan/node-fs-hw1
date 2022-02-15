const fs = require("fs");

const fileNames = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return err;
    } else {
      files.forEach((file) => {
        const filePath = dir + "/" + file;
        fs.lstat(filePath, (err, stats) => {
          if (err) {
            return err;
          } else {
            if (stats.isDirectory()) {
              fileNames(filePath);
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
    }
  });
};

const currentDir = __dirname;

fileNames(currentDir);
