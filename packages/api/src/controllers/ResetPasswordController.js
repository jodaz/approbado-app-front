import jwt from 'jsonwebtoken'
import { SECRET, APP_DOMAIN, MailTransporter } from '../config'
import bcrypt from 'bcrypt'
import { User, PasswordReset } from '../models'
import { validateRequest } from '../utils'

export const resetPassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email } = req.body;

        const user = await User.query().findOne({
            email: email
        });

        const token = await jwt.sign(
            { id: user.id },
            SECRET,
            { expiresIn: 86400 }
        );

        await user.$relatedQuery('password_resets').insert({
            token: token
        })

        const data = {
            name: user.names,
            url: `${APP_DOMAIN}/auth/update-password/?token=${token}`
        };

        try {
            await MailTransporter.sendMail({
                to: user.email,
                subject: 'Reestablecer contraseña',
                template: 'resetPassword',
                context: data
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'lossconnection.'
            })
        }

        return res.json({
            success: true
        })
    }
}

export const verifyToken = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        return res.status(201).json({
            success: true
        })
    }
}

export const updatePassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await PasswordReset.quey().findOne({ token: req.query.token });

        const { password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        // // Obtener usuario de model y actualizar contraseña
        // const user = await User.query().insert({ password: encryptedPassword })

        await MailTransporter.sendMail({
            to: user.email,
            subject: '¡Su contraseña ha sido actualizada!'
        })

        await model.delete();
    }
}
