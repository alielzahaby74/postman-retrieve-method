const { log } = require('console');
const fs = require('fs');

let items = [];
let postmanCollection = {};
let name = process.argv[3];
fs.readFile(process.argv[2], 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const requests = JSON.parse(data);
    filterOnMethod(requests, "GET");
    postmanCollection.info = requests.info;
    postmanCollection.info.name = name;
    postmanCollection.item = items;
    fs.writeFile(name + '.json', JSON.stringify(postmanCollection), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File written successfully');
            
        }
    });
  }
});

function filterOnMethod(data, method) {
    //if data item doesn't exist or is empty, return
    //if you are at the leaf node, return
    if ((data.request && data.request.method === method) || data.length === 0) {
        items.push(data);
        return data.request;
    }

    //if its a folder, call the function recursively on the children
    if (data.item) {
        data.item.forEach((element) => {
            filterOnMethod(element, method);
        });
    }

}