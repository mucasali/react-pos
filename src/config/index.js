
const global = {
    name: 'profite_look',
    version: '0.0.1',
}

const env = {
    test: {
        urlApi:'http://localhost:3001'
    },
    development: {
        urlApi:'http://localhost:8083',
        idp: 'project2'
    },
    production: {
        urlApi:''
    }
}

var node_env = process.env.NODE_ENV || 'development'
console.log('config node app ', node_env)

module.exports = Object.assign(global, env[node_env])
