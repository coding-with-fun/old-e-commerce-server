import {
    type Document,
    type Types,
    type FilterQuery,
    type UpdateQuery,
    type QueryOptions,
} from 'mongoose';
import Admin, {
    type AdminDataType,
    type IAdminSchema,
} from '../schemas/admin.schema';
import { type PaginationType } from '../middlewares/paginationCleaner';

export const AdminFindOne = async (
    args: FilterQuery<IAdminSchema>
): Promise<AdminDataType> => {
    const admin = await Admin.findOne({
        ...args,
        deletedAt: null,
    });

    if (admin == null) {
        throw new Error('Admin not found.');
    }

    if (!admin.isActive) {
        throw new Error('Admin is not active.');
    }

    return admin;
};

export const AdminFindById = async (id: string): Promise<AdminDataType> => {
    const admin = await Admin.findById(id);

    if (admin == null || admin.deletedAt != null) {
        throw new Error('Admin not found.');
    }

    if (!admin.isActive) {
        throw new Error('Admin is not active.');
    }

    return admin;
};

export const AdminFindAll = async (
    pagination: PaginationType['pagination'],
    args?: FilterQuery<IAdminSchema>,
    options?: QueryOptions<IAdminSchema> | null | undefined
): Promise<{
    total: number;
    page: number;
    perPage: number;
    admins: Array<
        Document<unknown, Record<string, unknown>, IAdminSchema> &
            Omit<
                IAdminSchema & {
                    _id: Types.ObjectId;
                },
                never
            >
    >;
}> => {
    const { page, perPage, sortBy, sortType, query } = pagination;

    const admins = await Admin.find(
        {
            ...args,
            $and: [
                {
                    $or: [
                        {
                            name: new RegExp(query, 'i'),
                        },
                        {
                            email: new RegExp(query, 'i'),
                        },
                        {
                            contactNumber: new RegExp(query, 'i'),
                        },
                    ],
                },
            ],
            deletedAt: null,
            isActive: true,
        },
        null,
        {
            ...options,
            skip: (page - 1) * perPage,
            limit: perPage,
            sort: {
                [sortBy]: sortType,
            },
        }
    );

    const count = await Admin.countDocuments({
        ...args,
        $and: [
            {
                $or: [
                    {
                        name: new RegExp(query, 'i'),
                    },
                    {
                        email: new RegExp(query, 'i'),
                    },
                    {
                        contactNumber: new RegExp(query, 'i'),
                    },
                ],
            },
        ],
        deletedAt: null,
        isActive: true,
    });

    return {
        total: count,
        page,
        perPage,
        admins,
    };
};

export const AdminUpdateOneById = async (
    id: string,
    args: UpdateQuery<IAdminSchema>
): Promise<AdminDataType> => {
    await AdminFindById(id);

    const admin = await Admin.findByIdAndUpdate(id, args, {
        new: true,
    });

    if (admin == null || admin.deletedAt != null) {
        throw new Error('Admin not found.');
    }

    return admin;
};

export const AdminDeleteMany = async (
    args?: FilterQuery<IAdminSchema>
): Promise<void> => {
    await Admin.deleteMany(args);
};
