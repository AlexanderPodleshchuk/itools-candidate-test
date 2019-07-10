let mongoose = require('mongoose');

const conf = this;

function DAO(config) {
    conf.config = config;
}

DAO.prototype.connect = function () {
    /**
     * DB connection
     */
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1 ||     // 1 - connecting
            mongoose.connection.readyState === 2) {    // 2 - connected
            // Do nothing because we already connected
            resolve("Connected");
        } else {
            const connectionConfig = `mongodb://${conf.config.host}:${conf.config.port}/${conf.config.name}`;

            mongoose.Promise = global.Promise;
            mongoose.connect(connectionConfig);

            mongoose.connection.on('error', () => console.error(`[ERROR]: Error during connection to ${connectionConfig}`));

            mongoose.connection.on('open', () => {
                console.log(`[INFO] : Successfully connected to ${connectionConfig}`);
                conf.connection = mongoose.connection;
                resolve("Connected");
            });
        }
    });
};


/**
 * Create database instance and load init data
 * @param {Object} data - init database data
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.init = function (data, callback) {


    DAO.prototype.connect().then(() => {
        if (data.collections instanceof Array) {

            data.collections.forEach(function (element, index) {
                conf.connection.collection(element.name).insert(element.rows, (err) => {
                    err && console.error(`[ERROR]: Error during inserting ${element.rows.length} elements to ${element.name} collection`);
                    !err && console.log(`[INFO] : Success inserting ${element.rows.length} elements to ${element.name} collection`);

                    if (index === data.collections.length - 1) {
                        callback && callback();
                    }
                });
            });
        }
    });
};

module.exports = DAO;