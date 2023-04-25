import { type Request, type Response } from 'express';
import { type Socket } from 'socket.io';
import response from '../../../../libs/response';
import { type Admin_CreateCustomer_RequestType } from '../../../requests/admin/customer.request';
import Customer from '../../../schemas/customer.schema';
import TempFile, {
    type TempFileDataType,
} from '../../../schemas/tempFile.schema';
import { encryptPassword } from '../../../utils/managePassword';

/**
 * Create new customer.
 * @url     /admin/customer/create
 * @access  Private
 * @method  POST
 */
const AdminCreateCustomerController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { name, profilePictureId, contactNumber, email, password },
        }: Admin_CreateCustomer_RequestType = req.body.parsedData;

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

        const customer = new Customer({
            name,
            contactNumber,
            email,
            password: await encryptPassword(password),
            ...args,
        });
        customer.customerID = customer._id;
        await customer.save();

        const socket: Socket = req.app.get('socket');
        socket.broadcast.emit('customer_list_updated', {
            customer,
        });

        // Delete entry from Temp table once the entry is created.
        if (profilePictureId != null && profilePictureId !== '') {
            await TempFile.findByIdAndDelete(profilePictureId);
        }

        return response(req, res, {
            customer,
            message: 'Customer created successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminCreateCustomerController;
