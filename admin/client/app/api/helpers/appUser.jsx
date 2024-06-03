import prisma from '@/database/prisma';
import bcrypt from 'bcrypt'


export const checkUser = async (email, phoneNumber,cognitoUserName) => {

    const user = await prisma.AppUser.findUnique(
        {
            where: {
                OR: [{ email }, { phoneNumber }, { cognitoUserName }],
            },
        }
    )
    return user

}
export const checkUserByEmail = async (email) => {

    const user = await prisma.AppUser.findUnique(
        {
            where: {
                 email
            },
            include: {
                driver: {
                    include:{
                        document: true
                    }
                },
                passenger: true
            },
        }
    )
    return user

}
export const checkUserByPhone = async (phoneNumber) => {

    const user = await prisma.AppUser.findUnique(
        {
            where: {
                 phoneNumber
            },

        }
    )
    return user

}
export const checkUserByCognito = async (cognitoUserName) => {

    const user = await prisma.AppUser.findUnique(
        {
            where: {
                 cognitoUserName
            },
            include: {
                driver: {
                    include:{
                        document: true
                    }
                },
                passenger: true
            },
        }
    )
    return user

}

export const findUser = async (id) => {
    const user = await prisma.AppUser.findUnique(
        {
            where: {
                id
            },
        }
    )
    return user
}

export const findUserByEmail = async (email) => {
    const user = await prisma.AppUser.findUnique(
        {
            where: {
                email
            },
            include: {
                driver: {
                    include:{
                        document: true
                    }
                },
                passenger: true
            },
        }
    )
    return user
}

export const createUser = async (firstName, lastName, email, password, phoneNumber) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.AppUser.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        },
    });


    return user
}

export const updateUser = async (id, data) => {
    const result = await prisma.AppUser.update({
        where: { id },
        data,
    })
    return result
}