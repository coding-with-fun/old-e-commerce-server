import { type AdminDataType } from '../schemas/admin.schema';

const cleanAdminData = (admin: AdminDataType): CleanAdminType => {
    const cleanAdmin = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        newEmail: admin.newEmail,
        contactNumber: admin.contactNumber,
        profilePicture: admin.profilePictureUrl,
        isActive: admin.isActive,
        isSuperAdmin: admin.isSuperAdmin,
    };

    return cleanAdmin;
};

export default cleanAdminData;

export interface CleanAdminType {
    _id: any;
    name: string;
    email: string;
    newEmail: string | undefined;
    contactNumber: string;
    isActive: boolean;
    profilePicture: string;
}
