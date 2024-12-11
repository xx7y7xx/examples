const Promise = require("bluebird");

const log = console.log;

function delay(time, v) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(v);
    }, time);
  });
}

const getDirFiles = () => {
  log("getDirFiles()");
  return new Promise(resolve => {
    setTimeout(resolve(["foo.txt", "bar.txt"]), 1);
  });
};

const readFile = file => {
  log("readFile(file=?)", file);
  switch (file) {
    case "foo.txt":
      return delay(200, "foo 200ms");
    case "bar.txt":
      return delay(100, "bar 100ms");
  }
};

exports.getDirFilesContent = () => {
  log("getDirFilesContent()");
  return getDirFiles()
    .then(files => {
      console.log("got files in dir:", files);
      return files.map(file => {
        return readFile(file).then(content => {
          console.log("got file content:", content);
          return content;
        });
      });
    })
    .all()
    .then(fileContents => {
      console.log("all the files were get:", fileContents);
      return fileContents.join("\n");
    });
};

exports.getDirFiles = getDirFiles;
