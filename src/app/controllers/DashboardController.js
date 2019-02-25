const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    const { user } = req.session
    if (!user.provider) {
      const subtitle =
        'Inicie um agendamento escolhendo um profissional abaixo: '
      const providers = await User.findAll({ where: { provider: true } })

      return res.render('dashboard', { providers, subtitle })
    } else {
      const subtitle = 'Agendamentos do dia: '
      // Selecionando agendamentos do dia
      const appointments = await Appointment.findAll({
        where: {
          provider_id: user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        },
        order: [['date']]
      })

      // Salvando horários com usuarios
      const schedules = await Promise.all(
        appointments.map(async a => {
          return {
            horary: moment(a.date).format('HH:mm'),
            user: await User.findByPk(a.user_id)
          }
        })
      )
      return res.render('dashboard', { schedules, subtitle })
    }
  }
}

module.exports = new DashboardController()
