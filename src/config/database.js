module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5433,
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorsAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
