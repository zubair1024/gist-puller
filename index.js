const axios = require("axios");
const fs = require("fs");

const username = `zubair1024`;

const getGistsList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/users/${username}/gists`)
      .then(res => {
        if (res && res.data && res.data.length) {
          resolve(res.data);
        } else {
          reject(new Error("No data returned"));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

getandWriteGist = gist => {
  for (const [key, value] of Object.entries(gist.files)) {
    axios
      .get(value.raw_url)
      .then(res => {
        if (res && res.data && res.data.length) {
          fs.writeFile(`./outputFiles/${value.filename}`, res.data, err => {
            if (err) throw err;
            console.log(`${value.filename} gist is created successfully`);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};

(async () => {
  const gistList = await getGistsList();
  console.log(gistList);
  gistList.forEach(element => {
    getandWriteGist(element);
  });
  try {
  } catch (err) {
    console.error(err);
  }
})();
