import prisma from '@/database/prisma';



export const createPackage = async (data, coverImage) => {
    const packages = await prisma.package.create(
        {
            data: {
                ...data,
                coverImage,
                sortIndex: Number(data?.sortIndex),
                serviceFee: Number(data.serviceFee),
                pricePerMilage: Number(data.pricePerMilage),
                drivingProMin: Number(data.drivingProMin),
                waitingProMin: Number(data.waitingProMin),
                vat: Number(data.vat)
            }
        }
    )
    return packages


}


export const findAllPackages = async () => {
    const result = await prisma.package.findMany({});
    return result
}

export const findPackage = async (id) => {
    const result = await prisma.package.findUnique({
        where: { id },
    });

    return result
}

export const findPackageByName = async (name) => {
    const result = await prisma.package.findUnique({
        where: { name },
    });

    return result
}


export const updatePackage = async (id, data, prevData, fileName) => {
    const packages = await prisma.package.update(
        {
            where: { id },
            data: {
                ...data,
                coverImage: fileName ? fileName : prevData.coverImage,
                sortIndex: data?.sortIndex ? Number(data.sortIndex) : prevData.sortIndex
            }
        })

    return packages

}
export const deletePackage = async (id) => {
    const packages = await prisma.package.update(
        {
            where: { id },
            data: {
                status: false
            }
        })

    return packages

}

