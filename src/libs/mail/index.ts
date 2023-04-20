import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import env from '../../env';
import logger from '../../providers/logger';

const options = {
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.port === 465,
    auth: {
        user: env.mail.username,
        pass: env.mail.password,
    },
};

logger.info(
    '------------------------------Email Configurations------------------------------'
);
logger.info(`Email address  ------  ${env.mail.username}`);
logger.info(`Password       ------  ${env.mail.password}`);
logger.info(
    '------------------------------Email Configurations------------------------------'
);

const transporter = nodemailer.createTransport(options);

transporter.use(
    'compile',
    hbs({
        viewPath: env.mail.templatePath,
        extName: '.hbs',
        viewEngine: {
            extname: '.hbs', // handlebars extension
            layoutsDir: `${env.mail.templatePath}/`, // location of handlebars templates
            defaultLayout: 'layout', // name of main template
            partialsDir: `${env.mail.templatePath}/`, // location of your subtemplates aka. header, footer etc
        },
    })
);

export default transporter;
