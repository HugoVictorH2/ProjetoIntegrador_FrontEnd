const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const adminRoutes = require('./routes/adminRoutes')
const loginRoutes = require('./routes/loginRoutes')
const registrarRoutes = require('./routes/registrarRoutes')
const senhasRoutes = require('./routes/esqueciSenhaRoutes')
const recuperarSenhasRoutes = require('./routes/recuperarSenhaRoutes')
const homeRoutes = require('./routes/homeRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

require('dotenv').config()

app.use(cookieParser())

app.use(cors({
    origin: `${process.env.BACKEND_URL}`
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', homeRoutes)

app.use("/registrar", registrarRoutes)
app.use("/login", loginRoutes)

//validação/redirecionamento para o controlador de acordo com a flag is_admin do banco
//usuario logado pode ser ou não admin
app.use('/dashboard', dashboardRoutes)

app.use("/esqueci-senha", senhasRoutes)
app.use("/recuperar-senha", recuperarSenhasRoutes)


app.listen(process.env.PORT, () => console.log(`Server FrontEnd: http://localhost:${process.env.PORT}`))