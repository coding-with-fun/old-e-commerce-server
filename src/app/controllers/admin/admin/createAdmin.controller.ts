import { type Request, type Response } from 'express';
import { type Socket } from 'socket.io';
import response from '../../../../libs/response';
import { type Admin_Create_RequestType } from '../../../requests/admin/admin.request';
import Admin from '../../../schemas/admin.schema';
import TempFile, {
    type TempFileDataType,
} from '../../../schemas/tempFile.schema';
import { encryptPassword } from '../../../utils/managePassword';

/**
 * Create new admin.
 * @url     /admin/create
 * @access  Private
 * @method  POST
 */
const AdminCreateController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { name, profilePictureId, contactNumber, email, password },
        }: Admin_Create_RequestType = req.body.parsedData;

        // Get image from Temp file table.
        let image: TempFileDataType | null = null;
        if (profilePictureId != null && profilePictureId !== '') {
            image = await TempFile.findById(profilePictureId);
            if (image == null) {
                throw new Error('No image found.');
            }
        }

        let args = {};
        if (image != null) {
            args = {
                profilePictureUrl: image.url,
                profilePictureFileName: image.fileName,
            };
        }

        const admin = new Admin({
            name,
            contactNumber,
            email,
            password: await encryptPassword(password),
            ...args,
        });
        admin.adminID = admin._id;
        await admin.save();

        const socket: Socket = req.app.get('socket');
        socket.broadcast.emit('entry_updated', {
            admin,
        });

        // Delete entry from Temp table once the entry is created.
        if (profilePictureId != null && profilePictureId !== '') {
            await TempFile.findByIdAndDelete(profilePictureId);
        }

        return response(req, res, {
            admin,
            message: 'Admin created successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminCreateController;
