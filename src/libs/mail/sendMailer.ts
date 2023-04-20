import { type TemplateOptions } from 'nodemailer-express-handlebars';
import type Mail from 'nodemailer/lib/mailer';
import transporter from '.';
import env from '../../env';
import logger from '../../providers/logger';

const sendMailer = async (props: SendMailerPropTypes): Promise<void> => {
    const { subject, toAddress, context, template } = props;

    try {
        const options: Mail.Options & TemplateOptions = {
            from: env.mail.email_from,
            to: toAddress,
            subject,
            template,
            context,
        };

        const response = await transporter.sendMail(options);
        logger.info(response);

        await Promise.resolve();
    } catch (error: any) {
        await Promise.reject(error.message);
    }
};

export default sendMailer;

export interface SendMailerPropTypes {
    subject: string | undefined;
    toAddress: string | Mail.Address | Array<string | Mail.Address> | undefined;
    context: any;
    template: string | undefined;
}
