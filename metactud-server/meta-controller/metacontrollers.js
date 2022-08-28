const fs = require('fs');

const getAll = (entity, callback) => {
    try{
        if(entity === 'schemas'){
            fs.readdir(`${__dirname}/../data/schemas`, (err, files) => {
                if(err){
                    return err
                }
                var schemas = {};
                var index = 0;
                files.forEach(file => {
                    fs.readFile(`${__dirname}/../data/schemas/${file}`, "utf8", (err, jsonString) => {
                        if(err){
                            return err
                        }
                        const data = JSON.parse(jsonString);
                        schemas = {...schemas, [file.split('.')[0]]: data};     
                        index++;
                        if(index === files.length){
                            return callback(null, JSON.stringify(schemas));
                        }
                        }
                    )
                }
                )
            }
            )
        }else{
            fs.readFile(`${__dirname}/../data/${entity}.json`, "utf8", (err, jsonString) => {
                if (err) {          
                  return err;
                }        
                const data = {entity: entity, entities: JSON.parse(jsonString)};
                return callback(null, data);
              });
        }
    }catch(e){
        return e;
    }
}

const getOne = (entity, id, callback) => {
    fs.readFile(`${__dirname}/../data/${entity}.json`, "utf8", (err, jsonString) => {
        if (err) {
            return err;
        }
        const data = JSON.parse(jsonString);
        const item = data.find(item => item.id === parseInt(id));
        if (!item) {
            return callback("no user founded");
        }
        return callback(null, item);
        }
    );
}

const create = (entity, newItem, callback) => {
    if(entity === 'schemas'){
        var schema = Object.keys(newItem)[0];
        var types = newItem[Object.keys(newItem)[0]];                
        fs.promises.writeFile(`${__dirname}/../data/schemas/${schema}.json`, JSON.stringify(types))
        .then(() => {
            return callback(null, {message: "schema created"});
        }).catch(err => {
            return callback(err, null);
        })
    }else{
        //check if the entity file exists
        fs.promises.readFile(`${__dirname}/../data/${entity}.json`, "utf8")
        .then(jsonString => {
            const data = JSON.parse(jsonString);
            const lastId = data[data.length - 1].id;
            const newItemWithId = {...newItem, id: lastId + 1};
            data.push(newItemWithId);
            fs.promises.writeFile(`${__dirname}/../data/${entity}.json`, JSON.stringify(data))
            .then(() => {
                return callback(null, {message: "item created"});
            }).catch(err => {
                return callback(err, null);
            })
        }).catch(err => {
            const newdata = {...newItem, id: 1};
            fs.promises.writeFile(`${__dirname}/../data/${entity}.json`, JSON.stringify([newdata]))
            .then(() => {
                return callback(null, {message: "item created"});
            }).catch(err => {
                return callback(err, null);
            })
        })
    }
}

 function update(entity, id, updatedItem){
         fs.promises.readFile(`${__dirname}/../data/${entity}.json`, "utf8")
        .then(jsonString => {
            const data = JSON.parse(jsonString);
            const index = data.findIndex(item => item.id === parseInt(id));
            if (index === -1 ) {
                return ("no user founded");
            }
            for (const key in updatedItem) {
                data[index][key] = updatedItem[key];
            }
            fs.promises.writeFile(`${__dirname}/../data/${entity}.json`, JSON.stringify(data))
            .then(() => {
                return (data);
            })
        }).catch(err => {
            console.log(err);
            return(err, null)
        })
}

const deleter = (entity, id, callback) => {
    if(entity === 'schemas'){
        fs.promises.unlink(`${__dirname}/../data/schemas/${id}.json`)
        .then(() => {
            return callback(null, "success");
        }).catch(err => {
            return callback(err, null);
        })
    }else{
    fs.readFile(
        `${__dirname}/../data/${entity}.json`, "utf8", (err, jsonString) => {
            if(err){
                return err
            }
            const data = JSON.parse(jsonString);
            const data_filtered = data.filter(item => item.id !== parseInt(id));
            fs.writeFile(
                `${__dirname}/../data/${entity}.json`, JSON.stringify(data_filtered), (err) => {
                    if(err){
                        return err
                    }
                    return callback(null, data_filtered);
                }
            )
        }
    )
}
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleter
};


