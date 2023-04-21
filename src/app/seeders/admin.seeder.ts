import { faker } from '@faker-js/faker';
import { type Request, type Response } from 'express';
import response from '../../libs/response';
import Admin from '../schemas/admin.schema';
import { AdminDeleteMany } from '../service/admin.service';
import { encryptPassword } from '../utils/managePassword';

const AdminSeeder = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        // Fixed details for new admin.
        const email = 'dev+admin@harrsh.com';
        const contactNumber = '+919099976321';

        // Delete existing entries.
        await AdminDeleteMany({});

        // Create a new entry.
        const admin = new Admin({
            name: faker.name.fullName(),
            email,
            contactNumber,
            password: await encryptPassword('Abcd@1234'),
            isSuperAdmin: true,
        });
        admin.adminID = admin._id;
        await admin.save();

        return response(req, res, {
            admin,
            message: 'Admin created successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminSeeder;
